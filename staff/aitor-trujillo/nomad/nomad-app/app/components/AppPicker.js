import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Platform, TouchableWithoutFeedback, Modal, Button, SafeAreaView, FlatList } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import PickerItem from './PickerItem'

import colors from '../styles/colors'

export default function AppPicker({ icon, placeholder, items, selectedItem }) {
    const [modalView, setModalView] = useState(false)

    return (
        <>
            <TouchableWithoutFeedback onPress={() => setModalView(true)}>
                <View style={styles.container}>
                    <MaterialCommunityIcons name={icon} size={24} color={colors.secondary} />
                    <Text style={styles.text}>{selectedItem ? selectedItem.label : placeholder}</Text>
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
                                    setSelectedItem(item)
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
        fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
        flex: 1
    }
})

// const categories = [
//     { label: 'Coffee' },
//     { label: 'Cowork' },
//     { label: 'Library' },
//     { label: 'Shared Space' },
//   ]

// <AppPicker icon='dots-horizontal'
//           placeholder='Category'
//           items={categories}
//         />
