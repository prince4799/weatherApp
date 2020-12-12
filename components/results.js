import React,{useState,useEffect} from 'react';
import { StyleSheet,Image,Dimensions,Text,ImageBackground ,View} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
const customwidth =Dimensions.get("window").width;
const customheight =Dimensions.get("window").height;
const Results = ({ data ,image}) => {
    const [imageURL,setImageURL]=useState('loading...');
    useEffect(()=>{
        fetch(`https://api.unsplash.com/search/photos?page=1&query=${data.name}&client_id=YOUR_API_KEY`,{
        method:"GET",
        mode:"no-cors",
        headers:{
            Accept: 'application/json',
                "Access-Control-Allow-Headers":"*",
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Methods":"*",
                "Content-Type":"application/json",
            }
        })
        .then(item=>item.json())
        .then((json)=>setImageURL(json.results[1].urls.regular))
        .catch(function(err){console.log(err+"catch error in results...")})
        .finally(()=>console.log("finally in results."))
        image(imageURL);
    });
    return (
        
            
         <View style={{justifyContent:'center'}}> 
           <Text style={{left:15,fontSize:25, top:20,color:"#020203",fontFamily:'monospace',fontWeight:'bold'}}  >{(data.name).toUpperCase()}</Text>
           <Text style={{left:15,fontSize:18, top:20,color:"#020203",fontFamily:'monospace'}} >{data.country}</Text>
           <View style={{height:60,width:60,borderRadius:30}}>
            <Image 
               style={{
                   width:65,
                   height:65,
                   left:240,top:155,
                   backgroundColor: 'rgba(39, 180, 236, 0.62)',
                   borderColor:"white",
                   borderWidth: 2,
                   borderRadius:40
               }}
               source={{uri:`https://openweathermap.org/img/w/${data.icon}.png`}}
               />
              </View>
              <View style={styles.content}>
            <Card.Content>
                <Title style={{color:"black",}}>Weather in city</Title>
            <Text  style={{color:"black",fontSize:16}} >Avg. Temperature: {(data.temp - 273.15).toFixed(2)}{'\u00b0'}C{'\n'}</Text>
                <Text  style={{color:"black",fontSize:16}} >Sky:     {(data.clouds).toUpperCase()}{'\n'}</Text>
                <Text  style={{color:"black",fontSize:16}} >Humidity:   {(data.humidity)}{'\n'}</Text>
            </Card.Content>
           </View>
       </View>
       
    );
};
const styles = StyleSheet.create({
    card: {
        top:0,
        height:customheight,
        width:customwidth,
        alignSelf:'center',
        resizeMode:"cover",
    },content:{
        backgroundColor:'rgba(244, 240, 225, 0.3)',
        padding:5,
        margin:15,
        borderRadius:30,
        top:80,
        borderWidth:2,
        borderColor:'#fff'
    }
})
export default Results;
