import { Text, View } from 'react-native'
import { CurrencySelector } from '../CurrencySelector'
import { styles } from './styles'
import { CurrencySectionProps } from './types'

export const CurrencySection = ({
    headline,
    currencies,
    selectedCurrency,
    onSelect,
}: CurrencySectionProps) => (
    <View style={styles.container}>
        {headline && <Text style={styles.headline}>{headline}</Text>}
        <CurrencySelector
            currencies={currencies}
            selectedCurrency={selectedCurrency}
            onSelect={onSelect}
        />
    </View>
)
