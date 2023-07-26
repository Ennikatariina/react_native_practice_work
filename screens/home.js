import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, Button, FlatList,TouchableOpacity, Alert} from 'react-native';
import FormModel from '../components/FormModel.js'
import threeButtonAlert from '../functions/threeButtonAlert.js';
import { globalStyles } from '../styles/global.js';
import { readAllPersons } from '../database/db.js';


const Home =()=>{

    const [personsList, setPersonsList]=useState([])
    const [visibility, setVisibility]=useState(false)

    //Reads the information from the database and puts it in the list 
    async function readPersonalInformation () {
       const allPersonsInformation = await readAllPersons() //Reads the information from the database, returns json array which is set to the const allPersonInformation array.
        setPersonsList(allPersonsInformation) //The information in the allPersonInformation array is set to the state variable
        setVisibility(false) // make the modelForm invisible
    };
    //Ei toimi
    useEffect(()=>{
        renderItem
        console.log("useEffect")
    },[readAllPersons])

    //Renders the data in the list one at a time ti the screen
    const renderItem=({item, index}) =>{
        return (
          <TouchableOpacity onLongPress={()=>threeButtonAlert(item.id) }>
          <Text style={styles.itemStyle} key={index}>
            {item.firstname} {item.lastname}, {item.age} vuotta
            </Text>
            </TouchableOpacity>
        )
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
                readPersonalInformation={readPersonalInformation} 
                modalVisibility={modalVisibility}/>
            <Button style={globalStyles.oneButtonStyle} title="Add person" onPress={()=> {modalVisibility(true)}}/>
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