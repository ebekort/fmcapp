import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import DatePicker from 'react-native-modern-datepicker';
import { useState, useEffect, useRef} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, Modal, ScrollView} from 'react-native';
import ViewSlider from 'react-native-view-slider'
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';



function Add( { route, navigation } ) {
    const { userToken } = route.params

    const [showPicker, setShowPicker] = useState(false);
    const [showPickerStart, setShowPickerStart] = useState(false);
    const [showPickerEnd, setShowPickerEnd] = useState(false);
    const [mode, setMode] = useState('date')

    const today = new Date();
    const startDate = getFormatedDate(today.setDate(today.getDate() + 1, 'YYYY/MM/DD'));
    const [date, setDate] = useState(new Date());
    const name = useRef();
    const description = useRef();
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const streetname = useRef();
    const housenumber = useRef();
    const postal_code = useRef();
    const wage = useRef();

    const toggleDatepicker = () => {
      setShowPicker(!showPicker);
    }
    const toggleStartpicker = () => {
      setShowPickerStart(!showPickerStart);
    }
    const toggleEndpicker = () => {
      setShowPickerEnd(!showPickerEnd);
    }

    const onChange = ({ type }, selectedDate) => {
      if (type == "set") {
        toggleDatepicker()
        const currentDate = selectedDate
        setDate(currentDate)
      } else {
        toggleDatepicker()
      }
    }

    const onChangeStart = ({ type }, selectedTime) => {
      if (type == "set") {
        toggleStartpicker()
        const currentDate = selectedTime
        setStartTime(currentDate)
      } else {
        toggleStartpicker()
      }
    }

    const onChangeEnd = ({ type }, selectedTime) => {
      if (type == "set") {
        toggleEndpicker()
        const currentDate = selectedTime
        setEndTime(currentDate)
      } else {
        toggleEndpicker()
      }
    }
  
    function succes() {
      alert('hoi')
      navigation.navigate('Home', { screen: 'Jobs'})
    }

    function pressButton() {
      //var apiFormatDate = date
      //var result = apiFormatDate.replace(/\//g, '-')

      if (wage.current.value === undefined || wage.current.value === '') {
        wage.current.value = 17.50
      }

      fetch('http://192.168.2.4:8000/api/job-create/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: userToken
        },
        body: JSON.stringify({
          'name': name.current.value,
          'description': description.current.value,
          'date': JSON.stringify(date).slice(1,11),
          'start_time': startTime.toTimeString().slice(0,5),
          'end_time': endTime.toTimeString().slice(0,5),
          'streetname': streetname.current.value,
          'housenumber': housenumber.current.value,
          'postal_code': postal_code.current.value,
          'wage': wage.current.value
        })
      }).then(response => response.json()).then(
        //json => json['Type'] === 'Succes' ? succes() : alert('job post failed')
        json => console.log(json)
      )
    }
    
    return (
      <ScrollView>
      <View>
      <Text>
          name:
        </Text>
        <TextInput style={styles.input}
          placeholder="Name"
          placeholderTextColor = "black"
          ref={name}
          onChangeText={(e) => name.current.value = e}
          />
        <Text>
          Description:
        </Text>
        <TextInput style={styles.input}
          placeholder="Description"
          placeholderTextColor = "black"
          ref={description}
          onChangeText={(e) => description.current.value = e}
          />
        <Text>
          Date:
        </Text>
        <Button onPress={toggleDatepicker}
          title={JSON.stringify(date).slice(1,11)}
        />
        <Text>
          Start time:
        </Text>
        <Button onPress={toggleStartpicker}
          
          title={startTime.toTimeString().slice(0,5)}
        />
        <Text>
          End time:
        </Text>
        <Button onPress={toggleEndpicker}
          title={endTime.toTimeString().slice(0,5)}
        />
        <Text>
          Streetname:
        </Text>
        <TextInput style={styles.input}
          placeholder="blekerstraat"
          placeholderTextColor = "black"
          ref={streetname}
          onChangeText={(e) => streetname.current.value = e}
          />
        <Text>
          Housenumber:
        </Text>
        <TextInput style={styles.input}
          placeholder="11"
          placeholderTextColor = "black"
          ref={housenumber}
          onChangeText={(e) => housenumber.current.value = e}
          />
        <Text>
          Postal code:
        </Text>
        <TextInput style={styles.input}
          placeholder="9718AA"
          placeholderTextColor = "black"
          ref={postal_code}
          onChangeText={(e) => postal_code.current.value = e}
          />
        <Text>
          Wage:
        </Text>
        <TextInput style={styles.input}
          id='wage'
          ref={wage}
          onChangeText={(e) => wage.current.value = e}
          placeholder="17.50"
          placeholderTextColor = "black"
          />
        <Button
        title='send'
        onPress={pressButton}
        />
      </View>

      {showPicker && (
        <DateTimePicker
          mode="date"
          value={date}
          onChange={onChange}
          minimumDate={today}
          />
      )}

      {showPickerStart && (
        <DateTimePicker
          mode="time"
          value={startTime}
          onChange={onChangeStart}
          />
      )}

      {showPickerEnd && (
        <DateTimePicker
          mode="time"
          value={endTime}
          onChange={onChangeEnd}
          />
      )}

      </ScrollView>
    )
}
   
const styles = StyleSheet.create({
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    color: "black",
 },
  });

  export default Add
