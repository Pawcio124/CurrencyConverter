import { Currency } from '../../hooks'

export interface CurrencyCardProps {
    currencies: Currency[]
    onSelect1: (currency: Currency) => void
    onSelect2: (currency: Currency) => void
    headLine1?: string
    headLine2?: string
    selectedCurrency1?: Currency
    selectedCurrency2?: Currency
}
