import { FlatList, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Avatar } from '@rneui/themed';
import {AntDesign, FontAwesome, Ionicons, Entypo} from '@expo/vector-icons'
import { Button } from '@rneui/themed';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

const ChatScreen = () => {

    const {params} = useRoute();
    const {chatName, id} = params;
    const [input, setInput] = useState('');
    const [chats, setChats] = useState([]);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitleAlign: 'left',
            headerTitle: () => (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Avatar source={{uri: 'https://avatars.dicebear.com/api/male/john.svg?background=%230000ff'}} rounded/>
                    <Text style={{color: 'black', marginLeft: 10, fontWeight: '700'}}>{chatName}</Text>
                </View>
            ),
            headerRight: () => (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 75}}>
                    <TouchableOpacity>
                        <FontAwesome name='video-camera' size={24} color="black"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name='call' size={24} color="black"/>
                    </TouchableOpacity>
                </View>
            ),
            headerStyle: {  backgroundColor: '#fff' },
            headerTitleStyle: {color: 'black'},
            headerTintColor: "black",
        })
    }, [navigation]);


    useEffect(() => 
        onSnapshot(query(collection(db, 'chats', id, 'messages'), orderBy('timestamp', 'desc')), 
        snapshot => setChats(snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))))
    , [db, id]);

    const sendMessage = async () => {
        addDoc(collection(db, 'chats', id, 'messages'), {
            timestamp: serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        });

        setInput('');
    }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1,}}>
            <FlatList
                inverted
                data={chats}
                keyExtractor={item => item.id}
                renderItem={({item}) => 
                    item.email == auth.currentUser.email ? (
                        <View key={id} style={styles.sender}>
                            <Avatar source={{uri: item.photoURL}} size={30} position='absolute' bottom={-15} right={-5} rounded/>
                            <Text style={styles.senderText}>{item.message}</Text>
                        </View>
                    ):(
                        <View style={styles.receiver}>
                            <Avatar source={{uri: item.photoURL}} size={30} position='absolute' bottom={-15} left={-5} rounded/>
                            <Text style={styles.receiverText}>{item.message}</Text>
                        </View>
                    )
                }
            />
            <View style={styles.footer}>
                <TextInput placeholder='Signal Message' style={styles.textInput} value={input} onChangeText={text => setInput(text)} />
                <View style={{width: '20%', flexDirection:'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Camera')}>
                        <Entypo name='camera' size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                        <Ionicons name='send' size={24} color='#2B68e6'/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </TouchableWithoutFeedback>
      
  )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: 'tranparent',
        backgroundColor: '#ECECEC',
        borderWidth: 1,
        padding: 10,
        color: 'gray',
        borderRadius: 30
    },
    sender: {
        padding: 15,
        backgroundColor: '#ECECEC',
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative'
    },
    receiver: {
        padding: 15,
        backgroundColor: '#2B68E6',
        alignSelf: 'flex-start',
        borderRadius: 20,
        margin: 15,
        maxWidth: '80%',
        position: 'relative'
    },
    receiverText: {
        color: 'white'
    }
})