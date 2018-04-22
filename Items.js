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
              <View style={{ flex: 1, width: 400, height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                  <View >
                      <Text>{this.props.food}</Text>
                  </View>
                  <View >
                      {this.props.status && (
                          <Text>Got It!</Text>
                      )}
                  </View>
              </View>
          </TouchableHighlight>
        );
    }
}
