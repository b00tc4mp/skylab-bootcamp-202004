import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native'
import styles from './styles'
import HeaderHome from '../../HeaderHome'
import SingleFruit from '../SingleFruit'
import ShopListAdmin from '../ShopListAdmin'
import { foodItems } from '../../../constants/food-items'
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
                                <SvgUri on style={styles.itemSettings} source={require('../../../assets/ic-configuration.svg')} />
                            </TouchableOpacity>

                        }

                    </View>
                </> :

                <>
                    <View style={styles.settings}>
                        <Text style={styles.shoppingTitle}>Make your shopping list!</Text>

                        {userRole === 'admin' &&

                            <TouchableOpacity onPress={() => navigation.navigate(ShopListAdmin)} activeOpacity={0.8} style={{ marginTop: 25 }}>
                                <SvgUri style={styles.itemSettings} source={require('../../../assets/ic-configuration.svg')} />
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

