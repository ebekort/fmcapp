import { View, Text, TextInput, StyleSheet, Button} from 'react-native' 
import * as React from 'react';


function Login( { route, navigation } ) {
  const [userName, setUserName] = React.useState();
  const [userPass, setUserPass] = React.useState();
  const {setUserToken} = route.params


  function fetch_login() {
    fetch('http://192.168.2.4:8000/api-token-auth/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'username': userName,
        'password': userPass
      })
    }).then(response => response.json()).then(json => setUserToken('token ' + json['token']))
      
  }
  
    return (
      <View>
        <Text>Login Screen</Text>
        <Text>Username:</Text>
        <TextInput style={styles.input}
          placeholder="Username"
          placeholderTextColor = "black"
          onChangeText={changedName => setUserName(changedName)}
          autoCapitalize='none'
        />
        <Text>Password:</Text>
        <TextInput style={styles.input}
          placeholder="Password"
          placeholderTextColor = "black"
          onChangeText={changedName => setUserPass(changedName)}
          autoCapitalize='none'
          secureTextEntry={true}
        />
        <Button
          title='Submit'
          onPress={fetch_login}
        />
      </View>
    )
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

    export default Login