import React from 'react';
import {Dimensions} from 'react-native';
import {createStyles, maxHeight} from 'react-native-media-queries';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
const base = {
  scrollViewStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#2196f3',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '10%',
    paddingLeft: 15,
    paddingTop: 10,
    width: deviceWidth,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 16,
    color: 'white',
  },
  textTitle1: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 16,
    color: 'white',
  },
  cardView: {
    width: deviceWidth - 80,
    height: deviceHeight - 450,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    padding: 25,
    marginLeft: 5,
    marginRight: 5,
    marginTop: '10%',
    backgroundColor: 'white',
  },
  scanCardView: {
    width: deviceWidth - 32,
    height: deviceHeight / 1.8,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 10,
    padding: 25,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: 'white',
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonScan: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#258ce3',
    paddingTop: 5,
    paddingRight: 25,
    paddingBottom: 5,
    paddingLeft: 25,
    marginTop: 20,
    margin: 20,
  },
  buttonAdd: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'rgba(12,119,48,0.8)',
    paddingTop: 5,
    paddingRight: 25,
    paddingBottom: 5,
    paddingLeft: 25,
    marginTop: 5,
    margin: 10,
    backgroundColor: 'rgba(18,208,80,0.8)',
  },
  buttonScan2: {
    marginLeft: deviceWidth / 2 - 50,
    width: 150,
    height: 100,
  },
  descText: {
    padding: 16,
    textAlign: 'center',
    fontSize: 16,
    color: '#0096d6',
  },
  highlight: {
    fontWeight: '700',
  },
  centerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    padding: 32,
    color: 'white',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  bottomContent: {
    width: deviceWidth,
    height: 120,
  },
  buttonTouchable: {
    fontSize: 21,
    backgroundColor: 'white',
    marginTop: 32,
    width: deviceWidth - 62,
    justifyContent: 'flex-start',
    alignItems: 'left',
    height: 44,
  },
  buttonTextStyle: {
    color: 'black',
    fontWeight: 'bold',
  },
  textBond: {
    fontWeight: 'bold',
  },
};

const styles = createStyles(
  base,
  // anula estilos solo si la altura de la pantalla es inferior a 500 (Horizontal)
  maxHeight(500, {
    header: {
      paddingTop: -10,
      height: '25%',
    },
    cardView: {
      width: deviceWidth - 80,
      height: deviceHeight - 550,
      alignSelf: 'center',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderRadius: 10,
      padding: 2,
      marginLeft: 5,
      marginRight: 5,
      marginTop: '-10%',
      backgroundColor: 'white',
    },
    scanCardView: {
      width: deviceWidth - 32,
      height: deviceHeight / 2,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      padding: 25,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10,
      backgroundColor: 'white',
    },
  }),
);

export default styles;
