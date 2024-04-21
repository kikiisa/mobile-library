import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native';
import {useEffect,useState} from 'react'
import {WebView} from 'react-native-webview';
import netinfo,{NetInfoStateType} from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export default function App() {
  const [isConnected,setConnected] = useState(true)
  useEffect(() => {
    const unsubscribe = netinfo.addEventListener((state) => {
      setConnected(state.isConnected)
    });
    return () => 
    {
      unsubscribe()
    }
  },[])
  return (
    <View style={{ flex: 1}}>
      {isConnected ? (
        <WebView source={{ uri: 'https://frontend-vue-elibrary.vercel.app/' }} />
      ) : (
        <View style={styles.container}>
      
        <Image style={styles.image} source={require('./assets/delete.png')}></Image>
        <Text>Tidak Terhubung Ke Internet !</Text>
        <StatusBar hidden/>
      </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    width: 200,
    height: 200,
  },
});
