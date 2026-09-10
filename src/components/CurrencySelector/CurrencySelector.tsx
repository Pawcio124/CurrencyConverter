import { useMemo, useState } from 'react'
import { Modal, View, Text, TextInput, Pressable, FlatList } from 'react-native'
import { Currency } from '../../hooks'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styles } from './styles'
import { CurrencySelectorProps } from './types'
import { EmptyListInfo } from './components'

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

    const currencyLabel = selectedCurrency?.shortCode ?? 'Select currency'

    const openModal = () => {
        setVisible(true)
    }

    const closeModal = () => {
        setVisible(false)
    }

    const renderItem = ({ item }: { item: Currency }) => (
        <Pressable style={styles.item} onPress={() => handleSelect(item)}>
            <Text style={styles.code}>{item.shortCode}</Text>
            <Text>{item.name}</Text>
        </Pressable>
    )
    const keyExtractor = (item: Currency) => String(item.id)

    return (
        <>
            <Pressable style={styles.selector} onPress={openModal}>
                <Text numberOfLines={1}>{currencyLabel}</Text>
            </Pressable>

            <Modal visible={visible} animationType="slide" onRequestClose={closeModal}>
                <View style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
                    <TextInput
                        autoFocus
                        placeholder="Search currency..."
                        value={search}
                        onChangeText={setSearch}
                        style={styles.input}
                    />

                    <FlatList
                        data={filteredCurrencies}
                        keyExtractor={keyExtractor}
                        renderItem={renderItem}
                        ListEmptyComponent={EmptyListInfo}
                    />

                    <Pressable style={styles.closeButton} onPress={closeModal}>
                        <Text>Close</Text>
                    </Pressable>
                </View>
            </Modal>
        </>
    )
}
