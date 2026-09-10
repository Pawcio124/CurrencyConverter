import { api } from './api'
import { API_KEY } from './consts'
import { ConvertCurrencyProps, CurrencyAPIProps } from './types'

export const getCurrencies = async (signal?: AbortSignal): Promise<CurrencyAPIProps[]> => {
    const response = await api.get('/currencies', {
        signal,
        params: {
            api_key: API_KEY,
        },
    })

    return response.data.response
}

export const convertCurrency = async ({ amount, from, to, signal }: ConvertCurrencyProps) => {
    const response = await api.get('/convert', {
        signal,
        params: {
            api_key: API_KEY,
            amount,
            from,
            to,
        },
    })

    return response.data.response.value
}
