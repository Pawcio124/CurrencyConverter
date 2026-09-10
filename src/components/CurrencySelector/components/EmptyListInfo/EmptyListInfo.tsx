import { Text } from 'react-native'
import { EmptyListInfoProps } from './types'

export const EmptyListInfo = ({ text = 'No currencies found' }: EmptyListInfoProps) => (
    <Text>{text}</Text>
)
