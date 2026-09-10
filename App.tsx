import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { CurrencyConverterScreen } from './src/screens'
import { StyleSheet } from 'react-native'
import { ScreenTitle } from './src/components/ScreenTitle'

export default function App() {
    return (
        <SafeAreaProvider>
            <SafeAreaView edges={['bottom', 'top']} style={styles.wrapper}>
                <ScreenTitle title="Currency Converter" />
                <CurrencyConverterScreen />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
})
