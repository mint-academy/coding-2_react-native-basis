import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import ListView from '../components/ListView';

export default function TodosScreen() {
  return (
      <View style={styles.container}>
        <ListView></ListView>
      </View>
    );
}

/*
 Definition der CSS-Styles
   im Objekt "styles" 
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 10,
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: '#F8F8F8',
  }
});

TodosScreen.navigationOptions = {
  title: 'Aufgaben',
};
