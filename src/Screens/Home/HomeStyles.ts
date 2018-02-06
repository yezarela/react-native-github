import { StyleSheet, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    height: '100%',
    backgroundColor: '#FFF',
    paddingHorizontal: 15
  },
  headerStyle: {
    backgroundColor: '#75222a',
    elevation: null
  },
  headerTitleStyle: {
    color: '#FFFFFF',
    alignSelf: 'center'
  }
});
