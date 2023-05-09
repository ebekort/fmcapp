import * as React from 'react';
import { useState, useEffect, createContext, useContext} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home'
import JobView from './components/JobView';
import Login from './components/Login';
import Loading from './components/Loading';
import {AsyncStorage} from 'react-native';

const UserToken = createContext()

const Stack = createNativeStackNavigator();

function App() {
  const [userToken, setUserToken] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken == null ? (
          <Stack.Screen
            name="Signin"
            component={Login}
            initialParams={{ setUserToken }}
          />
        ) : 
        (
          
          <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
            initialParams={{ userToken , setUserToken}}
          />
          <Stack.Screen
            name="JobView"
            component={JobView}
          />
          <Stack.Screen
            name="Loading"
            component={Loading}
            options={{headerShown: false}}
          />
          </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
     paddingTop: 23
  },
  job: {
    padding: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height: 200,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 20,
    width:'90%',
    backgroundColor: 'white',
    margin:20,
  },
  jobtext: {
    textAlign: "center",
  },
  jobmodal: {
    backgroundColor: "white"
  },
  input: {
     margin: 15,
     height: 40,
     borderColor: '#7a42f4',
     borderWidth: 1,
     color: "black",
  },
  submitButton: {
     backgroundColor: '#7a42f4',
     padding: 10,
     margin: 15,
     height: 40,
  },
  submitButtonText:{
     color: 'white'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    marginTop: 22,
  },
  modalView: {
    margin:20,
    backgroundColor: 'white',
    borderRadius: 20,
    width:'90%',
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})



export default App;