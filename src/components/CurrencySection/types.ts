import { Currency } from '../../hooks'

export interface CurrencySectionProps {
    currencies: Currency[]
    onSelect: (currency: Currency) => void
    selectedCurrency?: Currency
    headline?: string
}
