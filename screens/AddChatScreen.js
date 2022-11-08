import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button, Icon, Input } from '@rneui/themed';
import { db } from '../firebase';
import { addDoc, collection, setDoc } from 'firebase/firestore';

const AddChatScreen = () => {

    const [input, setInput] = useState('');
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add a new chat',
        });
    }, []);


    const createChat = async () => {
        await addDoc(collection(db, 'users'), {
            chatName: input
        }).then(() => navigation.goBack()).catch(err => alert(err));
    }

  return (
    <View style={styles.container}>
      <Input placeholder='Enter a chat name' value={input} onChangeText={text => setInput(text)}
        leftIcon={
            <Icon name='wechat' type='antdesign' size={24} color='black'/>
        }
      />
      <Button onPress={createChat} title='Create new Chat'/>
    </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 30,
    }
})