import { render } from '@testing-library/react-native'
import { ScreenTitle } from './ScreenTitle'

describe('ScreenTitle', () => {
    it('renders provided title', () => {
        const title = 'Currency Converter'
        const { getByText } = render(<ScreenTitle title={title} />)
        expect(getByText(title)).toBeTruthy()
    })
})
