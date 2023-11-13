import React, { useContext, useState } from 'react';
import { Alert, SafeAreaView, View, Image } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import { loginStyle } from './login.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const Loginscreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        Alert.alert('Error', 'Please enter both username and password.');
        return;
      }

      const { data } = await axios.post("https://serverrrr-3kbl.onrender.com/login", { username, password });
      if (data.success === true) {
        // Successful login
        await AsyncStorage.setItem("@auth", JSON.stringify(data));
        alert(data && data.message);
        navigation.navigate('Home');
      }

    } catch (error) {
      // Handle network errors or other issues
      alert(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={loginStyle.content}>
      <View>
        <Image style={{ width: 100, height: 100 }} source={require('./blacklogo.png')} />

        <Card style={loginStyle.card}>
          <Card.Title title="Login" titleStyle={loginStyle.cardTitle} />
          <Card.Content>
            <TextInput
              style={loginStyle.textinput}
              placeholder="Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
            <TextInput
              style={loginStyle.textinput}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <Button
              uppercase={false}
              style={loginStyle.cardButton1}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              Forgot email/password
            </Button>
            <Button
              style={loginStyle.cardButton}
              onPress={handleLogin}
            >
              Login
            </Button>
            <Button
              style={loginStyle.cardButton}
              onPress={() => navigation.navigate('Register')}
            >
              Register
            </Button>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
};
