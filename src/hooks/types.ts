import { ConvertCurrencyProps } from '../api/currencyApi/types'

export interface UseConversionProps extends Partial<Omit<ConvertCurrencyProps, 'signal'>> {
    debounceTime?: number
}

export interface Currency {
    name?: string
    shortCode?: string
    id?: number
}
