import React, { useState,useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, ImageBackground, Dimensions, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Searchbar, Button } from 'react-native-paper';
import Results from './results';
import AsyncStorage from '@react-native-community/async-storage'
// 
const Search = () => {
  var [url, setURL] = useState('loading...')
  var [city, setCity] = useState('');
  const [data, setData] = useState({
    name: "loading...",
    temp: "loading...",
    humidity: "loading",
    clouds: "loading...",
    country: "loading",
    icon: "-",
  });
   useEffect( ()=>{
   async function get (){
      url=await AsyncStorage.getItem('image')
      city=await AsyncStorage.getItem('city')
      fetcCities(city)
    console.log(city +"from use effect");
    console.log(url +"from use effect");
   }
  })
  console.log(city);
  
 async function image (text) {
    setURL(text);
    (await AsyncStorage.setItem("image",url))
    console.log(url + "from SearchScreen");
  }


  const fetcCities =async (text) => {
    setCity(text)
      
      await AsyncStorage.setItem("city",text)
      console.log(city);

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${text}&appid=7b686b5a40de14e0bd5e63deb86f5ddf`, {
      method: "GET",
      mode: "no-cors",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        "Access-Control-Allow-Headers": "*",
      },
    }, 
    
    )
      .then(item => item.json())
      .then((json) => {setData({
        name: json.name,
        temp: json.main.temp,
        humidity: json.main.humidity,
        clouds: json.weather[0].description,
        country: json.sys.country,
        icon: json.weather[0].icon,
      })
    })
      .catch(function (err) {
        console.log(err + "search error")
      }).finally(() => console.log(`data loading....`))
     
  }

  return (
    <ImageBackground source={{ uri: url }} style={styles.image}>
      <StatusBar hidden={true} />
      <LinearGradient colors={['rgba(123, 116, 91, 0.81)', 'rgba(11, 10, 4, 0.81)']} style={styles.gradient}>
        <Text style={styles.title}>Mausam</Text>
        <Text style={styles.superScript}>  v1.2</Text>
      </LinearGradient>
      <Searchbar
        placeholder='Search City'
        placeholderTextColor="grey"
        color='white'
        iconColor="white"
        value={`${city}`}
        onChangeText={text => fetcCities(text)}
        style={styles.search}
      />
      <Results data={data} image={image} />
    </ImageBackground >
  );
};
const styles = StyleSheet.create({
  gradient: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    borderBottomRightRadius: 80,
    borderBottomLeftRadius: 80,
    borderRadius: 30,
    margin: 15,
    marginTop: 5,
    borderColor: '#d1d1eb',
    borderWidth: 2,
    flexDirection:'row'
  },
  title: {
    color: '#b2bddb',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 24,
    fontFamily: 'serif'
  },
  header: {
    backgroundColor: 'hsla(16, 2%, 67%, 1)',
  },
  search: {
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 30,
    margin: 5,
    backgroundColor: 'hsla(16, 2%, 67%, 0.35)',
    color: "white"
  },
  button: {
    backgroundColor: '#217cca',
    borderRadius: 30,
    width: 120,
    alignSelf: 'center',
  },
  image: {
    height: Dimensions.get('window').height,
    width: Dimensions.get("window").width,
    resizeMode: "contain",
  },
  superScript:{
    // lineHeight:37, 
    fontSize:14,
    color:"#fff",
    top:5
  }
});
export default Search;