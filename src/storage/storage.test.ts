import AsyncStorage from '@react-native-async-storage/async-storage'
import { saveCurrencies, getStoredCurrencies } from './currencyStorage'
import { STORAGE_CONFIG } from './consts'

jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
    getItem: jest.fn(),
}))

describe('currencyStorage', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        jest.restoreAllMocks()
    })

    describe('saveCurrencies', () => {
        it('should save currencies to storage', async () => {
            const now = 123456789

            jest.spyOn(Date, 'now').mockReturnValue(now)

            const currencies = [
                {
                    shortCode: 'USD',
                    name: 'United States Dollar',
                    id: 1,
                },
                {
                    shortCode: 'EUR',
                    name: 'Euro',
                    id: 2,
                },
            ]

            await saveCurrencies(currencies)

            expect(AsyncStorage.setItem).toHaveBeenCalledWith(
                STORAGE_CONFIG.CURRENCIES.NAME,
                JSON.stringify({
                    timestamp: now,
                    currencies,
                })
            )
        })
    })

    describe('getStoredCurrencies', () => {
        it('should return null when cache does not exist', async () => {
            ;(AsyncStorage.getItem as jest.Mock).mockResolvedValue(null)

            const result = await getStoredCurrencies()

            expect(result).toBeNull()
        })

        it('should return cached currencies when cache is valid', async () => {
            const now = 1000

            jest.spyOn(Date, 'now').mockReturnValue(now)

            const currencies = [
                {
                    shortCode: 'USD',
                    name: 'United States Dollar',
                    id: 1,
                },
                {
                    shortCode: 'EUR',
                    name: 'Euro',
                    id: 2,
                },
            ]

            ;(AsyncStorage.getItem as jest.Mock).mockResolvedValue(
                JSON.stringify({
                    timestamp: now,
                    currencies,
                })
            )

            const result = await getStoredCurrencies()

            expect(result).toEqual(currencies)
        })

        it('should return null when cache is expired', async () => {
            const timestamp = 1000

            jest.spyOn(Date, 'now').mockReturnValue(timestamp + STORAGE_CONFIG.CURRENCIES.TTL + 1)
            ;(AsyncStorage.getItem as jest.Mock).mockResolvedValue(
                JSON.stringify({
                    timestamp,
                    currencies: [
                        {
                            shortCode: 'USD',
                            name: 'United States Dollar',
                            id: 1,
                        },
                    ],
                })
            )

            const result = await getStoredCurrencies()

            expect(result).toBeNull()
        })

        it('should return currencies when cache age equals ttl', async () => {
            const timestamp = 1000

            const currencies = [
                {
                    code: 'USD',
                    name: 'United States Dollar',
                },
            ]

            jest.spyOn(Date, 'now').mockReturnValue(timestamp + STORAGE_CONFIG.CURRENCIES.TTL)
            ;(AsyncStorage.getItem as jest.Mock).mockResolvedValue(
                JSON.stringify({
                    timestamp,
                    currencies,
                })
            )

            const result = await getStoredCurrencies()

            expect(result).toEqual(currencies)
        })

        it('should return currencies when cache age is below ttl', async () => {
            const timestamp = 1000

            const currencies = [
                {
                    shortCode: 'USD',
                    name: 'United States Dollar',
                    id: 1,
                },
            ]

            jest.spyOn(Date, 'now').mockReturnValue(
                timestamp + STORAGE_CONFIG.CURRENCIES.TTL - 1000
            )
            ;(AsyncStorage.getItem as jest.Mock).mockResolvedValue(
                JSON.stringify({
                    timestamp,
                    currencies,
                })
            )

            const result = await getStoredCurrencies()

            expect(result).toEqual(currencies)
        })
    })
})
