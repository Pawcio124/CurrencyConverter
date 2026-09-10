import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { CurrencyConverterScreen } from './src/screens'
import { StyleSheet, View } from 'react-native'
import { ScreenTitle } from './src/components/ScreenTitle'

export default function App() {
    return (
        <SafeAreaProvider>
            <SafeAreaView edges={['bottom', 'top']} style={styles.safeAreaWrapper}>
                <View style={styles.wrapper}>
                    <ScreenTitle title="Currency Converter" />
                    <CurrencyConverterScreen />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    safeAreaWrapper: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
})
