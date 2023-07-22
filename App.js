import React, { useState } from 'react';
import {StyleSheet, Text, View, TextInput, Button, Modal, FlatList,TouchableOpacity} from 'react-native';
import Home from './screens/home'

const App = () => {

  return(
    <View style={styles.container}>
      <Text>Testi</Text>
      <Home></Home>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
      flex:1,
      
  }
})

export default App;