import { act, renderHook, waitFor } from '@testing-library/react-native'
import { useCurrencies } from './useCurrencies'
import { getCurrencies } from '../api/currencyApi'
import { getStoredCurrencies, saveCurrencies } from '../storage'

jest.mock('../api/currencyApi')
jest.mock('../storage')
jest.mock('./utils', () => ({
    CurrenciesSchema: {
        parse: jest.fn(data => data),
    },
}))

const mockGetCurrencies = getCurrencies as jest.Mock
const mockGetStoredCurrencies = getStoredCurrencies as jest.Mock
const mockSaveCurrencies = saveCurrencies as jest.Mock

describe('useCurrencies', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should load currencies from cache', async () => {
        const currencies = [
            {
                id: 1,
                code: 'USD',
                shortCode: 'USD',
                name: 'US Dollar',
            },
        ]

        mockGetStoredCurrencies.mockResolvedValue(currencies)

        const { result } = renderHook(() => useCurrencies())

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        expect(result.current.currencies).toEqual(currencies)
        expect(mockGetCurrencies).not.toHaveBeenCalled()
    })

    it('should load currencies from API when cache is empty', async () => {
        const currencies = [
            {
                id: 1,
                code: 'USD',
                shortCode: 'USD',
                name: 'US Dollar',
            },
        ]

        mockGetStoredCurrencies.mockResolvedValue(null)
        mockGetCurrencies.mockResolvedValue(currencies)
        mockSaveCurrencies.mockResolvedValue(undefined)

        const { result } = renderHook(() => useCurrencies())

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        expect(mockGetCurrencies).toHaveBeenCalledTimes(1)
        expect(mockSaveCurrencies).toHaveBeenCalledWith(currencies)
        expect(result.current.currencies).toEqual(currencies)
    })

    it('should set error when API request fails', async () => {
        mockGetStoredCurrencies.mockResolvedValue(null)
        mockGetCurrencies.mockRejectedValue(new Error('Network error'))

        const { result } = renderHook(() => useCurrencies())

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        expect(result.current.error).toBe('Failed to load currencies')
    })

    it('should ignore AbortError', async () => {
        const error = new Error('Canceled')
        error.name = 'AbortError'

        mockGetStoredCurrencies.mockResolvedValue(null)
        mockGetCurrencies.mockRejectedValue(error)

        const { result } = renderHook(() => useCurrencies())

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        expect(result.current.error).toBe('')
    })

    it('should expose refetch function', async () => {
        const currencies = [
            {
                id: 1,
                code: 'USD',
                shortCode: 'USD',
                name: 'US Dollar',
            },
        ]

        mockGetStoredCurrencies.mockResolvedValueOnce(null).mockResolvedValueOnce(null)

        mockGetCurrencies.mockResolvedValue(currencies)

        const { result } = renderHook(() => useCurrencies())

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })

        await act(async () => {
            result.current.refetch()
        })

        await waitFor(() => {
            expect(mockGetCurrencies).toHaveBeenCalledTimes(2)
        })
    })

    it('should abort controller on unmount', () => {
        const abortSpy = jest.spyOn(AbortController.prototype, 'abort')

        mockGetStoredCurrencies.mockResolvedValue([])

        const { unmount } = renderHook(() => useCurrencies())

        unmount()

        expect(abortSpy).toHaveBeenCalled()

        abortSpy.mockRestore()
    })

    it('should clear previous error on successful refetch', async () => {
        mockGetStoredCurrencies.mockResolvedValue(null)

        mockGetCurrencies.mockRejectedValueOnce(new Error('Network error')).mockResolvedValueOnce([
            {
                id: 1,
                code: 'USD',
                shortCode: 'USD',
                name: 'US Dollar',
            },
        ])

        const { result } = renderHook(() => useCurrencies())

        await waitFor(() => {
            expect(result.current.error).toBe('Failed to load currencies')
        })

        await act(async () => {
            result.current.refetch()
        })

        await waitFor(() => {
            expect(result.current.error).toBe('')
        })
    })
})
