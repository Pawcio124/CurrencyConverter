import { fireEvent, render } from '@testing-library/react-native'
import { CurrencyCard } from './CurrencyCard'

describe('CurrencyCard', () => {
    const usd = {
        id: 1,
        name: 'US Dollar',
        shortCode: 'USD',
    }

    const eur = {
        id: 2,
        name: 'Euro',
        shortCode: 'EUR',
    }

    it('swaps currencies', () => {
        const onSelect1 = jest.fn()
        const onSelect2 = jest.fn()

        const { getByTestId } = render(
            <CurrencyCard
                currencies={[usd, eur]}
                selectedCurrency1={usd}
                selectedCurrency2={eur}
                onSelect1={onSelect1}
                onSelect2={onSelect2}
            />
        )

        fireEvent.press(getByTestId('swap-button'))

        expect(onSelect1).toHaveBeenCalledWith(eur)
        expect(onSelect2).toHaveBeenCalledWith(usd)
    })

    it('does not swap when one currency is missing', () => {
        const onSelect1 = jest.fn()
        const onSelect2 = jest.fn()

        const { getByTestId } = render(
            <CurrencyCard
                currencies={[usd, eur]}
                selectedCurrency1={usd}
                selectedCurrency2={undefined}
                onSelect1={onSelect1}
                onSelect2={onSelect2}
            />
        )

        fireEvent.press(getByTestId('swap-button'))

        expect(onSelect1).not.toHaveBeenCalled()
        expect(onSelect2).not.toHaveBeenCalled()
    })
})
