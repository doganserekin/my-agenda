import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMousePointer} from '@fortawesome/free-solid-svg-icons';

export default class LoginInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render() {
    return (
      <View>
        <View style={{height: 50, width: '100%', backgroundColor: 'white', alignItems:'center', justifyContent:'center', borderBottomWidth: 2, borderBottomColor: '#EEEEEE'}}>

            <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>{this.props.title}</Text>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 8,
    borderColor: '#9B9B9B',
    borderWidth: 2,
  },
});
