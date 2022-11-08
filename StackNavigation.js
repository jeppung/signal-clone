import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import useAuth from './hooks/useAuth';
import AddChatScreen from './screens/AddChatScreen';
import CameraScreen from './screens/CameraScreen';
import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/HomeScreen';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: {backgroundColor: '#2C6BED'},
  headerTitleStyle: {color: 'white'},
  headerTintColor: 'white',
  headerTitleAlign: 'center'
}


const StackNavigation = () => {

    const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={globalScreenOptions}>
        {
            user ? (
                <>
                    <Stack.Screen name='Home' component={HomeScreen}/>
                    <Stack.Screen name='AddChat' component={AddChatScreen}/>
                    <Stack.Screen name='Chat' component={ChatScreen}/>
                    <Stack.Screen name='Camera' component={CameraScreen} options={{headerShown: false}}/>
                </>
            ) : (
                <>
                    <Stack.Screen name='Login' component={LoginScreen}/>
                    <Stack.Screen name='Register' component={RegisterScreen}/>
                    <Stack.Screen name='Loading' component={LoadingScreen} options={{headerShown: false}}/>
                </>
            )
        }
    </Stack.Navigator>
  )
}

export default StackNavigation