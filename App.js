import React from 'react';
import { StyleSheet, List, Platform, Image, Text, View, ScrollView, FlatList, Button, TextInput } from 'react-native';

import firebase from 'react-native-firebase';
import Items from './Items';

export default class App extends React.Component {
  constructor() {
    super();
    this.unsubscribe = null;
    this.ref = firebase.firestore().collection('items')
    this.state = {
      // firebase things?
      items: [],
      loading: true,
      textInput: ''
    };
  }
  addItem() {
    this.ref.add({
      food: this.state.textInput,
      status: false
    })
    this.setState({textInput: ''})
  }
  updateTextInput(value) {
    this.setState({ textInput: value });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }
  onCollectionUpdate = (querySnapshot) => {
    let items = [];
    querySnapshot.forEach((doc) => {
      const { food, status } = doc.data();
      items.push({
        key: doc.id,
        doc, // DocumentSnapshot
        food,
        status,
      });
  });
  this.setState({
    items,
    loading: false,
 });
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "90%",
          backgroundColor: "#CED0CE",
          marginLeft: "5%"
        }}
      />
    );}

  render() {
    return (
      <View style={{flex: 2, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
        <Text >Started from the Bottom</Text>
      <FlatList style={{width: '100%'}}
            ItemSeparatorComponent={this.renderSeparator
      }
            data={this.state.items}
            renderItem={({ item }) => <Items {...item} />}
          />
      </View>

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
  logo: {
    height: 100,
    marginBottom: 16,
    marginTop: 80,
    width: 100,
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
