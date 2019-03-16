import React from 'react';
import { StyleSheet, List, Platform, Image, Text, View, ScrollView, FlatList, Button, TextInput } from 'react-native';

import firebase from 'react-native-firebase';
import Items from './Items';
import ListMain from './ListMain'
import AppRouter from './navigation/AppRouter';

export default class App extends React.Component {
  constructor() {
    super();
    this.unsubscribe = null;
    this.ref = firebase.firestore().collection('items')
    //echo
    // this.state = {
    //   // firebase things?
    //   loading: true
    // };
  }
  state = {
    isLoadingComplete: false,
  };

  onLogin = () => {
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the
        // `onAuthStateChanged` listener we set up in App.js earlier
      })
      .catch((error) => {
        const { code, message } = error;
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      });
  }
  onRegister = () => {
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the
        // `onAuthStateChanged` listener we set up in App.js earlier
      })
      .catch((error) => {
        const { code, message } = error;
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      });
  }

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
      })
    })
  }
  componentWillUnmount() {
    this.authSubscription()
  }

  render() {
    // test echo
    // if (this.state.loading) return null
    // if (this.state.user) return 'hii logged in'
    // return <ListMain/>
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppRouter />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({

});
