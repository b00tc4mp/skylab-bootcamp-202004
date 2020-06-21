import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    SafeAreaView,
    Alert,
} from 'react-native';
import { Formik } from 'formik'
import * as Yup from "yup";
import AsyncStorage from '@react-native-community/async-storage';
import { AntDesign } from '@expo/vector-icons'

import AppButton from '../components/Button'
import AppTextInput from '../components/NomadTextInput'
import colors from '../styles/colors'
import ErrorMessage from '../components/ErrorMessage'
import postReview from 'nomad-client-logic/post-review';

const validationSchema = Yup.object().shape({
    stars: Yup.number().required().min(1).label('Stars'),
    reviewText: Yup.string().required().max(200).label('Text Review'),
})

export default ({ navigation, route }) => {

    const workspaceId = route.params

    const [stars, setStars] = useState(0)

    const handleSubmit = async values => {
        try {
            const { stars, reviewText } = values
            const token = await AsyncStorage.getItem('token')
            if (token !== null) {
                await postReview(token, workspaceId, stars, reviewText)
                Alert.alert('Success', 'Review posted in workspace 🤩.')
                navigation.goBack()

            } else {
                console.log('error, in postreviewscreen') //TODO
            }
        } catch (e) {
            console.log(e) // TODO HANDLE THIS
        }
    }

    return (
        <SafeAreaView style={styles.background}>
            <ScrollView style={styles.scrollView}>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={styles.formContainer}
                >
                    <Formik initialValues={{
                        stars: 0,
                        reviewText: '',
                    }}
                        onSubmit={values => { handleSubmit(values) }}
                        validationSchema={validationSchema}
                    >
                        {({ handleChange, handleSubmit, errors, setFieldTouched, touched, setFieldValue, values }) => (
                            <>

                                <View style={styles.imageContainer}>
                                    < AntDesign name="star" size={55} color={stars > 0 ? 'gold' : 'grey'} onPress={() => { setStars(1); setFieldValue('stars', 1) }} />
                                    < AntDesign name="star" size={55} color={stars > 1 ? 'gold' : 'grey'} onPress={() => { setStars(2); setFieldValue('stars', 2) }} />
                                    < AntDesign name="star" size={55} color={stars > 2 ? 'gold' : 'grey'} onPress={() => { setStars(3); setFieldValue('stars', 3) }} />
                                    < AntDesign name="star" size={55} color={stars > 3 ? 'gold' : 'grey'} onPress={() => { setStars(4); setFieldValue('stars', 4) }} />
                                    < AntDesign name="star" size={55} color={stars > 4 ? 'gold' : 'grey'} onPress={() => { setStars(5); setFieldValue('stars', 5) }} />
                                </View>
                                <ErrorMessage error={errors.stars} visible={touched.stars} />
                                <AppTextInput
                                    icon='text'
                                    placeholder='Write here your review'
                                    autoCorrect={false}
                                    textContentType='name'
                                    maxLength={200}
                                    onChangeText={handleChange('reviewText')}
                                    onBlur={() => setFieldTouched('reviewText')}
                                    multiline
                                    numberOfLines={3}
                                />
                                <ErrorMessage error={errors.reviewText} visible={touched.reviewText} />
                                <AppButton title='Post Review' bgColor='secondary' txtColor='light' onPress={handleSubmit} />
                            </>
                        )}
                    </Formik>
                </KeyboardAvoidingView>
            </ScrollView>

        </SafeAreaView>

    );

};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.light,
        width: '100%',
        justifyContent: 'center',
        alignItems: "center",
        shadowOpacity: 0.3,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        flex: 1
    },
    scrollView: {
        width: '100%',
    },
    formContainer: {
        flex: 1,
        alignSelf: 'center',
        width: '100%',

        alignItems: 'center',
        padding: 30,
        paddingBottom: 30,
        backgroundColor: colors.light
    },
})
