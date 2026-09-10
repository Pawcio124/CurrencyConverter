import { api } from './api'
import { convertCurrency, getCurrencies } from './currencyApi'

jest.mock('./api', () => ({
    api: {
        get: jest.fn(),
    },
}))

const mockApiGet = api.get as jest.MockedFunction<typeof api.get>

describe('currencyApi', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('getCurrencies', () => {
        it('should fetch currencies', async () => {
            const currencies = [
                {
                    code: 'USD',
                    short_code: 'USD',
                    name: 'US Dollar',
                },
                {
                    code: 'EUR',
                    short_code: 'EUR',
                    name: 'Euro',
                },
            ]

            mockApiGet.mockResolvedValue({
                data: {
                    response: currencies,
                },
            } as any)

            const result = await getCurrencies()

            expect(result).toEqual(currencies)
            expect(mockApiGet).toHaveBeenCalledWith(
                '/currencies',
                expect.objectContaining({
                    params: expect.objectContaining({
                        api_key: expect.any(String),
                    }),
                })
            )
        })
    })

    describe('convertCurrency', () => {
        it('should convert currency', async () => {
            mockApiGet.mockResolvedValue({
                data: {
                    response: {
                        value: 92.5,
                    },
                },
            } as any)

            const result = await convertCurrency({
                amount: 100,
                from: 'USD',
                to: 'EUR',
            })

            expect(result).toBe(92.5)

            expect(mockApiGet).toHaveBeenCalledWith(
                '/convert',
                expect.objectContaining({
                    params: expect.objectContaining({
                        amount: 100,
                        from: 'USD',
                        to: 'EUR',
                    }),
                })
            )
        })
    })
})
