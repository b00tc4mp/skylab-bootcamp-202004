import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Image, Alert } from 'react-native'
import styles from './styles'
import { addFood, substractFood, retrieveUserFoodList } from 'coohappy-client-logic'


const SingleFruit = function ({ item, updateList }) {

    const [userFoodList, setUserFoodList] = useState([])

    useEffect(() => {

        (async () => {
         
            const foodList = await retrieveUserFoodList()
            setUserFoodList(foodList.foodList)
        })()

    }, [])

    useEffect(() =>{
    },[userFoodList])

    const handleOnAddFood = async (food) => {

        try {

            await addFood(food)
            const foodList = await retrieveUserFoodList()
            setUserFoodList(foodList.foodList)
            updateList()
        } catch (error) {
            Alert.alert('OOPS!!', error.message)
        }
    }
    const handleOnSubstractFood = async (food) => {

        try {
            debugger
            
            await substractFood(food)
            const foodList = await retrieveUserFoodList()
            
            setUserFoodList(foodList.foodList)
            updateList()
 
        } catch (error) {
         
            Alert.alert('OOPS!!', error.message)
        }
    }

    return (<>

        <View style={styles.containerShopList}>

            <Image style={styles.containerFruitItem} source={item.img} />

            {

                (userFoodList && userFoodList.findIndex(x => x.name === item.name)) === -1 ?
                    <>
                        <Text style={styles.fruitName}>{item.name}</Text>

                        <TouchableOpacity onPress={() => handleOnAddFood(item.name)}>
                            <Text style={styles.addText}>Add</Text>
                        </TouchableOpacity>
                    </> :
                    <>
                        <View style={styles.plusNameContainer}>
                            <Text style={styles.plusText}>{item.name}</Text>
                            <TouchableOpacity onPress={() => handleOnAddFood(item.name)} activeOpacity={0.8}>
                                <Image style={styles.plus} source={require('../../../assets/btn-more.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.lessWeightContainer}>
                            <Text style={styles.lessText}>{userFoodList[userFoodList.findIndex(x => x.name === item.name)].weight + 'Kg'}</Text>
                            <TouchableOpacity onPress={() => handleOnSubstractFood(item.name)} activeOpacity={0.8}>
                                <Image style={styles.less} source={require('../../../assets/btn-less.png')} />
                            </TouchableOpacity>
                        </View>
                    </>
            }
        </View>
    </>)
}

export default SingleFruit



