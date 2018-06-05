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
      loadingLogin: true
    };
  }
  // addItem() {
  //   this.ref.add({
  //     food: this.state.textInput,
  //     status: false
  //   })
  //   this.setState({textInput: ''})
  // }
  // updateTextInput(value) {
  //   this.setState({ textInput: value });
  // }
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
    // this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }
  componentWillUnmount() {
    this.authSubscription()
  }

//   onCollectionUpdate = (querySnapshot) => {
//     let items = [];
//     querySnapshot.forEach((doc) => {
//       const { food, status } = doc.data();
//       items.push({
//         key: doc.id,
//         doc, // DocumentSnapshot
//         food,
//         status,
//       });
//   });
//   this.setState({
//     items,
//     loading: false,
//  });
//   }
  // renderSeparator = () => {
  //   return (
  //     <View
  //       style={{
  //         height: 1,
  //         width: "90%",
  //         backgroundColor: "#CED0CE",
  //         marginLeft: "5%"
  //       }}
  //     />
    // );}

  render() {
    // if (this.state.loadingLogin) return null
    if (this.state.user) return 'hii logged in'
    return <ListMain/>
    return (
      <ListMain/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    // alignItems: 'stretch',
    // paddingLeft: 30
  },
  header: {
    height: 20,
    marginTop: 50,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  }
});
