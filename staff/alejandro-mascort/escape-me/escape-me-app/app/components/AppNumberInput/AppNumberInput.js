import React, { useState } from 'react'
import { TextInput, SafeAreaView, CheckBox, ScrollView, Text, Keyboard, StyleSheet, View } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'

import AppPicker from '../AppPicker'
import AppTextInput from '../AppTextInput'

export default function () {
    const [category, setCategory] = useState()

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: '60%', marginHorizontal: 10 }}>
                <AppPicker icon="city" placeholder="Province"
                    items={[{ label: 'greater than', value: 1 }, { label: 'less than', value: 2 }]}
                    selectedItem={category} onSelectItem={item => {
                        setCategory(item)
                        console.log(item)
                    }} />
            </View>
            <ScrollView style={{ width: '20%', marginHorizontal: 10 }} contentContainerStyle={{ flexGrow: 1 }}
                onPress={() => Keyboard.dismiss()}
            >
                <AppTextInput keyboardType={'numeric'} placeholder={'0-5'} />
            </ScrollView>
        </SafeAreaView>
    )
}
// const categories = [
//     { label: "Barcelona", value: 1 },
//     { label: "Madrid", value: 2 },
//     { label: "Valencia", value: 3 }
//   ]

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})