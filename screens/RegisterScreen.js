import { View, KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Button, Input, Text } from '@rneui/themed';
import { Keyboard } from 'react-native';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import useAuth from '../hooks/useAuth';

const RegisterScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const {setUser, setLoadingInitial} = useAuth();

    const navigation = useNavigation();


    const register = async () => {
        createUserWithEmailAndPassword(auth, email, password).then(authUser => {
            updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: imgUrl || 'https://i.pravatar.cc/300'
            }).then(() => console.log('Profile Updated'));
        });
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

            <Text h3 style={{marginBottom: 50}}>
                Create a Signal account
            </Text>

            <View style={styles.inputContainer}>
                <Input placeholder='Full name' autoFocus keyboardType='ascii-capable' value={name} onChangeText={text => setName(text)}/>
                <Input placeholder='Email'  keyboardType='email-address' value={email} onChangeText={text => setEmail(text)}/>
                <Input placeholder='Password'  secureTextEntry value={password} onChangeText={text => setPassword(text)}/>
                <Input placeholder='Profile Picture URL (opsional)'  value={imgUrl} onChangeText={text => setImgUrl(text)}
                    onSubmitEditing={register}
                />
            </View>

            <Button containerStyle={styles.button} raised title='Register' onPress={register}/>
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default RegisterScreen

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
    }
    ,
    button: {
        width: 200,
        marginTop: 10
    }
})