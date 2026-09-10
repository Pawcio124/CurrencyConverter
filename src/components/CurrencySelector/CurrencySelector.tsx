import { useMemo, useState } from 'react'
import { Modal, View, Text, TextInput, Pressable, FlatList } from 'react-native'
import { Currency } from '../../hooks'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styles } from './styles'
import { CurrencySelectorProps } from './types'

export const CurrencySelector = ({
    currencies,
    selectedCurrency,
    onSelect,
}: CurrencySelectorProps) => {
    const { top, bottom } = useSafeAreaInsets()
    const [visible, setVisible] = useState(false)
    const [search, setSearch] = useState('')

    const filteredCurrencies = useMemo(() => {
        if (!search.trim()) {
            return currencies
        }

        const query = search.toLowerCase()

        return currencies.filter(
            currency =>
                currency?.shortCode?.toLowerCase().includes(query) ||
                currency?.name?.toLowerCase().includes(query)
        )
    }, [currencies, search])

    const handleSelect = (currency: Currency) => {
        onSelect(currency)
        setVisible(false)
        setSearch('')
    }

    const displayText = selectedCurrency ? selectedCurrency.shortCode : 'Select currency'

    return (
        <>
            <Pressable
                style={styles.selector}
                onPress={() => {
                    setVisible(true)
                    setSearch('')
                }}
            >
                <Text numberOfLines={1}>{displayText}</Text>
            </Pressable>

            <Modal
                style={{ paddingTop: top, paddingBottom: bottom }}
                visible={visible}
                animationType="slide"
            >
                <View style={styles.container}>
                    <TextInput
                        placeholder="Search currency..."
                        value={search}
                        onChangeText={setSearch}
                        style={styles.input}
                    />

                    <FlatList
                        data={filteredCurrencies}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item }) => (
                            <Pressable style={styles.item} onPress={() => handleSelect(item)}>
                                <Text style={styles.code}>{item.shortCode}</Text>
                                <Text>{item.name}</Text>
                            </Pressable>
                        )}
                    />

                    <Pressable style={styles.closeButton} onPress={() => setVisible(false)}>
                        <Text>Close</Text>
                    </Pressable>
                </View>
            </Modal>
        </>
    )
}
