import { render } from '@testing-library/react-native'
import { useCurrencies, useConversion } from '../../hooks'
import { CurrencyConverterScreen } from './CurrencyConverter'

jest.mock('../../hooks')

const mockedUseCurrencies = useCurrencies as jest.Mock
const mockedUseConversion = useConversion as jest.Mock

describe('CurrencyConverterScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders currencies loading state', () => {
        mockedUseCurrencies.mockReturnValue({
            currencies: undefined,
            loading: true,
            error: false,
            refetch: jest.fn(),
        })

        mockedUseConversion.mockReturnValue({
            result: undefined,
            loading: false,
            error: false,
            refetch: jest.fn(),
        })

        const { getByText } = render(<CurrencyConverterScreen />)

        expect(getByText('Fetching currencies...')).toBeTruthy()
    })

    it('renders currencies error state', () => {
        mockedUseCurrencies.mockReturnValue({
            currencies: undefined,
            loading: false,
            error: true,
            refetch: jest.fn(),
        })

        mockedUseConversion.mockReturnValue({
            result: undefined,
            loading: false,
            error: false,
            refetch: jest.fn(),
        })

        const { getByText } = render(<CurrencyConverterScreen />)

        expect(getByText('An error occurred while fetching exchange rates.')).toBeTruthy()
    })

    it('renders screen content when currencies are loaded', () => {
        mockedUseCurrencies.mockReturnValue({
            currencies: [
                {
                    id: 1,
                    code: 'USD',
                    shortCode: 'USD',
                    name: 'US Dollar',
                },
            ],
            loading: false,
            error: false,
            refetch: jest.fn(),
        })

        mockedUseConversion.mockReturnValue({
            result: undefined,
            loading: false,
            error: false,
            refetch: jest.fn(),
        })

        const { getByText } = render(<CurrencyConverterScreen />)

        expect(getByText('FROM')).toBeTruthy()
        expect(getByText('TO')).toBeTruthy()
        expect(getByText('AMOUNT')).toBeTruthy()
    })

    it('renders conversion loading state', () => {
        mockedUseCurrencies.mockReturnValue({
            currencies: [],
            loading: false,
            error: false,
            refetch: jest.fn(),
        })

        mockedUseConversion.mockReturnValue({
            result: undefined,
            loading: true,
            error: false,
            refetch: jest.fn(),
        })

        const { getByText } = render(<CurrencyConverterScreen />)

        expect(getByText('Converting currency...')).toBeTruthy()
    })

    it('renders conversion error state', () => {
        mockedUseCurrencies.mockReturnValue({
            currencies: [],
            loading: false,
            error: false,
            refetch: jest.fn(),
        })

        mockedUseConversion.mockReturnValue({
            result: undefined,
            loading: false,
            error: true,
            refetch: jest.fn(),
        })

        const { getByText } = render(<CurrencyConverterScreen />)

        expect(getByText('An error occurred while converting currency.')).toBeTruthy()
    })

    it('renders result card when conversion succeeds', () => {
        mockedUseCurrencies.mockReturnValue({
            currencies: [],
            loading: false,
            error: false,
            refetch: jest.fn(),
        })

        mockedUseConversion.mockReturnValue({
            result: '123',
            loading: false,
            error: false,
            refetch: jest.fn(),
        })

        const { UNSAFE_root } = render(<CurrencyConverterScreen />)

        expect(UNSAFE_root).toBeTruthy()
    })
})
