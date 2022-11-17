/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 *  se utiliza modulo react-native-media-queries para obligar a react a rendelizar
 *   https://github.com/alpacaaa/react-native-media-queries
 */

import React from 'react';
import {View, Image, ActivityIndicator} from 'react-native';
import {TextInput, Title, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createStyles, maxHeight} from 'react-native-media-queries';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';
import * as app from './global';

/* Componente login */
export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PassInputValue: '',
      UserTextInputValue: '',
      SetShowPass: true,
      showLoader: false,
    };
  }

  getAccess() {
    this.showLoader(); //Activa loader
    fetch(app.URL_login, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.UserTextInputValue,
        password: this.state.PassInputValue,
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        if (responseData.token) {
          AsyncStorage.setItem('Token', responseData.token);
          AsyncStorage.setItem('User', this.state.UserTextInputValue);
          AsyncStorage.setItem('useID', responseData.useID);
          app.token = responseData.token;
          app.usuario = this.state.UserTextInputValue;
          app.userID = responseData.useID;
          AsyncStorage.setItem('isSignedIn', 'true');

          this.Bienvenida();
        } else {
          showMessage({
            message: responseData.detail,
            type: 'danger',
            duration: 999,
          });
          this.hideLoader(); //Oculta loader
        }
      })
      .catch(error => {
        console.error(error);
        alert(error.message);
      })
      .done();
  }

  //Funciones para el manejo de loader
  showLoader = () => {
    this.setState({showLoader: true});
  };

  hideLoader = () => {
    this.setState({showLoader: false});
  };

  Bienvenida = () => {
    showMessage({
      message: 'Credenciales correctas',
      type: 'success',
      duration: 999,
    });
    setTimeout(() => {
      /** Elimina valores de variables*/
      this.setState({PassInputValue: ''});
      this.setState({UserTextInputValue: ''});
      this.props.navigation.navigate('Home'); /** Redirecciona a Home*/
      this.hideLoader(); //Oculta loader
    }, 180);
  };

  loginIn() {
    if (
      this.state.PassInputValue === '' ||
      this.state.UserTextInputValue === ''
    ) {
      showMessage({
        message: 'Favor completar campos',
        type: 'danger',
        duration: 999,
      });
    } else {
      this.getAccess();
    }
  }

  render() {
    return (
      <View
        style={styles.View}
        onLayout={styles.onLayout(() => this.forceUpdate())}>
        <Image
          style={styles.Gobierno}
          source={require('../img/logo_inatec_gobierno.png')}
        />
        <Image style={styles.image} source={require('../img/inatec2016.png')} />
        <Title style={styles.Title}>INICIAR SESIÓN</Title>
        <TextInput
          style={styles.input}
          label="Nombre de Usuario"
          value={this.state.UserTextInputValue}
          onChangeText={text => this.setState({UserTextInputValue: text})}
          left={
            <TextInput.Icon
              name={() => <Icon name={'user'} size={20} color={'#000000'} />}
            />
          }
        />

        <TextInput
          style={styles.input}
          secureTextEntry={this.state.SetShowPass}
          onChangeText={text => this.setState({PassInputValue: text})}
          value={this.state.PassInputValue}
          label="Contraseña"
          left={
            <TextInput.Icon
              name={'eye'}
              onPress={() =>
                this.setState({SetShowPass: !this.state.SetShowPass})
              }
            />
          }
        />
        <Button
          Style="width:50, height: 150"
          mode="contained"
          color="#165c92"
          style={{alignSelf: 'center'}}
          onPress={() => this.loginIn()}>
          Ingresar
        </Button>

        <View style={{position: 'absolute', top: '50%', right: 0, left: 0}}>
          <ActivityIndicator
            animating={this.state.showLoader}
            size="large"
            color="#83bbf3"
          />
        </View>
      </View>
    );
  }
}

// Define styles
const base = {
  Title: {
    padding: 50,
    alignSelf: 'center',
    color: 'white',
  },
  View: {
    height: '100%',
    padding: 20,
    backgroundColor: '#0096d6',
  },
  image: {
    alignSelf: 'center',
    width: 250,
    height: 150,
    resizeMode: 'stretch',
    marginTop: 60,
  },
  input: {
    marginBottom: 30,
    borderRadius: 15,
  },
  Gobierno: {
    display: 'none',
  },
};

const styles = createStyles(
  base,
  // anula estilos solo si la altura de la pantalla es inferior a 500 (Horizontal)
  maxHeight(500, {
    Title: {
      padding: 5,
      marginBottom: 15,
    },
    Gobierno: {
      display: 'flex',
      width: 450,
      height: 130,
      marginTop: 1,
      alignSelf: 'center',
      resizeMode: 'stretch',
    },
    image: {
      display: 'none',
    },
    input: {
      marginBottom: 20,
      height: 50,
    },
  }),
);
