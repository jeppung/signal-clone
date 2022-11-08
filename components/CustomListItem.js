import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {ListItem, Avatar} from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const CustomListItem = ({id, chatName, enterChat}) => {

    const navigation = useNavigation();

  return (
    <ListItem key={id} bottomDivider 
        onPress={() => navigation.navigate('Chat', {
            chatName, id
        })}
    >
        <Avatar
            rounded
            source={{uri: 'https://i.pravatar.cc/300'}}
        />
        <ListItem.Content>
            <ListItem.Title style={{fontWeight: '800'}}>
                {chatName}
            </ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                This is chat preview
            </ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem