import { useState, useEffect  } from "react";
import { Button, View, Text, Image } from 'react-native';
import { ActivityIndicator, FlatList, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './src/components/CustomDrawer';


import axios from 'axios';


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
      <Text>{'\n'}</Text>

      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Notifications Screen</Text>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}




function RegsScreen({ navigation }) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const baseUrl = 'http://localhost/phpBase2022';


  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
     const response = await fetch(`${baseUrl}/api/index.php`);
     const json = await response.json();
     setData(json);
     console.log(json)
   } catch (error) {
     console.error(error);
   } finally {
     setLoading(false);
   }
 }

 // Invoking get method to perform a GET request
const fetchUser = async () => {

  try {
    const url = `${baseUrl}/api/index.php`;
    const response = await axios.get(url);
    // console.log(response.data);
    setData(response.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};



  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>


      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View style={{flexDirection:'row', padding:10 , alignItems:"center"}}>
              <Image source={{uri: `${baseUrl}/${item.image}`}} style={{width: 40, height: 40, borderRadius:100}} />
              <Text>  {item.username}</Text>
            </View>
          )}
        />
      )}

      <Text>Reges Screen</Text>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}



const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (

    <Drawer.Navigator
    drawerContent={props => <CustomDrawer {...props} />}
    screenOptions={{
      // headerShown: false,
      drawerActiveBackgroundColor: '#aa18ea',
      drawerActiveTintColor: '#fff',
      drawerInactiveTintColor: '#333',
      drawerLabelStyle: {
        marginLeft: 0,
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
      },
    }}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen name="Usuários" component={RegsScreen} />
    </Drawer.Navigator>
  );
}


function Profile() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile Screen</Text>
    </View>
  );
}

function Settings() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings Screen</Text>
    </View>
  );
}

function Login({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login Screen</Text>
      <Button
        title="Go to MainDrawer"
        onPress={() => navigation.navigate('MainDrawer')}
      />


    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="MainDrawer"
          component={MainDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
        {/* <Stack.Screen name="Usuários" component={RegsScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

