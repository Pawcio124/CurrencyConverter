import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import { CurrencySelector } from './CurrencySelector'

jest.mock('react-native-safe-area-context', () => ({
    useSafeAreaInsets: () => ({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }),
}))

const currencies = [
    {
        id: 1,
        code: 'USD',
        shortCode: 'USD',
        name: 'US Dollar',
    },
    {
        id: 2,
        code: 'EUR',
        shortCode: 'EUR',
        name: 'Euro',
    },
]

describe('CurrencySelector', () => {
    it('should render placeholder when no currency is selected', () => {
        const { getByText } = render(
            <CurrencySelector
                currencies={currencies}
                selectedCurrency={undefined}
                onSelect={jest.fn()}
            />
        )

        expect(getByText('Select currency')).toBeTruthy()
    })

    it('should render selected currency', () => {
        const { getByText } = render(
            <CurrencySelector
                currencies={currencies}
                selectedCurrency={currencies[0]}
                onSelect={jest.fn()}
            />
        )

        expect(getByText('USD')).toBeTruthy()
    })

    it('should open modal when selector is pressed', () => {
        const { getByText, getByPlaceholderText } = render(
            <CurrencySelector
                currencies={currencies}
                selectedCurrency={undefined}
                onSelect={jest.fn()}
            />
        )

        fireEvent.press(getByText('Select currency'))
        expect(getByPlaceholderText('Search currency...')).toBeTruthy()
    })

    it('should filter currencies by name and short code', () => {
        const { getByText, getByPlaceholderText } = render(
            <CurrencySelector
                currencies={currencies}
                selectedCurrency={undefined}
                onSelect={jest.fn()}
            />
        )

        fireEvent.press(getByText('Select currency'))

        fireEvent.changeText(getByPlaceholderText('Search currency...'), 'eur')
        expect(getByText('Euro')).toBeTruthy()

        fireEvent.changeText(getByPlaceholderText('Search currency...'), 'usd')
        expect(getByText('US Dollar')).toBeTruthy()
    })

    it('should call onSelect when currency is selected', () => {
        const onSelect = jest.fn()

        const { getByText } = render(
            <CurrencySelector
                currencies={currencies}
                selectedCurrency={undefined}
                onSelect={onSelect}
            />
        )

        fireEvent.press(getByText('Select currency'))
        fireEvent.press(getByText('Euro'))

        expect(onSelect).toHaveBeenCalledTimes(1)
        expect(onSelect).toHaveBeenCalledWith(currencies[1])
    })

    it('should close modal when close button is pressed', () => {
        const { getByText, queryByPlaceholderText } = render(
            <CurrencySelector
                currencies={currencies}
                selectedCurrency={undefined}
                onSelect={jest.fn()}
            />
        )

        fireEvent.press(getByText('Select currency'))
        expect(queryByPlaceholderText('Search currency...')).toBeTruthy()
        fireEvent.press(getByText('Close'))
        expect(queryByPlaceholderText('Search currency...')).toBeNull()
    })
})
