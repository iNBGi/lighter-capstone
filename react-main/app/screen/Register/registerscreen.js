
import React from 'react';
import { Alert, SafeAreaView, View} from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import { loginStyle } from './login.style';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import axios from "axios";

export const Registerscreen = ({navigation}) => {  

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async () => {
        try {
          setLoading(true);
          if (!firstname ||!lastname || !email || !password) {
            Alert.alert('Error','Please Fill All Fields');
            return;
          }
          setLoading(false);
          const { data } = await axios.post("https://serverrrr-3kbl.onrender.com/registering", {
            firstname,
            lastname,
            email,
            password,
          });
          if (data.success === true) {
            // Successful login
            alert(data && data.message);
          navigation.navigate('Login');
          console.log("Register Data==> ", { lastname,firstname, email, password });
          } 

        }
         catch (error) {
          // Handle network errors or other issues
          alert(error.response.data.message);
          setLoading(false);
          console.log(error);
        }

      };
   return (

        <SafeAreaView style={loginStyle.content}> 
        <View>

        <Card style={loginStyle.content}> 
  <Card.Title title="Register" titleStyle={loginStyle.cardTitle} />
  <Card.Content>
    <TextInput
      style={loginStyle.textinput}
      label="Firstname"
      value={firstname}
      theme={{ colors: { text: 'white', primary: 'white' } }}
      onChangeText={(text) => setFirstname(text)}
    />
    <TextInput
      style={loginStyle.textinput}
      label="Lastname"
      value={lastname}
      theme={{ colors: { text: 'white', primary: 'white' } }}
      onChangeText={(text) => setLastname(text)}
    />
    <TextInput
      style={loginStyle.textinput}
      label="Email"
      value={email}
      onChangeText={(text) => setEmail(text)}
      keyboardType="email-address"
      theme={{ colors: { text: 'white', primary: 'white' } }}
    />
    <TextInput
      style={loginStyle.textinput}
      label="Password"
      value={password}
      onChangeText={(text) => setPassword(text)}
      secureTextEntry={true}
      theme={{ colors: { text: 'white', primary: 'white' } }}
    />
    <Button uppercase={false} style={loginStyle.cardButton}>
      Forgot email/password
    </Button>
    <Button style={loginStyle.cardButton} onPress={handleSubmit}>
      Register
    </Button>
    <Button style={loginStyle.cardButton} onPress={() => navigation.navigate('Login')}>
      Login
    </Button>
  </Card.Content>
</Card>

            </View>
        </SafeAreaView>
   );

   }
