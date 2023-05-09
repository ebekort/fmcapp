import {View, Text, Button, SafeAreaView, FlatList, StyleSheet} from 'react-native'
import { useState, useEffect} from 'react';

function JobView ( { route, navigation } ) {

    const {id, name, description, date, start_time, end_time, streetname, housenumber, postal_code, wage, userRole, userToken} = route.params;

    const [data, setData] = useState()

    function pressButton() {
      //var apiFormatDate = date
      //var result = apiFormatDate.replace(/\//g, '-')

      fetch('http://192.168.2.4:8000/api/job-request/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: userToken
        },
        body: JSON.stringify({
          "id": id
        })
      }).then(response => response.json()).then(
        json => json['Type'] === 'Succes' ? alert("succesfully applied for job") : console.log(json)
      )
    }

    function log_data () {
      console.log(data)
    }

    function fetch_data () {
      fetch('http://192.168.2.4:8000/api/list-job-requests/?job_id='+id, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: userToken
        }
      }).then(response => response.json()).then(
        json => setData(json)
      )
    }

    useEffect (() => {
      fetch_data()
    }, [])

    function delete_request (req_id) {
      fetch('http://192.168.2.4:8000/api/job-requests/'+req_id+'/', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: userToken
        }
      }).then(response => response.json()).then(
        json => json['Type'] === 'Succes' ? alert(json['Message']) : alert('deletion failed')
      ).finally(fetch_data())
    }

    function accept_request (req_id) {
      fetch('http://192.168.2.4:8000/api/job-requests/'+req_id+'/', {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: userToken
        },
        body: JSON.stringify({
          'status': 'accepted'
        })
      }).then(response => response.json()).then(
        json => json["Type"] === "Error" ? alert(json["Message"]) : console.log(json)
      ).then(fetch_data()).catch(error => {
        console.error(error);
      }).finally(fetch_data())
    }

    const Item = ({item}) => (
      <View style={styles.container}>
      <Text style={styles.box}>{item['username']}</Text>
      <Text style={styles.box}>{item['status']}</Text>
      {item['status'] === 'pending' ? (
        <>
        <Button title='Accept' onPress={() => {accept_request(item['id'])}}/>
        <Button title='Decline' color="#ff5c5c" onPress={() => {delete_request(item['id'])}}/>
        </>
      ) : (
        <Button title='Remove' color="#ff5c5c" onPress={() => {delete_request(item['id'])}}/>
      ) 
      }
      
      </View>
    );
    

    return (
      <View>
        <Text>{id}</Text>
        <Text>name: {name}</Text>
        <Text>description: {description}</Text>
        <Text>date: {date}</Text>
        <Text>start time: {start_time}</Text>
        <Text>end time: {end_time}</Text>
        <Text>streetname: {streetname}</Text>
        <Text>housenumber: {housenumber}</Text>
        <Text>postal code: {postal_code}</Text>
        <Text>wage: {wage}</Text>

        {userRole === 'EMPLOYEE' ? (
          <Button
            title="Aanmelden"
            onPress={pressButton}
          />
        ) : (

          <View style={styles.centeredView}>
          <SafeAreaView >
            <FlatList
              data={data}
              renderItem={({item}) => <Item item={item}/>}
              keyExtractor={item => item['id']}
            
          />
          </SafeAreaView>
          </View>
      
        )}
      </View>
    )
  }

const styles = StyleSheet.create({
  centeredView: {
    margin: 15
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  box: {
    width: "20%"
  },
  button: {
    color: "red",
    backgroundColor: "red"
  }
})

export default JobView