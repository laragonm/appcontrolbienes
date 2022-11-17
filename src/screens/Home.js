import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Alert, Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Inventario} from './Inventario';

const Tab = createBottomTabNavigator();

const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case 'Inventario':
      iconName = 'home';
      break;
    case 'Escaner':
      iconName = 'camera';
      break;
    default:
      break;
  }

  return <Icon name={iconName} color={color} size={24} />;
};

export const Inicio = ({navigation}) => {
  const showConfirmDialog = () => {
    return Alert.alert('Control de bienes', '¿Esta segur@ de cerrar sesión?', [
      {
        text: 'Si',
        onPress: () => {
          /** Elimina valores de variables*/
          AsyncStorage.removeItem('User');
          AsyncStorage.removeItem('Token');
          AsyncStorage.removeItem('isSignedIn');
          clearAsyncStorage();
          setTimeout(() => {
            navigation.navigate('Login');
          }, 400);
        },
      },
      {
        text: 'No',
      },
    ]);
  };

  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };

  //Almacena varible de session
  const [getUser, setUser] = useState('');

  useEffect(() => {
    readData();
  }, []);

  // Recupera varibles de session (Usuario)
  const readData = async () => {
    try {
      let User = await AsyncStorage.getItem('User');
      setUser(User);
    } catch (e) {
      alert('No se pudieron recuperar los datos del almacenamiento', e);
    }
  };
  return (
    <Tab.Navigator
      initialRouteName="Inventario"
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => screenOptions(route, color),
        title: '',
        headerRight: () => (
          <Text
            style={{fontSize: 15, color: '#090909'}}
            onPress={() => showConfirmDialog()}>
            <Icon
              name={'account'}
              style={styles.Icon}
              size={20}
              onPress={() => showConfirmDialog()}
            />{' '}
            {getUser} {'    '}
            <Icon
              style={styles.Icon}
              name={'logout'}
              size={20}
              onPress={() => showConfirmDialog()}
            />
          </Text>
        ),
        headerStyle: {
          height: 40,
        },
      })}>
      <Tab.Screen name="Inventario" component={Inventario} />
      <Tab.Screen
        name="Escaner"
        component={View}
        options={{
          tabBarButton: props => (
            <TouchableOpacity
              {...props}
              onPress={() => navigation.navigate('Scanner')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  Icon: {
    marginRight: 10,
    color: '#000000',
  },
});
