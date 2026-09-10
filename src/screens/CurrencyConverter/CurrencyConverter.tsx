import { useState } from 'react'
import { View } from 'react-native'
import { Currency, useConversion, useCurrencies } from '../../hooks'
import { CurrencyCard } from '../../components/CurrencyCard'
import { ResultCard } from '../../components/ResultCard'
import { LoadingIndicator } from '../../components/LoadingIndicator'
import { ErrorInfo } from '../../components/ErrorInfo'
import { AmountInput } from '../../components/AmountInput'
import { styles } from './styles'

export const CurrencyConverterScreen = () => {
    const [fromCurrency, setFromCurrency] = useState<Currency>()
    const [toCurrency, setToCurrency] = useState<Currency>()
    const {
        currencies,
        refetch: refetchCurrencies,
        error: errorCurrencies,
        loading: loadingCurrencies,
    } = useCurrencies()
    const [amount, setAmount] = useState<string>('')
    const {
        result,
        loading: loadingConverse,
        error: errorConverse,
        refetch: retryConverse,
    } = useConversion({
        from: fromCurrency?.shortCode,
        to: toCurrency?.shortCode,
        amount: Number(amount),
    })

    const handleTextChange = (value: string) => {
        setAmount(value)
    }

    if (loadingCurrencies) {
        return <LoadingIndicator info="Fetching currencies..." flex />
    }
    if (!loadingCurrencies && errorCurrencies) {
        return (
            <ErrorInfo
                reRunAction={refetchCurrencies}
                info="An error occurred while fetching exchange rates."
                flex
            />
        )
    }
    if (currencies)
        return (
            <View style={styles.container}>
                <CurrencyCard
                    headLine1="FROM"
                    headLine2="TO"
                    currencies={currencies}
                    selectedCurrency1={fromCurrency}
                    selectedCurrency2={toCurrency}
                    onSelect1={setFromCurrency}
                    onSelect2={setToCurrency}
                />
                <AmountInput
                    onChange={handleTextChange}
                    amount={amount}
                    placeholder="Enter amount"
                    label="AMOUNT"
                />
                {loadingConverse && <LoadingIndicator info="Converting currency..." />}
                {!loadingConverse && errorConverse && (
                    <ErrorInfo
                        reRunAction={retryConverse}
                        info="An error occurred while converting currency."
                        reRunButtonTitle="Retry converse"
                    />
                )}
                {!loadingConverse && !errorConverse && result && (
                    <ResultCard result={result} currency={toCurrency?.shortCode} />
                )}
            </View>
        )
}
