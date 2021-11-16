import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createStructuredSelector} from 'reselect';

import {selectData, selectLoader, selectStatus} from '../store/selectors';
import {requestData, setData, setStatus, setSelectedItem} from '../store/actions';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Swipeable} from 'react-native-gesture-handler';
import ActionButton from 'react-native-action-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dialog } from 'react-native-simple-dialogs';
import Header from '../components/Header'

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: false,
    };
    // JSON.parse(JSON.stringify(this.props.data)).forEach(item => {this[`swipeRef${item.id}`] = React.createRef()})
  }

  static getDerivedStateFromProps(props) {

    if(props.status == 'requestSuccessful'){
      props.setStatus('');
    } else if (props.status == 'addCharacter'){
      props.setStatus('')
    }
    return null
  }

  componentDidUpdate(prevProps){
    console.log(prevProps.navigation)
    if(prevProps.status == 'requestSuccessful'){
      this.writeLocalStorage();
      this.props.navigation.addListener('focus', () => {
        this.setState({test: !this.state.test})
      });

    } else if (prevProps.status == 'addCharacter') {
      this.props.navigation.addListener('focus', () => {
        this.setState({test: !this.state.test})
      });
    }
  }

  componentDidMount() {
    this.readLocalStorage()
  }

  writeLocalStorage = async () => {
    await AsyncStorage.setItem( "jsonData", JSON.stringify(this.props.data))
  }

  readLocalStorage = async () => {
    let localData = await AsyncStorage.getItem("jsonData")

    if(localData == null || localData == "[]"){
      this.props.requestData()
    } else {
      this.props.setData(JSON.parse(localData))
    }
  }

  deleteItem = async (id) => {
    let myArr = [...(JSON.parse(JSON.stringify(this.props.data)))];
    let index = myArr.findIndex(v => {
      return v.id == id;
    })
    if (index !== -1) myArr.splice(index, 1);
    await this.props.setData(JSON.parse(JSON.stringify(myArr)))
    this.writeLocalStorage();
  }

  leftAction(job) {
    return(
      <View style= {styles.swipeLeftBackground}>
          <Text style={styles.swipeLeftText}>{job}</Text>
      </View>
    )
  }

  rightAction() {
    return(
      <View style= {styles.swipeRightBackground}>
          <Text style={styles.swipeRightText}>Delete</Text>
      </View>
    )
  }

  renderItem(item) {
    return (
      <Swipeable
      key={item.id}
      ref={this[`swipeRef${item.id}`]}
      renderLeftActions={() => this.leftAction(item.job)}
      onSwipeableLeftOpen={() => {
        // this[`swipeRef${item.id}`].current.close();
      }}
      renderRightActions={this.rightAction}
      onSwipeableRightOpen={() => {
        // this[`swipeRef${item.id}`].current.close();
        this.deleteItem(item.id)
      }}
      >
        <View key={item.id}>
          <TouchableHighlight
            onPress={() => {
              this.props.setSelectedItem(item);
              this.props.navigation.navigate('DetailScreen');
            }}>
            <View style={styles.renderItemMainContainer}>
              <Image
                resizeMode="contain"
                style={styles.renderItemImage}
                source={{
                  uri: item.avatar,
                }}
              />
              <View style={{width: '80%'}}>
                <Text style={styles.renderItemText}>{item.name}</Text>
              </View>

              <TouchableOpacity
                style={{
                  width: '10%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}
                onPress={() => this.deleteItem(item.id)}>
                <View style={styles.renderItemIcon}>
                  <FontAwesomeIcon icon={faTrashAlt} size={20} color="grey" />
                </View>
              </TouchableOpacity>
            </View>
          </TouchableHighlight>
        </View>
      </Swipeable>
    );
  }

  render() {
    return (
      <View style={styles.container}>

        <Header
          title="The Simpsons"
        />

        { this.props.data !== [] && (
            <ScrollView>
            {
              JSON.parse(JSON.stringify(this.props.data)).map(item => this.renderItem(item))
            }
            </ScrollView>
        )}
        <ActionButton
                buttonColor="#2e86de"
                onPress={() => { this.props.navigation.navigate('FormScreen') }}
                position="center"
                elevation={5}
                zIndex={1000}
        />

        <Dialog
          // onTouchOutside={() => this.setState({progressVisibility: false})}
          visible={this.props.loader}>
          <View>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </Dialog>

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
  renderItemMainContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    height: 55,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#EEEEEE',
  },
  renderItemImage: {
    width: '10%',
    height: 45,
  },
  renderItemText: {
    marginLeft: 10,
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  renderItemIcon: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  swipeRightBackground: {
    width: '100%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'red',
  },
  swipeRightText: {
    color: 'white',
    left: 0,
    marginRight: 10,
    fontSize: 25,
  },
  swipeLeftBackground: {
    width: '100%',
    height: 55,
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  swipeLeftText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 25,
  },
});

const mapStateToProps = createStructuredSelector({
  data: selectData(),
  loader: selectLoader(),
  status: selectStatus()
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestData, setData, setStatus, setSelectedItem
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainScreen);
