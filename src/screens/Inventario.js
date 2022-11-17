import React, {useEffect, useRef, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Pressable,
  Modal,
  Alert,
} from 'react-native';
import {FAB, DataTable, TextInput, Searchbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';
import * as app from './global';
import styles from './InventarioStyle.js';

let token = null;
let userID = null;

export const Inventario = ({navigation}) => {
  const flashMessage = useRef(null);

  const flashMessage2 = useRef(null);

  const [inventario, setinventario] = useState([]);

  const [bienes, setbienes] = useState([]);

  const [inventario_id, set_inventario_id] = useState([]);

  const [empleado_id, set_empleado_id] = useState([]);

  const [empleado, set_empleado] = useState(null);

  const [getshowLoader, setshowLoader] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [modalInventarioVisible, setmodalInventarioVisible] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getdata();
  }, [getdata]);

  const hideLoader = () => {
    setshowLoader(false);
  };

  const LoginOut = React.useCallback(() => {
    AsyncStorage.removeItem('User');
    AsyncStorage.removeItem('User');
    AsyncStorage.removeItem('isSignedIn');
    app.isSignedIn = false;
    navigation.navigate('Login');
  }, [navigation]);

  const getdata = React.useCallback(() => {
    //Almacena encabezados para peticiones (Inventario)
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + token);

    var form = new FormData();
    form.append('id_usuario', userID);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: form,
      redirect: 'follow',
    };

    fetch(app.URL_inventario, requestOptions)
      .then(res => res.json())
      .then(result => {
        setRefreshing(false);
        if (result.inventario) {
          setinventario(result.inventario);
          hideLoader();
        } else {
          showMessage({
            message: result.messages[0].message,
            type: 'danger',
            duration: 999,
          });
          if (result.code === 'token_not_valid') {
            setTimeout(() => {
              LoginOut();
            }, 7000);
          }
        }
      })
      .catch(error => {
        console.error(error);
        alert(error.message);
      })
      .done();
  }, [LoginOut]);

  const getbienes = (id_empleado, id_inventario) => {
    setbienes([]);

    //Almacena encabezados para peticiones (Inventario)
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + token);

    var form = new FormData();
    form.append('id_empleado', id_empleado);
    set_inventario_id(id_inventario);
    set_empleado_id(id_empleado);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: form,
      redirect: 'follow',
    };

    fetch(app.URL_bienes, requestOptions)
      .then(res => res.json())
      .then(result => {
        setRefreshing(false);
        if (result.bienes) {
          setbienes(result.bienes);
          hideLoader();
        } else {
          showMessage({
            message: result.messages[0].message,
            type: 'danger',
            duration: 999,
          });
          if (result.code === 'token_not_valid') {
            setTimeout(() => {
              LoginOut();
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

  const getempleado = id_empleado => {
    if (id_empleado.length === 5) {
      setshowLoader(true);

      //Almacena encabezados para peticiones (Inventario)
      var myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + token);

      var form = new FormData();
      form.append('id_empleado', id_empleado);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: form,
        redirect: 'follow',
      };

      fetch(app.URL_get_empleado, requestOptions)
        .then(res => res.json())
        .then(result => {
          setshowLoader(false);
          if (result.empleado) {
            if (result.empleado.length === 0) {
              flashMessage.current.showMessage({
                message: 'El empleado no existe',
                type: 'danger',
                duration: 999,
              });
            }
            set_empleado(result.empleado[0]);
          } else {
            flashMessage.current.showMessage({
              message: result.messages[0].message,
              type: 'danger',
              duration: 999,
            });
            if (result.code === 'token_not_valid') {
              setTimeout(() => {
                LoginOut();
              }, 7000);
            }
          }
        })
        .catch(error => {
          console.error(error);
          alert(error.message);
        })
        .done();
    } else {
      flashMessage.current.showMessage({
        message: 'El numero de empleado debe contener 5 caracteres',
        type: 'danger',
        duration: 999,
      });
    }
  };

  const set_finalize_inventario = () => {
    return Alert.alert(
      'Control de bienes',
      '¿Esta segur@ de finalizar el inventario?',
      [
        {
          text: 'Si',
          onPress: () => {
            //Almacena encabezados para peticiones (Inventario)
            var myHeaders = new Headers();
            myHeaders.append('Authorization', 'Bearer ' + token);
            var form = new FormData();
            form.append('id_inventario', inventario_id);

            let requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: form,
              redirect: 'follow',
            };

            fetch(app.URL_finalize_inventario, requestOptions)
              .then(res => res.json())
              .then(result => {
                setModalVisible(!modalVisible);
                onRefresh();
                if (result.success) {
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
          },
        },
        {
          text: 'No',
        },
      ],
    );
  };

  const show_modal_empleado = () => {
    set_empleado(null);
    setmodalInventarioVisible(!modalInventarioVisible);
  };

  const set_new_inventario = id_empleado => {
    return Alert.alert(
      'Control de bienes',
      '¿Esta segur@ de iniciar inventario?',
      [
        {
          text: 'Si',
          onPress: () => {
            var form = new FormData();
            //Almacena encabezados para peticiones (Inventario)
            var myHeaders = new Headers();
            myHeaders.append('Authorization', 'Bearer ' + token);
            form.append('id_empleado', id_empleado);

            let requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: form,
              redirect: 'follow',
            };

            fetch(app.URL_set_inventario, requestOptions)
              .then(res => res.json())
              .then(result => {
                setmodalInventarioVisible(!modalInventarioVisible);
                onRefresh();
                if (result.success) {
                  if (result.success === 'true') {
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
                  }
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
          },
        },
        {
          text: 'No',
        },
      ],
    );
  };

  const addbien_question = id_bien => {
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
                onPress: () => addbien(id_bien, 1),
              },
              {
                text: 'Regular',
                onPress: () => addbien(id_bien, 2),
              },
              {text: 'Malo', onPress: () => addbien(id_bien, 3)},
              {
                text: 'Salir',
                onPress: () => console.log('Proceso cancelado'),
                style: 'cancel',
              },
            ]);
          },
        },
        {
          text: 'No',
        },
      ],
    );
  };

  const addbien = (id_bien, estado_bien) => {
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
          getbienes(empleado_id, inventario_id);

          flashMessage2.current.showMessage({
            message: result.message,
            type: 'success',
            duration: 999,
          });
        } else {
          flashMessage2.current.showMessage({
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

  useEffect(() => {
    async function checkTokensAndSetNavigation() {
      try {
        token = await AsyncStorage.getItem('Token');
        userID = await AsyncStorage.getItem('useID');
        getdata();
      } catch (error) {
        alert(error);
      }
    }
    checkTokensAndSetNavigation();
  }, [getdata]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0096d6',
      }}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          <Text style={styles.text}>LISTADO DE INVENTARIO ACTIVO</Text>
          {inventario.length > 0 ? (
            inventario.map((inv, key) => (
              <TouchableOpacity
                onLongPress={() => setModalVisible(true)}
                onPressOut={() => getbienes(inv.id_empleado, inv.id_inventario)}
                delayLongPress={150}
                key={key}
                style={styles.buttonContainer}>
                <View style={styles.card}>
                  <Icon
                    style={{alignSelf: 'flex-start'}}
                    name={'folder'}
                    size={30}
                    color={'rgba(0,0,0,0.71)'}
                  />
                  <Text style={styles.cardText}>
                    {inv.id_empleado} - {inv.nombre}
                  </Text>
                  <Text style={styles.cardText}>{inv.cargo}</Text>
                  <Text style={styles.cardText}>{inv.area}</Text>
                  <Text style={styles.cardText}>{inv.fecha}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{paddingTop: '80%'}}>No posee inventarios</Text>
          )}
        </View>
      </ScrollView>
      <View style={styles.Indicator}>
        <ActivityIndicator
          animating={getshowLoader}
          size="large"
          color="#83bbf3"
        />
      </View>
      <FAB
        style={styles.fab}
        small
        icon="plus"
        label="Nuevo inventario"
        onPress={() => show_modal_empleado()}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalView}>
          <FlashMessage ref={flashMessage2} position="top" />
          {bienes.length > 0 ? (
            <View>
              <Text style={styles.textlist}>LISTADO DE BIENES</Text>
              <ScrollView style={{height: '80%'}}>
                <View style={styles.containerdata}>
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title style={{width: '4%'}}>
                        N.º
                      </DataTable.Title>
                      <DataTable.Title>Codigo</DataTable.Title>
                      <DataTable.Title>Descripcion</DataTable.Title>
                      <DataTable.Title style={{width: '4%'}}>
                        Estado
                      </DataTable.Title>
                    </DataTable.Header>
                    {bienes.map((bien, key) => (
                      <DataTable.Row
                        key={key}
                        onPress={() =>
                          bien.estado !== 1 && addbien_question(bien.id_bien)
                        }>
                        <DataTable.Cell style={styles.cell_center}>
                          {bien.no}
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.cell}>
                          {bien.id_bien}
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.cell}>
                          {bien.descripcion}
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={
                            (styles.cell_center,
                            {
                              width: '4%',
                              backgroundColor:
                                bien.estado === 1
                                  ? 'rgba(18,208,80,0.8)'
                                  : 'rgba(238,21,27,0.74)',
                            })
                          }>
                          {bien.estado_inv}
                        </DataTable.Cell>
                      </DataTable.Row>
                    ))}
                  </DataTable>
                </View>
              </ScrollView>
              <Pressable
                style={[styles.button, styles.buttonsend]}
                onPress={() => set_finalize_inventario()}>
                <Text style={styles.textStyle}> Finalizar </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}> OK </Text>
              </Pressable>
            </View>
          ) : (
            <ActivityIndicator
              style={{paddingTop: 50}}
              size="large"
              color="#0096d6"
            />
          )}
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalInventarioVisible}
        onRequestClose={() => {
          setmodalInventarioVisible(!modalInventarioVisible);
        }}>
        <View style={{...styles.modalView, ...styles.modalIventario}}>
          <View>
            <Text style={styles.textlist}>INICIAR INVENTARIO</Text>
            <ScrollView style={{height: '100%'}}>
              <ActivityIndicator
                animating={getshowLoader}
                size="large"
                color="#0096d6"
              />
              <Searchbar
                maxLength={5}
                keyboardType="numeric"
                round="true"
                onIconPress={text => getempleado(text.nativeEvent.text)}
                onEndEditing={text => getempleado(text.nativeEvent.text)}
                style={styles.searchbar}
                placeholder="N.º Empleado"
              />
              {empleado && (
                <View>
                  <TextInput
                    editable={false}
                    selectTextOnFocus={false}
                    style={styles.input}
                    label="Nombre Completo"
                    value={empleado.nombre}
                  />
                  <TextInput
                    editable={false}
                    selectTextOnFocus={false}
                    style={styles.input}
                    label="Cargo"
                    value={empleado.cargo}
                  />
                  <TextInput
                    editable={false}
                    selectTextOnFocus={false}
                    style={styles.input}
                    label="Area"
                    value={empleado.area}
                  />
                  <Pressable
                    onPress={() => set_new_inventario(empleado.id_empleado)}
                    style={[styles.button, styles.buttonAnadir]}>
                    <Text style={styles.textStyle}> Iniciar </Text>
                  </Pressable>
                </View>
              )}
            </ScrollView>
          </View>
          <FlashMessage ref={flashMessage} position="top" />
        </View>
      </Modal>
    </View>
  );
};
