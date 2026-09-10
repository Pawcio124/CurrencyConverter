import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { convertCurrency } from '../api/currencyApi'
import { UseConversionProps } from './types'

export const useConversion = ({ from, to, amount, debounceTime = 500 }: UseConversionProps) => {
    const [result, setResult] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const needMoreInfo = !amount || amount <= 0 || !from || !to

    const convertCurrencyFn = useCallback(
        async (signal?: AbortSignal) => {
            if (needMoreInfo) {
                setResult(null)
                setError('')
                return
            }
            try {
                setLoading(true)
                setError('')
                const data = await convertCurrency({ from, to, amount, signal })
                setResult(String(data ?? ''))
            } catch (err) {
                if (!axios.isCancel(err) && (err as Error).name !== 'AbortError') {
                    setError('Failed to convert')
                }
            } finally {
                setLoading(false)
            }
        },
        [from, to, amount]
    )

    useEffect(() => {
        if (needMoreInfo) {
            setResult(null)
            setError('')
            return
        }
        const controller = new AbortController()

        const timer = setTimeout(() => {
            convertCurrencyFn(controller.signal)
        }, debounceTime)

        return () => {
            clearTimeout(timer)
            controller.abort()
        }
    }, [debounceTime, convertCurrencyFn])

    return {
        result,
        loading,
        error,
        refetch: convertCurrencyFn,
    }
}
