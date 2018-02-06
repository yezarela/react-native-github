import React from 'react';
import {
  View,
  StatusBar,
  Text,
  FlatList,
  TextInput,
  Button,
  Image,
  ActivityIndicator,
  Picker
} from 'react-native';
import { connect } from 'react-redux';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { State } from '../../Reducers';
import { searchUser } from '../../Actions/UserAction';
import styles from './HomeStyles';

class HomeScreen extends React.Component<any, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Search Github Users',
    headerTintColor: '#FFFFFF',
    headerStyle: styles.headerStyle,
    headerTitleStyle: styles.headerTitleStyle,
    headerLeft: null
  });

  constructor(props) {
    super(props);
    this.state = {
      term: '',
      order: 'desc'
    };
  }

  private searchTerm = new Subject<string>();
  private subscription: Subscription;

  componentDidMount() {
    this.subscription = this.searchTerm
      .debounceTime(1000)
      .distinctUntilChanged()
      .subscribe(r => {
        this.searchUsers();
      });
  }

  onSearchChange(term) {
    this.setState({ term });
    this.searchTerm.next(term);
  }

  searchUsers() {
    const { term, order } = this.state;
    this.props.searchUser({ term, order });
  }

  toggleSort(order) {
    this.setState({ order });
    const { term } = this.state;
    this.props.searchUser({ term, order });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    const user = this.props.user;

    return (
      <View>
        <StatusBar
          barStyle="light-content"
          backgroundColor={'transparent'}
          translucent
        />

        <View style={styles.container}>
          <View style={{ marginBottom: 10 }}>
            <TextInput
              value={this.state.term}
              onChangeText={term => this.onSearchChange(term)}
              style={{ padding: 10 }}
              placeholder="Type your keyword here"
            />
            <Picker
              selectedValue={this.state.order}
              onValueChange={(order, itemIndex) => this.toggleSort(order)}
            >
              <Picker.Item label="Sort ASC" value="asc" />
              <Picker.Item label="Sort DESC" value="desc" />
            </Picker>
          </View>

          {user.error && (
            <View style={{ marginTop: 100 }}>
              <Text>{user.error}</Text>
            </View>
          )}

          {user.loading ? (
            <View style={{ marginTop: 100 }}>
              <ActivityIndicator />
            </View>
          ) : (
            <FlatList
              data={user.data}
              keyExtractor={item => item.id}
              renderItem={item => (
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 5,
                    alignItems: 'center'
                  }}
                >
                  <Image
                    source={{ uri: item.item.avatar_url }}
                    style={{ width: 40, height: 40, resizeMode: 'cover' }}
                  />
                  <Text style={{ marginLeft: 10 }}>{item.item.login}</Text>
                </View>
              )}
            />
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchUser: data => dispatch(searchUser(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
