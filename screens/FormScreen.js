import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createStructuredSelector} from 'reselect';

import {selectData} from '../store/selectors';
import {setData, setStatus} from '../store/actions';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {InputContainer, InputTitle, CustomInput, BlueBarcode, BarcodeText} from '../commons/styled';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';


class FormScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      job: '',
      about: '',
      avatar: ''
    };
  }

  componentDidMount() {

  }

  addCharacter = async () => {

    // Destructing
    const {about, avatar, job, name} = this.state;

    let myArr = [...(JSON.parse(JSON.stringify(this.props.data)))];
    let item = {
      about: about,
      avatar: avatar,
      id: uuid.v4(),
      job: job,
      name: name
    }

    myArr = [...myArr, item]

    await this.props.setData(JSON.parse(JSON.stringify(myArr)))
    await AsyncStorage.setItem( "jsonData", JSON.stringify(this.props.data))
    this.props.setStatus("addCharacter")
    this.props.navigation.navigate("MainScreen")
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.headerBackButton}
            onPress={() => this.props.navigation.navigate('MainScreen')}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesomeIcon icon={faChevronLeft} size={25} color="#2e86de" />
              <Text style={{color: '#2e86de', fontSize: 15}}>Simpsons</Text>
            </View>
          </TouchableOpacity>
          <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
            Add New Character
          </Text>
        </View>

        <ScrollView>
          <InputContainer>
            <InputTitle>Name Surname:</InputTitle>
            <CustomInput
              value={this.state.name}
              onChangeText={v => this.setState({name: v})}
            />
          </InputContainer>

          <InputContainer>
            <InputTitle>Job Title:</InputTitle>
            <CustomInput
              value={this.state.job}
              onChangeText={v => this.setState({job: v})}
            />
          </InputContainer>

          <InputContainer style={{height: 130}}>
            <InputTitle>About Him/Her:</InputTitle>
            <CustomInput
              onChangeText={v => this.setState({about: v})}
              multiline={true}
              numberOfLines={5}
              style={{height: 100, textAlignVertical: 'top'}}
            />
          </InputContainer>

          <InputContainer>
            <InputTitle>Image Link:</InputTitle>
            <CustomInput
              value={this.state.image}
              onChangeText={v => this.setState({avatar: v})}
            />
          </InputContainer>

          <BlueBarcode
            onPress={() => {
              const {about, avatar, job, name} = this.state;
              if(about == '' || avatar == '' || job == '' || name == ''){
                alert("Please fill in all fields.");
              } else {
                this.addCharacter();
              }
            }}>
            <BarcodeText>Add Character</BarcodeText>
          </BlueBarcode>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f6f6f6',
  },
  headerContainer: {
    height: 50,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#EEEEEE',
  },
  headerBackButton: {
    position: 'absolute',
    justifyContent: 'center',
    left: 0,
    marginLeft: 10,
    height: 35,
    width: 100,
  }
});

const mapStateToProps = createStructuredSelector({
  data: selectData()
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setData, setStatus
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormScreen);
