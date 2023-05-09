import {View, Text, Button} from 'react-native'

function Account( { route, navigation } ) {
  const {setUserToken} = route.params

  function delete_token() {
    setUserToken(null)
  }
    return (
      <View>
        <Text>
          Account
        </Text>
        <Button
          title='logout'
          onPress={delete_token}
        />
      </View>
    )
  }

export default Account