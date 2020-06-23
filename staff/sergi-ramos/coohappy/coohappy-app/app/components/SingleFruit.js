import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, AsyncStorage, Dimensions, Image, Alert } from 'react-native'
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
            console.log(error)
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
                                <Image style={styles.plus} source={require('../assets/btn-more.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.lessWeightContainer}>
                            <Text style={styles.lessText}>{userFoodList[userFoodList.findIndex(x => x.name === item.name)].weight + 'Kg'}</Text>
                            <TouchableOpacity onPress={() => handleOnSubstractFood(item.name)} activeOpacity={0.8}>
                                <Image style={styles.less} source={require('../assets/btn-less.png')} />
                            </TouchableOpacity>
                        </View>
                    </>
            }
        </View>
    </>)
}

export default SingleFruit



const styles = StyleSheet.create({

    containerShopList: {
        width: Dimensions.get('window').width / 2,
        backgroundColor: 'white'
    },
    containerFruitItem: {
        alignSelf: 'center',
        width: Dimensions.get('window').width / 2 - 25,
        height: Dimensions.get('window').width / 2 - 25,
        
        borderRadius: 15,

    },
    addText: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20,
        color: '#069b69',
        borderWidth: 1,
        borderColor: '#ffd545',
        borderRadius: 20,
        width: Dimensions.get('window').width / 2 - 30,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 15,
        marginBottom: 40
    },
    fruitName: {
        alignSelf: 'center',
        fontSize: 20,
        color: 'black',
        marginTop: 10
    },
    plusNameContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 15,
        marginTop: 10,


    },
    lessWeightContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 15,
        marginTop: 10,
        marginBottom: 50
    },
    plus: {
        marginLeft: 50,

    },
    less: {
        marginLeft: 45
      
    },
    plusText: {
        fontSize: 20
    },
    lessText: {
        fontSize: 20,
        fontWeight: '700',
        width: 70

    }
})