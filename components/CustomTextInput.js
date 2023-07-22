import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';


const CustomTextInput = ({ label}) => (
  <View style={styles.container}>
    <View style={styles.labelContainer}>
      <Text>{label}</Text>
    </View>
    <View style={styles.inputContainer}>
      <TextInput style={styles.textInput} />
    </View>
  </View>
);

const styles = StyleSheet.create({
    container: {
      height: 65, 
      position: 'relative',
    },
    labelContainer: {
      position: 'absolute',
      backgroundColor: '#FFF',
      top: 5,
      left: 25,
      padding: 5,
      zIndex: 50,
    },
    inputContainer: {
        flex: 1, // Auttaa venyttämään TextInputia koko tilaan
        borderWidth: 2,
        borderColor: 'purple',
        justifyContent: 'flex-end',
        height: 44,
        borderRadius: 10,
        paddingHorizontal: 25,
        marginTop: 20,
      },
      textInput: {
        flex: 1, // Auttaa venyttämään TextInputia koko tilaan
      },
    });

export default CustomTextInput;