import React, { Component } from 'react';
import Icon from  'react-native-vector-icons/FontAwesome';

/*
  CheckBox hat zwei Zustände:
  - leer
  - ausgewählt
*/

class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }

  render() {
    // https://oblador.github.io/react-native-vector-icons/
    let iconName = this.state.data.completed ? 'check-square-o' : 'square-o';
    let color = this.props.color || '#000';

    return (
      <Icon.Button
        data={this.state.data}
        name={iconName}
        backgroundColor='rgba(0,0,0,0)'
        color={color}
        underlayColor='rgba(0,0,0,0)'
        size={25}
        iconStyle={{marginLeft: -5, marginRight: 0}}
        activeOpacity={1}
        borderRadius={5}
        onPress={this.props.onCheckBoxPressed}
      >
      </Icon.Button>
    );
  }
}

module.exports = CheckBox;
