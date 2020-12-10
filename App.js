import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View,ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Search from './components/SearchScreen'
export default function App() {
  return (
    <View style={{flex:1,backgroundColor:'#97b1e8'}}>
    <StatusBar style="auto" />
    <Search />
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
   
  },
});
