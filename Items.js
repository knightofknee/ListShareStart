import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';

export default class Todo extends React.PureComponent {
    // toggle a todo as completed or not via update()
    toggleComplete() {
        this.props.doc.ref.update({
            status: !this.props.status,
        });
    }

    render() {
        return (
          <TouchableHighlight
            onPress={() => this.toggleComplete()}
          >
              <View style={{ flex: 1, paddingLeft: 20, paddingRight: 2, height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{flex: 11}}>
                      <Text>{this.props.food}</Text>
                  </View>
                  <View style={{flex: 4}}>
                      {this.props.status && (
                          <Text>Got It!</Text>
                      )}
                  </View>
              </View>
          </TouchableHighlight>
        );
    }
}
