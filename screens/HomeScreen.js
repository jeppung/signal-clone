import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Avatar, Button } from '@rneui/themed'
import useAuth from '../hooks/useAuth'
import {AntDesign, SimpleLineIcons} from '@expo/vector-icons'
import CustomListItem from '../components/CustomListItem'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const HomeScreen = () => {

    const {user, logout} = useAuth();
    const [chats, setChats] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        onSnapshot(collection(db, 'users'), snapshot => {
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        });
    }, []);

    // console.log(chats);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Signal',
            headerStyle: {  backgroundColor: '#fff' },
            headerTitleStyle: {color: 'black'},
            headerTintColor: "black",
            headerLeft: () => (
                <View>
                    <TouchableOpacity onPress={logout}>
                        <Avatar source={{uri: user.photoURL}} rounded/>
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 80}}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name='camerao' size={24} color='black'/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('AddChat')}>
                        <SimpleLineIcons name='pencil' size={24} color='black'/>
                    </TouchableOpacity>
                </View>
            )
            
        });
    }, []);

  return (
    <View>
        <StatusBar style='dark'/>
        <ScrollView style={styles.container}>
            {chats.map(({id, data: {chatName}}) => (
                <CustomListItem key={id} id={id} chatName={chatName}/>
            ))}
        </ScrollView>
    </View>
  )
}       

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
})