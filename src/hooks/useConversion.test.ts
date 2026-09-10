import { act, renderHook } from '@testing-library/react-native'
import axios from 'axios'
import { useConversion } from './useConversion'
import { convertCurrency } from '../api/currencyApi'

jest.mock('../api/currencyApi')

const mockConvertCurrency = convertCurrency as jest.Mock

describe('useConversion', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.clearAllTimers()
        jest.useRealTimers()
    })

    it('should not convert when required data is missing', () => {
        const { result } = renderHook(() =>
            useConversion({
                from: undefined,
                to: 'EUR',
                amount: 100,
            })
        )

        expect(result.current.result).toBeNull()
        expect(result.current.error).toBe('')
        expect(mockConvertCurrency).not.toHaveBeenCalled()
    })

    it('should convert currency after debounce', async () => {
        mockConvertCurrency.mockResolvedValue('92.5')

        const { result } = renderHook(() =>
            useConversion({
                from: 'USD',
                to: 'EUR',
                amount: 100,
            })
        )

        await act(async () => {
            jest.advanceTimersByTime(500)
            await Promise.resolve()
        })

        expect(mockConvertCurrency).toHaveBeenCalledWith({
            from: 'USD',
            to: 'EUR',
            amount: 100,
            signal: expect.any(AbortSignal),
        })

        expect(result.current.result).toBe('92.5')
        expect(result.current.error).toBe('')
    })

    it('should set error when conversion fails', async () => {
        mockConvertCurrency.mockRejectedValue(new Error('Network error'))

        const { result } = renderHook(() =>
            useConversion({
                from: 'USD',
                to: 'EUR',
                amount: 100,
            })
        )

        await act(async () => {
            jest.advanceTimersByTime(500)
            await Promise.resolve()
        })

        expect(result.current.error).toBe('Failed to convert')
        expect(result.current.result).toBeNull()
    })

    it('should ignore canceled requests', async () => {
        const error = new axios.CanceledError('Canceled')

        mockConvertCurrency.mockRejectedValue(error)

        const { result } = renderHook(() =>
            useConversion({
                from: 'USD',
                to: 'EUR',
                amount: 100,
            })
        )

        await act(async () => {
            jest.advanceTimersByTime(500)
            await Promise.resolve()
        })

        expect(result.current.error).toBe('')
    })

    it('should expose refetch function', async () => {
        mockConvertCurrency.mockResolvedValue('95')

        const { result } = renderHook(() =>
            useConversion({
                from: 'USD',
                to: 'EUR',
                amount: 100,
            })
        )

        await act(async () => {
            await result.current.refetch()
        })

        expect(mockConvertCurrency).toHaveBeenCalledTimes(1)
        expect(result.current.result).toBe('95')
    })

    it('should clear result when amount becomes invalid', async () => {
        mockConvertCurrency.mockResolvedValue('100')

        const { result, rerender } = renderHook(props => useConversion(props as any), {
            initialProps: {
                from: 'USD',
                to: 'EUR',
                amount: 100,
            },
        })

        await act(async () => {
            jest.advanceTimersByTime(500)
            await Promise.resolve()
        })

        expect(result.current.result).toBe('100')

        rerender({
            from: 'USD',
            to: 'EUR',
            amount: 0,
        })

        expect(result.current.result).toBeNull()
        expect(result.current.error).toBe('')
    })
})
