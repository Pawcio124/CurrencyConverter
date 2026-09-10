import { Text } from 'react-native'
import { ScreenTitleProps } from './types'
import { styles } from './styles'

export const ScreenTitle = ({ title }: ScreenTitleProps) => {
    return <Text style={styles.title}>{title}</Text>
}
