import React, { useState } from 'react';
import {StyleSheet, Text, View, Button, FlatList,TouchableOpacity, Alert} from 'react-native';
import FormModel from '../components/FormModel.js'
import threeButtonAlert from '../functions/threeButtonAlert.js';
import { globalStyles } from '../styles/global.js';

const Home =()=>{

    const [personsList, setPersonsList]=useState([])
    const [visibility, setVisibility]=useState(false)

    //Add the user's information to the list
    const addPersonalInformationToList= (firstName, lastName, age)=> {
        setPersonsList (list =>[...list,{firstname:firstName, lastname:lastName, age:age}])
        console.log(personsList)
        setVisibility(false) //
    };

    //Renders the data in the list one at a time ti the screen
    const renderItem=({item, index}) =>{
        return (
          <TouchableOpacity onLongPress={()=>threeButtonAlert() }>
          <Text style={styles.itemStyle} key={index}>
            {item.firstname} {item.lastname}, {item.age} vuotta
            </Text>
            </TouchableOpacity>
        )
      }
      //Open FormModal visible
    const openModal=() =>{
        setVisibility(true)
    }
    //TÄTÄ EI VIELÄ KÄYTETÄ
    //Delete one item from the list and view.
    const deleteItem=(index) =>{
        setPersonsList(list=>{return list.filter((person, id)=>{return id!= index})})
      }
      //Sets the state variable to true ar false
    const modalVisibility=(value)=>{
        setVisibility(value)     
    }

    return(
        <View style={styles.container}>
            <FormModel 
                visibility={visibility} 
                addPersonalInformationToList={addPersonalInformationToList} 
                modalVisibility={modalVisibility}/>
            <Button style={globalStyles.oneButtonStyle} title="Add person" onPress={()=> {openModal()}}/>
            <View style={styles.listStyle}>
                <FlatList
                data={personsList}
                renderItem={renderItem}/>
             </View>
        </View>
    );
};
//Styles
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        flex:1,
        alignItems:'center',
        justifyContent:'center',  

    },
    listStyle: {
        width:'80%',
    },
    itemStyle: {
        padding: 10,
        borderTopWidth: 2,
        borderTopColor: '#eee',
        fontWeight: 'bold',
        borderRadius:10,
        elevation:3,
        backgroundColor:'#fff',
        shadowColor: '#333',
        marginHorizontal: 4,
        marginVertical: 8,
    }
})
export default Home;