import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {Entypo} from '@expo/vector-icons'

const CameraButton = ({icon, color, onPress}) => {
  return (
    <View style={{padding: 15, backgroundColor: 'green', borderRadius: 50}}>
      <TouchableOpacity onPress={onPress} style={{height: 40, alignItems: 'center', justifyContent: 'center'}}>
        <Entypo name={icon} size={28} color={color ? color : '#f1f1f1'}/>
      </TouchableOpacity>
    </View>
  )
}

export default CameraButton

const styles = StyleSheet.create({})