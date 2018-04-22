import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, FlatList, Button, TextInput } from 'react-native';

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

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
        <Image source={{uri: 'https://s3.amazonaws.com/cdn.tristro.net/uploads/ideas/post/4548-cartoon-monkey-coloring-page.jpg'}} style={[styles.logo]} />
        <Text style={styles.welcome}>
          Welcome to Carl's Isle Productions{'\n'}This is ListShare, our first installation!
        </Text>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <FlatList
            style={{flex: 1, padding: 12, flexDirection: 'row'}}
            data={this.state.items}
            renderItem={({ item }) => <Items {...item} />}
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
          />
        </View>
          <TextInput
              placeholder={'Add Item'}
              value={this.state.textInput}
              onChangeText={(text) => this.updateTextInput(text)}
          />
          <Button
              title={'Add Item'}
              disabled={!this.state.textInput.length}
              onPress={() => this.addItem()}
          />

        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        {Platform.OS === 'ios' ? (
          <Text style={styles.instructions}>
            Press Cmd+R to reload,{'\n'}
            Cmd+D or shake for dev menu
          </Text>
        ) : (
          <Text style={styles.instructions}>
            Double tap R on your keyboard to reload,{'\n'}
            Cmd+M or shake for dev menu
          </Text>
        )}
        {/* <View style={styles.modules}>
          <Text style={styles.modulesHeader}>The following Firebase modules are enabled:</Text>
          {firebase.admob.nativeModuleExists && <Text style={styles.module}>Admob</Text>}
          {firebase.analytics.nativeModuleExists && <Text style={styles.module}>Analytics</Text>}
          {firebase.auth.nativeModuleExists && <Text style={styles.module}>Authentication</Text>}
          {firebase.crashlytics.nativeModuleExists && <Text style={styles.module}>Crashlytics</Text>}
          {firebase.firestore.nativeModuleExists && <Text style={styles.module}>Cloud Firestore</Text>}
          {firebase.messaging.nativeModuleExists && <Text style={styles.module}>Cloud Messaging</Text>}
          {firebase.links.nativeModuleExists && <Text style={styles.module}>Dynamic Links</Text>}
          {firebase.iid.nativeModuleExists && <Text style={styles.module}>Instance ID</Text>}
          {firebase.notifications.nativeModuleExists && <Text style={styles.module}>Notifications</Text>}
          {firebase.perf.nativeModuleExists && <Text style={styles.module}>Performance Monitoring</Text>}
          {firebase.database.nativeModuleExists && <Text style={styles.module}>Realtime Database</Text>}
          {firebase.config.nativeModuleExists && <Text style={styles.module}>Remote Config</Text>}
          {firebase.storage.nativeModuleExists && <Text style={styles.module}>Storage</Text>}
        </View> */}
        </View>
      </ScrollView>
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
