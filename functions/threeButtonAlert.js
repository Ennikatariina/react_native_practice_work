import React, { useState } from 'react';
import {StyleSheet, Alert} from 'react-native';
import { deletePersonFromDb } from '../database/db';

//Create an alert with three buttons
const threeButtonAlert = (id) => {
  console.log("index", id)
    return (Alert.alert('Alert Title', 'My Alert Msg', [
        {
           text: 'OK',
           onPress: () => {deletePersonFromDb(id)},
         },
         {
           text: 'Cancel',
           onPress: () => console.log('Cancel Pressed'),
           style: 'cancel',
         },
         {text: 'Archive', onPress: () => console.log('Archive')},
       ])  );
}
 
export default threeButtonAlert;