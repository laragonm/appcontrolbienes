import {StatusBar} from 'react-native';
import {createStyles, maxHeight} from 'react-native-media-queries';

const base = {
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 10,
    backgroundColor: '#003364',
  },
  cardText: {
    fontSize: 12,
    color: '#ffffff',
    marginBottom: 5,
  },
  text: {
    marginTop: 15,
    marginBottom: 10,
    color: '#ffffff',
    fontSize: 16,
  },
  card: {
    width: 350,
    height: 130,
    borderRadius: 10,
    backgroundColor: '#165c92',
    margin: 10,
    padding: 10,
    alignItems: 'flex-end',
  },
  container: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginBottom: 15,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  ///style Modal
  centeredView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  modalIventario: {
    height: '60%',
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    //alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textlist: {
    borderRadius: 20,
    backgroundColor: '#4b4949',
    padding: 2,
    marginBottom: 5,
    color: '#ffffff',
    textAlign: 'center',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    marginTop: 5,
    backgroundColor: '#2196F3',
  },
  buttonAnadir: {
    marginTop: 10,
    backgroundColor: 'rgba(18,208,80,0.8)',
  },
  buttonsend: {
    marginTop: 20,
    backgroundColor: 'rgba(238,21,27,0.74)',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  //table
  containerdata: {
    paddingTop: 10,
    paddingHorizontal: 30,
  },
  cell: {
    fontSize: '1px',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  cell_center: {
    flex: 1,
    fontSize: '1px',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '1%',
  },
  //indicador de carga
  Indicator: {
    position: 'absolute',
    top: '50%',
    right: 0,
    left: 0,
  },
  input: {
    borderRadius: 15,
    marginTop: 15,
  },
  searchbar: {
    borderRadius: 15,
    marginTop: 15,
    marginBottom: 30,
  },
};

const styles = createStyles(
  base,
  maxHeight(500, {
    modalIventario: {
      height: '80%',
      padding: 35,
      width: '80%',
      marginLeft: '10%',
    },
  }),
);

export default styles;
