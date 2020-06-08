import React, { useCallback } from 'react'
import { ImageBackground, StyleSheet, SafeAreaView, View, Text, Linking, Button, TouchableOpacity, ScrollView } from 'react-native'
import { FontAwesome, MaterialIcons, Entypo, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating'
import Review from '../components/Review'

export default function () {
    const url = 'http://www.roomwhitechapel.com/index.php'

    const handlePress = useCallback(async () => {
        await Linking.openURL(url)
    }, [url])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <ImageBackground style={styles.image} source={require('../assets/whitechapel.jpg')} >
                    <View style={styles.personal}>
                        <SimpleLineIcons style={styles.profile} name="heart" size={24} color="tomato" />
                        <MaterialIcons style={styles.profile} name="check-box-outline-blank" size={24} color="black" />
                        <Entypo style={styles.profile} name="add-to-list" size={24} color="black" />
                    </View>
                    <View style={styles.punctuation}>
                        <Text style={{ fontSize: 18 }}>4.9</Text>
                        <MaterialCommunityIcons name="star" size={30} color="#FFD300" />
                    </View>
                </ImageBackground>
                <View style={styles.description}>
                    <View style={styles.interaction}>
                        <View style={styles.visit}>
                            <TouchableOpacity activeOpacity={0.8} style={styles.button}>
                                <Button title='Visit Website' onPress={handlePress} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.title}>Whitechapel</Text>
                    </View>
                    <Text style={styles.introduction}>
                        En 1888, en un famoso barrio londinense llamado Whitechapel, ocurrieron una serie de asesinatos cometidos por Jack el Destripador. Ahora, 130 años después, un asesino le está haciendo tributo y causando el caos siguiendo los pasos del mismísimo Jack. En nuestro Room escape os retaremos a descifrar una serie de enigmas que desafiarán vuestra inteligencia, imaginación y cooperación además de poner a prueba vuestros miedos. Ingenio, colaboración, perspectiva... Todos los sentidos deben estar alerta, cualquier pequeño detalle puede ser primordial para superar el desafío.
                </Text>
                    <View style={styles.details}>
                        <View style={styles.pair}>
                            <Text style={styles.tag}>Difficulty:</Text>
                            <FontAwesome style={styles.icon} name="lock" size={24} color="white" />
                            <FontAwesome style={styles.icon} name="lock" size={24} color="white" />
                            <FontAwesome style={styles.icon} name="lock" size={24} color="white" />
                        </View>
                        <View style={styles.pair}>
                            <Text style={styles.tag}>Genre:</Text>
                            <Text style={styles.tag}>TERROR</Text>
                        </View>
                        <View style={styles.pair}>
                            <Text style={styles.tag}>Price:</Text>
                            <Text style={styles.tag}>50-90€</Text>
                        </View>
                        <View style={styles.pair}>
                            <Text style={styles.tag}>2-6</Text>
                            <MaterialIcons style={styles.icon} name="people" size={24} color="white" />
                        </View>
                    </View>
                    <View style={styles.rateHeader}>
                        <View style={styles.rate}>
                            <StarRating style={styles.star} starSize={25} maxStars={5} rating={3} fullStarColor={'yellow'} halfStarColor={'yellow'} emptyStarColor={'yellow'} />
                        </View>
                        <View style={styles.comment}>
                            <Text style={styles.tag}>+ ADD A COMMENT</Text>
                        </View>
                    </View>
                    <View style={styles.review}>
                        <Review username={'Tyler Durden'} comment={'Was a nice expirience, but it was not me.'} rating={4} />
                        <Review username={'Tyler Durden'} comment={'Was a nice expirience, but it was not me.'} rating={4} />
                        <Review username={'Tyler Durden'} comment={'Was a nice expirience, but it was not me.'} rating={4} />
                        <Review username={'Tyler Durden'} comment={'Was a nice expirience, but it was not me, or yes, maybe was marla I am not sure.'} rating={4} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4ecdc4',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        width: '40%',
        marginBottom: 10,
    },
    comment: {
        backgroundColor: '#4ecdc4',
        borderRadius: 20,
        padding: 5
    },
    container: {
        flex: 1,
        backgroundColor: '#f8f4f4'
    },
    description: {
        padding: 20,
    },
    details: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 20,
        backgroundColor: '#4ecdc4',
        width: '100%',
        padding: 5,
        borderRadius: 20
    },
    font: {
        color: 'white'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        marginHorizontal: 3
    },
    image: {
        width: '100%',
        height: 200,
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    interaction: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -5
    },
    introduction: {
        fontSize: 16,
        textAlign: 'justify'
    },
    pair: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5
    },
    personal: {
        flexDirection: 'row',
        margin: 10,
        backgroundColor: '#fff',
        width: '40%',
        justifyContent: 'space-around',
        borderRadius: 10
    },
    profile: {
        marginHorizontal: 5
    },
    punctuation: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '20%',
        backgroundColor: 'white',
        width: 'auto',
        borderRadius: 50,
        margin: 10,
        padding: 5
    },
    rate: {
        width: 'auto',
        backgroundColor: '#fc5c65',
        borderRadius: 20,
        marginVertical: 10,
        padding: 5
    },
    rateHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    review: {
        backgroundColor: '#fc5c65',
        padding: 5,
        borderRadius: 20,
    },
    star: {
        color: 'yellow',
    },
    tag: {
        fontSize: 18,
        color: 'white',
        ...Platform.select({
            ios: {
                fontFamily: 'Avenir'
            },
            android: {
                fontFamily: 'Roboto'
            }
        }),
        fontWeight: 'bold',
        marginHorizontal: 5
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fc5c65',
        marginVertical: 5
    },
    visit: {
        width: '100%',
        alignItems: 'center'
    }
})