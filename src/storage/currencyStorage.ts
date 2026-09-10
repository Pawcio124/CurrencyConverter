import AsyncStorage from '@react-native-async-storage/async-storage'
import { STORAGE_CONFIG } from './consts'
import { Currency } from '../hooks'
import { CurrencyCache } from './types'

export const saveCurrencies = async (currencies: Currency[]) => {
    const cache: CurrencyCache = {
        timestamp: Date.now(),
        currencies,
    }
    await AsyncStorage.setItem(STORAGE_CONFIG.CURRENCIES.NAME, JSON.stringify(cache))
}

export const getStoredCurrencies = async (): Promise<Currency[] | null> => {
    const data = await AsyncStorage.getItem(STORAGE_CONFIG.CURRENCIES.NAME)

    if (!data) return null

    const cache: CurrencyCache = JSON.parse(data)
    const isExpired = Date.now() - cache.timestamp > STORAGE_CONFIG.CURRENCIES.TTL
    if (isExpired) return null

    return cache.currencies
}
