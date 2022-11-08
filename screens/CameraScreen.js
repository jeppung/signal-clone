import { Image, StyleSheet, Text, Touchable, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Camera, CameraType } from 'expo-camera'
import { StatusBar } from 'expo-status-bar'
import CameraButton from '../components/CameraButton'

const CameraScreen = () => {

    const [type, setType] = useState(CameraType.back)
    const [image, setImage] = useState(null);
    const [permission, setPermission] = useState(null);
    const cameraRef = useRef();

    useEffect(() => {
        const test = async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setPermission(cameraStatus.status === 'granted');
        }

        test();
    }, [permission]);

    const takePhoto = async () => {
      if(cameraRef){
        try{
          const data = await cameraRef.current.takePictureAsync({
            quality: 1,
          });
          console.log(data);
          setImage(data.uri);
        }catch(e){
          console.log(e);
        }
      }
    }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'#000'}}>
        <StatusBar style='light'/>
        {!image ? (
            <Camera
                ref={cameraRef}
                style={{width: '100%', aspectRatio: 9/16}}
                ratio= '16:9'
                type={type}
            />
        ):(
            <Image source={{uri: image}} style={{width: '100%', aspectRatio: 9/16}}/>
        )}
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', }}>
        {!image ? (
          <View style={{flexDirection: 'row',  width: '100%', justifyContent: 'space-evenly'}}>
            <CameraButton icon="retweet" onPress={() => {}}/>
            <CameraButton icon="camera" onPress={takePhoto}/>
            <CameraButton icon="flash" onPress={() => {}}/>
          </View>
        ) : (
          <View style={{flexDirection: 'row',  width: '100%', justifyContent: 'space-evenly'}}>
            
          </View>
        )}
        </View>
        
    </SafeAreaView>
  )
}

export default CameraScreen

const styles = StyleSheet.create({})