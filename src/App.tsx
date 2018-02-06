import React from 'react';
import { Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/debounceTime';

import { configureStore } from './Configs/StoreConfig';
import HomeScreen from './Screens/Home/Home';

const AppNavigator = StackNavigator(
  {
    Home: { screen: HomeScreen }
  },
  {
    headerMode: 'screen',
    initialRouteName: 'Home',
    mode: 'card'
  }
);

const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
