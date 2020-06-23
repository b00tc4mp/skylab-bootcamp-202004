import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, Dimensions, AsyncStorage } from 'react-native'
import HeaderHome from './HeaderHome'
import SingleFruit from './SingleFruit'
import ShopListAdmin from './ShopListAdmin'
import { foodItems } from '../constants/food-items'
import { retrieveUserFoodList, retrieveCohousing, retrieveUser } from 'coohappy-client-logic'
import SvgUri from 'expo-svg-uri';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native'


const ShopList = function ({ navigation }) {


    const [userFoodList, setUserFoodList] = useState([])
    const [cohousing, setCohousing] = useState()
    const [userRole, setUserRole] = useState()


    useFocusEffect(
        React.useCallback(() => {
            (async () => {
                const _cohousing = await retrieveCohousing()
                setCohousing(_cohousing)
            })()

            return () => {
            }
        }, [])
    )

    useEffect(() => {
        (async () => {
            const _cohousing = await retrieveCohousing()
            setCohousing(_cohousing)
            const user = await retrieveUser()
            const { role } = user
            setUserRole(role)

        })()
    }, [])

    const handleOnUpdateList = () => {

        (async () => {
            const foodList = await retrieveUserFoodList()
            setUserFoodList(foodList.foodList)
        })()
    }
    useEffect(() => {

    }, [userFoodList])


    return (

        <View style={styles.container}>
            <HeaderHome navigation={navigation} cohousingInfo={cohousing} />

            {userFoodList.length ?
                <>
                    <View style={styles.settings}>
                        <Text style={styles.shoppingTitle}>Your shopping list!</Text>
                        {userRole === 'admin' &&

                            <TouchableOpacity onPress={() => navigation.navigate(ShopListAdmin)} activeOpacity={0.8} style={{ marginTop: 25 }}>
                                <SvgUri on style={styles.itemSettings} source={require('../assets/ic-configuration.svg')} />
                            </TouchableOpacity>

                        }

                    </View>
                </> :

                <>
                    <View style={styles.settings}>
                        <Text style={styles.shoppingTitle}>Make your shopping list!</Text>

                        {userRole === 'admin' &&

                            <TouchableOpacity onPress={() => navigation.navigate(ShopListAdmin)} activeOpacity={0.8} style={{ marginTop: 25 }}>
                                <SvgUri style={styles.itemSettings} source={require('../assets/ic-configuration.svg')} />
                            </TouchableOpacity>


                        }
                    </View>
                </>
            }

            <View>
                <View style={styles.bar}></View>
            </View>

            {userFoodList.length === 0 ?
                <Text style={styles.shoppingParagraph}>Every Monday at 10:00 the community shopping list closes to send it to the supplier. You have until then to select your products.</Text> :
                userFoodList.map(item =>

                    <Text style={styles.weight}>{item.weight + 'Kg '}<Text style={styles.name}>{item.name}</Text></Text>

                )

            }

            <View>
                <View style={styles.bar}></View>
            </View>

            <FlatList
                data={foodItems}
                style={styles.foodList}
                numColumns={'2'}
                renderItem={({ item }) =>
                    <>
                        <View>
                            <SingleFruit updateList={handleOnUpdateList} item={item} />
                        </View>

                    </>
                } />
        </View>
    )
}

export default ShopList

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height - 20,
        backgroundColor: 'white'
    },
    bar: {
        width: '100%',
        height: 0.8,
        backgroundColor: '#003725',
        marginBottom: 10,
        marginTop: 10
    },
    shoppingTitle: {
        fontWeight: '700',
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 15
    },
    shoppingParagraph: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15,
        fontSize: 18,
        color: '#81868e'
    },
    foodList: {
        marginTop: 40
    },
    weight: {


        marginLeft: 15,
        fontWeight: '700',
        fontSize: 17
    },
    name: {
        fontWeight: '500'
    },
    settings: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemSettings: {
        alignSelf: 'center',
        marginRight: 20
    }
})