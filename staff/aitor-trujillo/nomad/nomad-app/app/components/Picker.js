import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Modal, Button, SafeAreaView, FlatList } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import PickerItem from './PickerItem'

import colors from '../styles/colors'

export default function AppPicker({ icon, placeholder, items, onSelectItem, selectedItem }) {
    const [modalView, setModalView] = useState(false)

    return (
        <>
            <TouchableWithoutFeedback onPress={() => setModalView(true)}>
                <View style={styles.container}>
                    <MaterialCommunityIcons name={icon} size={24} color={colors.secondary} />
                    {selectedItem ? (
                        <Text style={styles.text}>{selectedItem.label}</Text>
                    ) : (
                            <Text style={styles.placeholder} >{placeholder}</Text>
                        )}
                    <MaterialCommunityIcons name='chevron-down' size={24} color={colors.secondary} />
                </View>
            </TouchableWithoutFeedback>
            <Modal visible={modalView} animationType='slide' >
                <SafeAreaView>
                    <Button title='Close' onPress={() => setModalView(false)} />
                    <FlatList
                        data={items}
                        keyExtractor={item => item.label.toLowerCase()}
                        renderItem={({ item }) =>
                            <PickerItem
                                label={item.label}
                                onPress={() => {
                                    setModalView(false);
                                    onSelectItem(item)
                                }} />}
                    />
                </SafeAreaView>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.highlight,
        borderRadius: 20,
        flexDirection: 'row',
        padding: 15,
        marginVertical: 10,
        width: '100%',
    },
    text: {
        marginLeft: 10,
        fontSize: 18,
        flex: 1
    },
    placeholder: {
        marginLeft: 10,
        fontSize: 18,
        color: 'lightgrey',
        flex: 1,
    },
})