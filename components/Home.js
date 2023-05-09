import  {useState, useEffect } from 'react';
import Agenda from './Agenda';
import Account from './Account';
import Add from './Add';
import Jobs from './Jobs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Loading from './Loading';

import React from "react";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();


function Home ( { route, navigation } ) {
  const { userToken, setUserToken } = route.params
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { fetch('http://192.168.2.4:8000/api/user-role/', {
    method: "GET",
    headers: {
      Accept: 'application/json',
    'Content-Type': 'application/json',
      Authorization: userToken
    }
  }
  
  ).then((response) => response.json())
  .then((json) => setUserRole(json['role']))
  .then(() => setIsLoading(false))
  .catch((error) => console.error(error))
  .finally(() => navigation.navigate('Home'));
    
  }, [userRole])


  return (
    <>
      {isLoading === true ? (
          navigation.navigate('Loading')
      ) : (
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerStyle: {
            backgroundColor: '#553c9a'
          }
        }}
      >
        {userRole === "EMPLOYEE" ? (
          <>
          <Tab.Screen name="Jobs" component={Jobs} initialParams={{ userToken, userRole }}
          options={{
            tabBarIcon: () => (<Ionicons name="list" color="black" size={25}/>)
          }}
          />
          <Tab.Screen name="Agenda" component={Agenda} 
          options={{
            tabBarIcon: () => (<AntDesign name="calendar" size={24} color="black" />)
          }}
          />
          <Tab.Screen name="Account" component={Account} initialParams={{ setUserToken }}
          options={{
            tabBarIcon: () => (<MaterialCommunityIcons name="account" size={24} color="black" />)
          }}
          
          />
          </>
        ): (
          <>
          <Tab.Screen name="Jobs" component={Jobs} initialParams={{ userToken }}
          options={{
            tabBarIcon: () => (<Ionicons name="list" color="black" size={25}/>)
          }}
          />
          <Tab.Screen name="Account" component={Account} initialParams={{ setUserToken }}
          options={{
            tabBarIcon: () => (<MaterialCommunityIcons name="account" size={24} color="black" />)
          }}
          />
          <Tab.Screen name="Add" component={Add} initialParams={{ userToken }} 
          options={{
            tabBarIcon: () => (<Ionicons name="add-circle" size={24} color="black" />)
          }}
          />
          </>

        )}
      </Tab.Navigator>)}
    </>
  );
}

  export default Home