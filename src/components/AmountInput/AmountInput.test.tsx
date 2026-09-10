import { fireEvent, render } from '@testing-library/react-native'
import { AmountInput } from './AmountInput'

describe('AmountInput', () => {
    it('Renders and calls onChange for valid value', () => {
        const onChange = jest.fn()

        const { getByPlaceholderText } = render(
            <AmountInput amount="" placeholder="Enter amount" onChange={onChange} />
        )

        fireEvent.changeText(getByPlaceholderText('Enter amount'), '123,45')
        expect(onChange).toHaveBeenCalledWith('123.45')

        fireEvent.changeText(getByPlaceholderText('Enter amount'), '')
        expect(onChange).toHaveBeenCalledTimes(2)
        fireEvent.changeText(getByPlaceholderText('Enter amount'), '123,455')
        expect(onChange).toHaveBeenCalledTimes(2)
    })
})
