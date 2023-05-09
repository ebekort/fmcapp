import * as React from 'react';
import { useState, useEffect} from 'react';
import { TouchableOpacity, Button, View, Text, TextInput, StyleSheet, Modal, FlatList, SafeAreaView, RefreshControl} from 'react-native';
import JobView from './JobView';


function Jobs( { route, navigation }) {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState([true])
    const {userToken, userRole} = route.params
    const [refreshing, setRefreshing] = React.useState(false);

    const dateArray = []

    function addAndReturn(date) {
      dateArray.push(date)
      return <Text style={styles.modalView}>{date}</Text>
    }
  
  
    const Item = ({item}) => (
      <>
      <TouchableOpacity onPress={() => navigation.navigate('JobView',
      {id: item['id'], name: item['name'], description: item['description'], date: item['date'],
      start_time: item['start_time'], end_time: item['end_time'], streetname: item['streetname'],
      housenumber: item['housenumber'], postal_code: item['postal_code'], wage: item['wage'], userRole, userToken})} style={styles.job}>
        <Text style={styles.jobtext}>{item['name']}</Text>
      </TouchableOpacity>
      
      </>
    );

    function parse_data(data) {
      var dataArray = new Object();
      for (let i = 0; i < data.length; i++) {
        if (!dataArray.includes(data[i]['date'])) {
          dataArray[data[i]['date']] = data[i]
        }
        else {
          dataArray[data[i]['date']].push(data[i])
        }
      }
      console.log(dataArray)
      return(dataArray)
    }
  
    useEffect(() => {
      fetch('http://192.168.2.4:8000/api/jobs/?ordering=date', {
        method: "GET",
        headers: {
          Accept: 'application/json',
        'Content-Type': 'application/json',
          Authorization: userToken
        }
      })
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true)
      fetch('http://192.168.2.4:8000/api/jobs/?ordering=date', {
        method: "GET",
        headers: {
          Accept: 'application/json',
        'Content-Type': 'application/json',
          Authorization: userToken
        }
      })
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
      setRefreshing(false)
    }, []);

    return (
  
      <SafeAreaView>
          <FlatList
            data={data}
            renderItem={({item}) => <Item item={item}/>}
            keyExtractor={item => item['id']}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }
          />
      </SafeAreaView>
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

  export default Jobs