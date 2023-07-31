import React from 'react';
import {StyleSheet, View} from 'react-native';
import Home from './screens/home'
import { init } from './database/db';


init()
.then(()=>{
    console.log('Database creation succeeded!');
}).catch((err)=>{
  console.log('Database IS NOT initialized! '+err);
});
const App = () => {

  return(
    <View style={styles.container}>
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