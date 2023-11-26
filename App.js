import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';
import {useEffect,useState} from 'react'
import {WebView} from 'react-native-webview';
import netinfo,{NetInfoStateType} from '@react-native-community/netinfo';

export default function App() {
  const [isConnected,setConnected] = useState(true)
  useEffect(() => {
    const unsubscribe = netinfo.addEventListener((state) => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      setConnected(state.isConnected)
    });
    return () => 
    {
      unsubscribe()
    }
  },[])
  return (
    <View style={{ flex: 1 }}>
      {isConnected ? (
        <WebView source={{ uri: 'https://frontend-vue-elibrary.vercel.app/' }} />
      ) : (
        <View style={styles.container}>
      
        <Image style={styles.image} source={require('./assets/delete.png')}></Image>
        <Text>Tidak Terhubung Ke Internet !</Text>
        <StatusBar style="auto" />
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
  }
});
