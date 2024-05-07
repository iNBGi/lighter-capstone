// Import React and necessary components
import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import { loginStyle } from './login.style'; // Import the login style

// Create Registerscreen component
export const Registerscreen = ({ navigation }) => {
  // State variables for form fields
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

  // Return the JSX for the Registerscreen component
  return (
    <SafeAreaView style={loginStyle.container}>
      <View style={loginStyle.content}>
        <Card style={loginStyle.card}>
          <Card.Title title="Register" titleStyle={loginStyle.cardTitle} />
          <Card.Content>
            {/* Reuse the TextInput and Button components with consistent styling */}
            <TextInput
              label="Firstname"
              value={firstname}
              onChangeText={(text) => setFirstname(text)}
            />
            <TextInput
              label="Lastname"
              value={lastname}
              onChangeText={(text) => setLastname(text)}
            />
            <TextInput
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
            <Button uppercase={false} style={loginStyle.forgotButton}>
              Forgot email/password
            </Button>
            <Button
              mode="contained"
              style={loginStyle.loginButton}
              onPress={handleSubmit}
            >
              Register
            </Button>
            <Button
              style={loginStyle.registerButton}
              onPress={() => navigation.navigate('Login')}
            >
              Login
            </Button>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
};