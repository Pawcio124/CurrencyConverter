import { Currency } from '../../hooks'

export interface CurrencySelectorProps {
    currencies: Currency[]
    onSelect: (currency: Currency) => void
    selectedCurrency?: Currency
}
