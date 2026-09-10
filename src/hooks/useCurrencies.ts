import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { getCurrencies } from '../api/currencyApi'
import { getStoredCurrencies, saveCurrencies } from '../storage'
import { CurrenciesSchema } from './utils'
import { Currency } from './types'

export const useCurrencies = () => {
    const [currencies, setCurrencies] = useState<Currency[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const loadCurrencies = useCallback(async (signal?: AbortSignal) => {
        try {
            setLoading(true)
            setError('')

            const cachedCurrencies = await getStoredCurrencies()
            if (cachedCurrencies) {
                setCurrencies(cachedCurrencies)
                return
            }

            const data = await getCurrencies(signal)

            const parsed = CurrenciesSchema.parse(data) || []

            setCurrencies(parsed)
            await saveCurrencies(parsed)
        } catch (err) {
            if (!axios.isCancel(err) && (err as Error).name !== 'AbortError') {
                setError('Failed to load currencies')
            }
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        const controller = new AbortController()
        loadCurrencies(controller.signal)

        return () => {
            controller.abort()
        }
    }, [loadCurrencies])

    const refetch = () => {
        loadCurrencies()
    }

    return {
        currencies,
        loading,
        error,
        refetch,
    }
}
