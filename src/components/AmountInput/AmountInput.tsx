import { Text, TextInput, View } from 'react-native'
import { AmountInputProps } from './types'
import { styles } from './styles'

export const AmountInput = ({ amount, onChange, placeholder, label }: AmountInputProps) => {
    const onChangeText = (text: string) => {
        const sanitized = text.replace(',', '.')
        if (/^\d*\.?\d{0,2}$/.test(sanitized)) {
            onChange(sanitized)
        }
    }
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={styles.textInput}
                value={amount}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType="numeric"
            />
        </View>
    )
}
