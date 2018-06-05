import React from 'react';
import { StyleSheet, List, Platform, Image, Text, View, ScrollView, FlatList, Button, TextInput } from 'react-native';

import firebase from 'react-native-firebase';
import Items from './Items';
import ListMain from './ListMain'

export default class App extends React.Component {
  constructor() {
    super();
    this.unsubscribe = null;
    this.ref = firebase.firestore().collection('items')
    this.state = {
      // firebase things?
      loading: true
    };
  }
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
    if (this.state.loading) return null
    if (this.state.user) return 'hii logged in'
    return <ListMain/>
  }
}

const styles = StyleSheet.create({

});
