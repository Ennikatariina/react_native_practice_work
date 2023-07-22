import React, { useState } from 'react';
import {StyleSheet, Alert} from 'react-native';

//Create an alert with three buttons
const threeButtonAlert = () => {
    return (Alert.alert('Alert Title', 'My Alert Msg', [
        {
           text: 'OK',
           onPress: () => console.log('Ok'),
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