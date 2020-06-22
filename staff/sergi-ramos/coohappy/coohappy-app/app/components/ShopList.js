import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, Dimensions, AsyncStorage } from 'react-native'
import HeaderHome from './HeaderHome'
import SingleFruit from './SingleFruit'
import { foodItems } from '../constants/food-items'
import { retrieveUserFoodList, retrieveCohousing } from 'coohappy-client-logic'


const ShopList = function ({ navigation }) {


    const [userFoodList, setUserFoodList] = useState([])
    const [cohousing, setCohousing] = useState()

    useEffect(() => {
        (async ()=> {
            const token = await AsyncStorage.getItem('TOKEN')
            const _cohousing = await retrieveCohousing(token)
            setCohousing(_cohousing)

        })()

    }, [])

    const handleOnUpdateList = () => {

        (async () => {
            const token = await AsyncStorage.getItem('TOKEN')

            const foodList = await retrieveUserFoodList(token)

            setUserFoodList(foodList.foodList)
        })()
    }
    useEffect(() => {

    }, [userFoodList])



    return (


        <View style={styles.container}>
            <HeaderHome navigation={navigation} cohousingInfo={cohousing}/>

            {userFoodList.length ?

                <Text style={styles.shoppingTitle}>Your shopping list!</Text> :

                <Text style={styles.shoppingTitle}>Make your shopping list!</Text>

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
        marginLeft: 25
    },
    shoppingParagraph: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 25,
        fontSize: 18,
        color: '#81868e'
    },
    foodList: {
        marginTop: 40
    },
    weight: {


        marginLeft: 25,
        fontWeight: '700',
        fontSize: 17
    },
    name: {
        fontWeight: '500'
    }
})