import React, {Component, Fragment} from 'react';
import {
  TouchableOpacity,
  Text,
  Linking,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './ScanStyle';
import {showMessage} from 'react-native-flash-message';
import * as app from './global';
import AsyncStorage from '@react-native-community/async-storage';

class Scan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scan: false,
      ScanResult: false,
      result: null,
    };
  }

  onSuccess = e => {
    const check = e.data.substring(0, 4);
    console.log('Scaneando' + check);
    this.setState({
      scan: false,
      ScanResult: true,
    });
    if (check === 'http') {
      Linking.openURL(e.data).catch(err =>
        console.error('A ocurrido un error', err),
      );
    } else {
      this.getbien(e.data);
    }
  };

  LoginOut() {
    AsyncStorage.removeItem('User');
    AsyncStorage.removeItem('User');
    AsyncStorage.removeItem('isSignedIn');
    app.isSignedIn = false;
    this.props.navigation.navigate('Login');
  }

  getbien = id_bien => {
    this.setState({
      result: false,
      ScanResult: true,
    });

    AsyncStorage.getItem('Token')
      .then(value => {
        app.token = value;
      })
      .done();
    //Almacena encabezados para peticiones (bien)
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + app.token);

    var form = new FormData();
    form.append('id_bien', id_bien);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: form,
      redirect: 'follow',
    };

    fetch(app.URL_bien, requestOptions)
      .then(res => res.json())
      .then(result => {
        if (result.bien) {
          this.setState({
            result: result.bien,
            scan: false,
            ScanResult: true,
          });
        } else {
          showMessage({
            message: result.messages[0].message,
            type: 'danger',
            duration: 999,
          });
          if (result.code === 'token_not_valid') {
            setTimeout(() => {
              this.LoginOut();
            }, 7000);
          }
        }
      })
      .catch(error => {
        console.error(error);
        alert(error.message);
      })
      .done();
  };

  addbien_question = id_bien => {
    return Alert.alert(
      'Control de bienes',
      '¿Esta segur@ que desea añadir el bien?',
      [
        {
          text: 'Si',
          onPress: () => {
            Alert.alert('Control de bienes', '¿Cual es el estado del bien?', [
              {
                text: 'Bueno',
                onPress: () => this.addbien(id_bien, 1),
              },
              {
                text: 'Regular',
                onPress: () => this.addbien(id_bien, 2),
              },
              {text: 'Malo', onPress: () => this.addbien(id_bien, 3)},
            ]);
          },
        },
        {
          text: 'No',
        },
      ],
    );
  };

  addbien = (id_bien, estado_bien) => {
    this.setState({
      result: false,
      ScanResult: true,
    });

    AsyncStorage.getItem('Token')
      .then(value => {
        app.token = value;
      })
      .done();
    //Almacena encabezados para peticiones (bien)
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + app.token);

    var form = new FormData();
    form.append('id_bien', id_bien);
    form.append('estado_bien', estado_bien);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: form,
      redirect: 'follow',
    };

    fetch(app.URL_add_bien, requestOptions)
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          this.setState({
            scan: false,
            ScanResult: false,
          });
          showMessage({
            message: result.message,
            type: 'success',
            duration: 999,
          });
        } else {
          showMessage({
            message: result.message,
            type: 'danger',
            duration: 999,
          });
          if (result.code === 'token_not_valid') {
            setTimeout(() => {
              this.LoginOut();
            }, 7000);
          }
        }
      })
      .catch(error => {
        console.error(error);
        alert(error.message);
      })
      .done();
  };

  activeQR = () => {
    this.setState({scan: true});
  };

  scanAgain = () => {
    this.setState({scan: true, ScanResult: false});
  };

  render() {
    const {scan, ScanResult, result} = this.state;
    return (
      <View
        style={styles.scrollViewStyle}
        onLayout={styles.onLayout(() => this.forceUpdate())}>
        <Fragment>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={
                () =>
                  this.props.navigation.navigate(
                    'Home',
                  ) /** Redirecciona a Home*/
              }>
              <Image
                source={require('../img/back.png')}
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
            <Text style={styles.textTitle}>Volver a inventario</Text>
          </View>
          {!scan && !ScanResult && (
            <View style={styles.cardView}>
              <Text numberOfLines={8} style={styles.descText}>
                Buscar bien por {'\n'} Código QR
              </Text>
              <Image
                source={require('../img/qr-code.png')}
                style={{margin: 10}}
              />
              <TouchableOpacity
                onPress={this.activeQR}
                style={styles.buttonScan}>
                <View style={styles.buttonWrapper}>
                  <Image
                    source={require('../img/camera.png')}
                    style={{height: 36, width: 36}}
                  />
                  <Text style={{...styles.buttonTextStyle, color: '#0096d6'}}>
                    {} Escanear código QR
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          {ScanResult && (
            <Fragment>
              <ScrollView>
                {result ? (
                  result.id_bien ? (
                    <View
                      style={
                        ScanResult ? styles.scanCardView : styles.cardView
                      }>
                      <Text style={styles.textBond}>Codigo</Text>
                      <Text>{result.id_bien}</Text>
                      <Text style={styles.textBond}>Descripción</Text>
                      <Text>{result.descripcion}</Text>
                      <Text style={styles.textBond}>Serie</Text>
                      <Text>{result.serie}</Text>
                      <Text style={styles.textBond}>Modelo</Text>
                      <Text>{result.modelo}</Text>
                      <Text style={styles.textBond}>Fecha Adquisición</Text>
                      <Text>{result.fecha_adq}</Text>
                      <Text style={styles.textBond}>valor</Text>
                      <Text>{result.valor}</Text>
                      <Text style={styles.textBond}>Estado</Text>
                      <Text>{result.estado}</Text>
                      <Text style={styles.textBond}>Asignado</Text>
                      <Text>{result.asignado_a}</Text>
                      <TouchableOpacity
                        onPress={this.scanAgain}
                        style={styles.buttonScan}>
                        <View style={styles.buttonWrapper}>
                          <Image
                            source={require('../img/camera.png')}
                            style={{height: 36, width: 36}}
                          />
                          <Text
                            style={{
                              ...styles.buttonTextStyle,
                              color: '#2196f3',
                            }}>
                            {} Volver a escanear código QR
                          </Text>
                        </View>
                      </TouchableOpacity>
                      {result.existe === 0 && (
                        <View>
                          <TouchableOpacity
                            onPress={() =>
                              this.addbien_question(result.id_bien)
                            }
                            style={styles.buttonAdd}>
                            <View style={styles.buttonWrapper}>
                              <Text
                                style={{
                                  ...styles.buttonTextStyle,
                                  color: 'rgb(255,255,255)',
                                }}>
                                {' '}
                                Añadir bien
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  ) : (
                    <View
                      style={
                        ScanResult ? styles.scanCardView : styles.cardView
                      }>
                      <TouchableOpacity
                        onPress={this.scanAgain}
                        style={styles.buttonScan}>
                        <View style={styles.buttonWrapper}>
                          <Image
                            source={require('../img/camera.png')}
                            style={{height: 36, width: 36}}
                          />
                          <Text
                            style={{
                              ...styles.buttonTextStyle,
                              color: '#2196f3',
                            }}>
                            {} Volver a escanear código QR
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <Text style={{paddingTop: '80%'}}>
                        NO se encontraron resultados
                      </Text>
                    </View>
                  )
                ) : (
                  <ActivityIndicator
                    style={{paddingTop: 400}}
                    size="large"
                    color="#ffffff"
                  />
                )}
              </ScrollView>
            </Fragment>
          )}
          {scan && (
            <QRCodeScanner
              reactivate={true}
              showMarker={true}
              ref={node => {
                this.scanner = node;
              }}
              onRead={this.onSuccess}
              topContent={
                <Text style={styles.centerText}>
                  Por favor Mueva su cámara {'\n'} sobre el código QR
                </Text>
              }
            />
          )}
        </Fragment>
      </View>
    );
  }
}
export default Scan;
