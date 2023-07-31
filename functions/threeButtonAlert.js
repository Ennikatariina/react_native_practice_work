import React, { useState } from 'react';
import {Alert} from 'react-native';
import { deletePersonFromDb, updateArchivedFromDb } from '../database/db';

//Create an alert with three buttons
const threeButtonAlert = (id, setPersonsList, personsList) => { 

  console.log("index", id);
  return (
    Alert.alert('Do you want to delete the item', ' ', [
      {
        text: 'OK',
        onPress: () => {
          deletePersonFromDb(id);
          const updatedPersonsList = personsList.filter(person => person.id !== id);
          setPersonsList(updatedPersonsList);
        },
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Archive',
        onPress: () => updateArchivedFromDb(id),
      },
    ])
  );
}

export default threeButtonAlert;