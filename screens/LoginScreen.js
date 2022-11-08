import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Input, Image } from '@rneui/themed'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebase'
import useAuth from '../hooks/useAuth'
import { signInWithEmailAndPassword } from 'firebase/auth'

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const {setUser, setLoadingInitial} = useAuth();

    const signIn = async () => {
        navigation.navigate('Loading');
        signInWithEmailAndPassword(auth, email, password)
        .then((user) => setUser(user)).catch(err => console.log(err));
    }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            contentContainerStyle={Platform.OS}
            keyboardVerticalOffset={150}
            style={styles.container}
        >
            <StatusBar style='light'/>
            <Image source={{uri: 'https://coxy.co/wp-content/webp-express/webp-images/uploads/2019/07/Signal-Messenger-Icon-385x385.png.webp'}}
                style={{width: 200, height: 200}}
            />
            <View style={styles.inputContainer}>
                <Input placeholder='Email' keyboardType='email-address' value={email} onChangeText={text => setEmail(text)}/>
                <Input placeholder="Password" secureTextEntry value={password} onChangeText={text => setPassword(text)}/>
            </View>
            <Button containerStyle={styles.button} title='Login' onPress={signIn}/>
            <Button containerStyle={styles.button} type="outline" title='Register' onPress={() => navigation.navigate('Register')}/>
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10,
    }
})