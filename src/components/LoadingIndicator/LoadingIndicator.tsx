import { ActivityIndicator, Text, View } from 'react-native'
import { LoadingIndicatorProps } from './types'
import { styles } from './styles'

export const LoadingIndicator = ({ info, flex }: LoadingIndicatorProps) => {
    return (
        <View style={[styles.container, flex ? styles.flex : {}]}>
            <ActivityIndicator size="large" />
            {info && <Text style={styles.text}>{info}</Text>}
        </View>
    )
}
