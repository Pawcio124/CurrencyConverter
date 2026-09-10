import { Text, View } from 'react-native'
import { ResultCardProps } from './types'
import { styles } from './styles'

export const ResultCard = ({ result, currency }: ResultCardProps) => {
    return (
        <View style={styles.card}>
            <Text>Result</Text>
            {result !== null && result !== '' && (
                <>
                    <Text numberOfLines={1} style={styles.result}>
                        {Number(result).toFixed(2)}
                    </Text>
                    <Text style={styles.resultDetails}>{`Exact result: ${result}`}</Text>
                </>
            )}
            {currency && <Text style={styles.currency}>{currency}</Text>}
        </View>
    )
}
