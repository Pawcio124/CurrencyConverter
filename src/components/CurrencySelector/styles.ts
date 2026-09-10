import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    selector: {
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    item: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    code: {
        fontWeight: '600',
        marginBottom: 5,
    },
    closeButton: {
        backgroundColor: '#f85a5a',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
})
