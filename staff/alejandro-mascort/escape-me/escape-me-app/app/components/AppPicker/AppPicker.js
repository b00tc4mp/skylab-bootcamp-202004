import React, { useState } from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, Modal, Button, FlatList } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
const styles = require('./style')
import PickerItem from '../PickerItem'

export default function ({ icon, items, placeholder, onSelectItem, selectedItem }) {
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <React.Fragment>
            <TouchableOpacity activeOpacity={1} onPress={() => setModalVisible(true)}>
                <View style={styles.container}>
                    {icon && <MaterialCommunityIcons name={icon} size={20} color={'#fc5c65'} style={styles.icon} />}
                    <Text style={styles.text}>{selectedItem ? selectedItem.label : placeholder}</Text>
                    {icon && <MaterialCommunityIcons name="chevron-down" size={20} color={'#fc5c65'} style={styles.icon} />}
                </View>
            </TouchableOpacity>
            <SafeAreaView>
                <Modal visible={modalVisible} animationType="slide">
                    <Button title="Close" onPress={() => setModalVisible(false)} />
                    <FlatList
                        data={items}
                        keyExtractor={item => item.value.toString()}
                        renderItem={({ item }) => <PickerItem label={item.label}
                            onPress={() => {
                                setModalVisible(false)
                                onSelectItem(item)
                            }
                            }
                        />} />
                </Modal>
            </SafeAreaView>
        </React.Fragment>
    )
}

// const categories = [
//     { label: "Barcelona", value: 1 },
//     { label: "Madrid", value: 2 },
//     { label: "Valencia", value: 3 }
//   ]
{/* <AppPicker icon="city" placeholder="Province" items={categories} /> */ }
