import React, { useState } from 'react';
import {StyleSheet, Text, View, TextInput, Button, Modal, FlatList,TouchableOpacity} from 'react-native';
import { globalStyles } from '../styles/global';
import { savePerson } from '../database/db';

const FormModel = (props)=>{

    const [firstName, setFirstName]= useState('')
    const [lastName, setLastName]= useState('')
    const [age, setAge]= useState('')

     //a function that sets the data entered by the user in the state variable firstname
     const firstNameInputHandler = (enteredText) =>{
        setFirstName(enteredText)
    }
    //set the user's lastname to the state variable from the textInput field
    const lastNameTypeInputHandler = (enteredText) =>{
        setLastName(enteredText)
    }
    //set the user's age to the state variable from the textInput field
    const ageInputHandler = (enteredText) =>{
        setAge(enteredText)
    }
    //Adds the user's information to the database and then retrieves the information from the database and clear textInput fields. 
  async function addPersonalInformationToDatabase() {
        await savePerson(firstName, lastName, age) //save firstname, lastname ang age in the database.
        props.readPersonalInformation() //Call the readPersonalInformation fucntion from home.js file
        setFirstName('') //Clear textInputs
        setLastName('')
        setAge('')
    }
    //When user press cancel button this function actived.
    //Clears textInput fields and set the state variable setVisibility to false.
    const clearTextInput =()=>{
        setFirstName('')
        setLastName('')
        setAge('')
        props.modalVisibility(false) //Let's set the state variable setVisibility to false
    }
    return(
        <Modal visible={props.visibility}>
            <View style={styles.formstyle}>
                <Text>First name</Text>
                <TextInput style={styles.textInput} onChangeText={firstNameInputHandler} value={firstName} />
                <Text>Last name</Text>
                <TextInput style={styles.textInput} onChangeText={lastNameTypeInputHandler} value={lastName}/>
                <Text>Age</Text>
                <TextInput 
                keyboardType='numeric'
                style={styles.textInput} 
                onChangeText={ageInputHandler} 
                value={age}/>
            </View>
            <View style={styles.buttonStyle}>
                <View style={globalStyles.oneButtonStyle}>
                    <Button title="OK" onPress={addPersonalInformationToDatabase}/>
                </View>
                <View style={globalStyles.oneButtonStyle}>
                    <Button title="Cancel" onPress={clearTextInput}/>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    formstyle:{
        alignSelf: 'center'
    },
    textInput:{
        fontSize: 22,
        paddingHorizontal: 10,
        paddingTop: 8,
        borderWidth: 1.5,
        borderRadius: 5,
        width:200,
       
    },
    buttonStyle:{
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: 'row',
        justifyContent:'center'
    },
    

})

export default FormModel;