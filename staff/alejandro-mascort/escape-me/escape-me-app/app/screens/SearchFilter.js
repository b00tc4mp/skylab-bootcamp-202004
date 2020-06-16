import React, { useState } from 'react'
import { TextInput, SafeAreaView, CheckBox, ScrollView, Text, Keyboard, StyleSheet, View } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'

import AppPicker from '../components/AppPicker'
import AppTextInput from '../components/AppTextInput'
import AppButton from '../components/AppButton'


export default function () {
    const [difficulty, setDifficulty] = useState()
    const [genre, setGenre] = useState()

    let filter = {}
    function handleFilter(values) {
        const { lessThanPriceMin, lessThanPriceMax, moreThanPlayersMin, lessThanPlayersMax, moreThanRating } = values

        if (moreThanRating) filter['moreThanRating'] = Number(moreThanRating.replace(',', '.'))
        if (lessThanPriceMin) filter['lessThanPriceMin'] = Number(lessThanPriceMin.replace(',', '.'))
        if (lessThanPriceMax) filter['lessThanPriceMax'] = Number(lessThanPriceMax.replace(',', '.'))
        if (moreThanPlayersMin) filter['moreThanPlayersMin'] = Number(moreThanPlayersMin.replace(',', '.'))
        if (lessThanPlayersMax) filter['lessThanPlayersMax'] = Number(lessThanPlayersMax.replace(',', '.'))
        if (difficulty) filter['difficulty'] = [difficulty.value]
        if (genre) filter['genre'] = [genre.value]

        console.log(filter)
    }

    return (
        <View style={styles.container} >
            <AppPicker icon="city" placeholder="Difficulty" items={[
                { label: "Easy", value: 1 },
                { label: "Medium", value: 2 },
                { label: "Hard", value: 3 }
            ]}
                selectedItem={difficulty} onSelectItem={item => setDifficulty(item)} />
            <AppPicker style={{ width: '60%', heightt: 30 }} icon="city" placeholder="Genre" items={[
                { label: "Terror", value: 'terror' },
                { label: "Adventures", value: 'aventuras' },
                { label: "Historical", value: 'historico' }
            ]}
                selectedItem={genre} onSelectItem={item => setGenre(item)} />
            <Formik initialValues={{
                lessThanPriceMin: undefined, lessThanPriceMax: undefined, moreThanPlayersMin: undefined,
                lessThanPlayersMax: undefined, moreThanRating: undefined
            }}
                onSubmit={values => handleFilter(values)}
            >
                {({ handleChange, handleSubmit, errors }) => (
                    <>
                        <View style={styles.text} >
                            <View style={styles.input}>
                                <AppTextInput placeholder="Ratio min."
                                    keyboardType="numeric"
                                    onChangeText={handleChange('moreThanRating')}
                                />
                            </View>
                            <View style={styles.input}>
                                <AppTextInput placeholder="Price Max."
                                    autoCapitalize="none"
                                    keyboardType='numeric'
                                    onChangeText={handleChange('lessThanPriceMax')}
                                />
                            </View>
                            <View style={styles.input}>
                                <AppTextInput placeholder="Price Min."
                                    autoCapitalize="none"
                                    keyboardType='numeric'
                                    onChangeText={handleChange('lessThanPriceMin')}
                                />
                            </View>
                            <View style={styles.input}>
                                <AppTextInput placeholder="Players Min."
                                    autoCapitalize="none"
                                    keyboardType='numeric'
                                    onChangeText={handleChange('moreThanPlayersMin')}
                                />
                            </View>
                            <View style={styles.input}>
                                <AppTextInput placeholder="Players Max."
                                    autoCapitalize="none"
                                    keyboardType='numeric'
                                    onChangeText={handleChange('lessThanPlayersMax')}
                                />
                            </View>

                            <AppButton title="Apply Filters" onPress={handleSubmit} />

                        </View>
                    </>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    input: {
        width: '45%',
        marginHorizontal: 5
    }

})

//https://github.com/tableflip/react-native-select-multiple