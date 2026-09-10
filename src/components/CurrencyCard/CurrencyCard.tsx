import { Pressable, View } from 'react-native'
import { styles } from './styles'
import { CurrencyCardProps } from './types'
import { CurrencySection } from '../CurrencySection/CurrnecySection'
import MaterialIcons from '@react-native-vector-icons/material-icons'

export const CurrencyCard = ({
    currencies,
    headLine1,
    headLine2,
    selectedCurrency1,
    selectedCurrency2,
    onSelect1,
    onSelect2,
}: CurrencyCardProps) => {
    const onSwapPress = () => {
        if (!selectedCurrency2 || !selectedCurrency1) return
        onSelect1(selectedCurrency2)
        onSelect2(selectedCurrency1)
    }
    return (
        <View style={styles.card}>
            <CurrencySection
                headline={headLine1}
                currencies={currencies}
                selectedCurrency={selectedCurrency1}
                onSelect={onSelect1}
            />
            <Pressable
                disabled={!selectedCurrency1 || !selectedCurrency2}
                style={styles.swapButton}
                onPress={onSwapPress}
                testID="swap-button"
            >
                <MaterialIcons
                    name="sync-alt"
                    size={24}
                    color={!selectedCurrency1 || !selectedCurrency2 ? '#9CA3AF' : '#000'}
                />
            </Pressable>
            <CurrencySection
                headline={headLine2}
                currencies={currencies}
                selectedCurrency={selectedCurrency2}
                onSelect={onSelect2}
            />
        </View>
    )
}
