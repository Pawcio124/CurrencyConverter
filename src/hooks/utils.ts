import * as z from 'zod'

const CurrencySchema = z
    .object({
        id: z.number(),
        short_code: z.string(),
        name: z.string(),
    })
    .transform(currency => ({
        id: currency.id,
        shortCode: currency.short_code,
        name: currency.name,
    }))

export const CurrenciesSchema = z.array(CurrencySchema)
