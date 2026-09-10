import { Pressable, Text, View } from 'react-native'
import { ErrorInfoProps } from './types'
import { styles } from './styles'

export const ErrorInfo = ({
    info = 'Error Page',
    reRunAction,
    reRunButtonTitle = 'Try again',
    flex = false,
}: ErrorInfoProps) => {
    return (
        <View style={[styles.container, flex ? styles.flex : {}]}>
            <Text numberOfLines={2} style={styles.info}>
                {info}
            </Text>
            {reRunAction && (
                <Pressable style={styles.button} onPress={reRunAction}>
                    <Text style={styles.buttonText}>{reRunButtonTitle}</Text>
                </Pressable>
            )}
        </View>
    )
}
