import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createStructuredSelector} from 'reselect';

import {selectSelectedItem} from '../store/selectors';
import {handleCounting, sendPrinter, setSeriNo} from '../store/actions';

// import Dialog from 'react-native-dialog';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';


class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          about:
            "Abraham Jebediah ”Abe” Simpson II, commonly known as Grampa Simpson, or simply as Grampa is a major character in The Simpsons and a supporting character in The Simpsons Movie. He is the patriarch of the Simpson family, the father of Homer, Herbert and Abbey Simpson, father-in-law of Marge Simpson, and the paternal grandfather of Bart, Lisa, and Maggie Simpson. He is also the ex-boyfriend of Jacqueline Bouvier, his daughter-in-law's mother (which would have made Marge and Homer brother and sister in-laws)Abraham Jebediah ”Abe” Simpson II, commonly known as Grampa Simpson, or simply as Grampa is a major character in The Simpsons and a supporting character in The Simpsons Movie. He is the patriarch of the Simpson family, the father of Homer, Herbert and Abbey Simpson, father-in-law of Marge Simpson, and the paternal grandfather of Bart, Lisa, and Maggie Simpson. He is also the ex-boyfriend of Jacqueline Bouvier, his daughter-in-law's mother (which would have made Marge and Homer brother and sister in-laws)",
          avatar:
            'https://static.wikia.nocookie.net/simpsons/images/a/a9/Abraham_Simpson.png',
          id: '6',
          job: 'Retired',
          name: 'Abraham Simpson II',
        }
      ]
    };
  }

  componentDidMount() {
    this.setState({data: JSON.parse(JSON.stringify(this.props.selectedItem))})
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
            Details
          </Text>
        </View>

        <ScrollView>
          <View style={styles.scrollViewContainer}>
            {/* JPEG AREA */}
            <View style={styles.imageArea}>
              <Image
                resizeMode="contain"
                style={{width: 250, height: 250}}
                source={{
                  uri: this.state.data.avatar,
                }}
              />
            </View>

            {/* TEXT AREA */}
            <View style={styles.textArea}>
              <Text
                style={styles.textName}>
                {this.state.data.name}
              </Text>

              <Text style={styles.textJob}>
                {this.state.data.job}
              </Text>

              <Text style={styles.textAbout}>
                {this.state.data.about}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
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
  },
  scrollViewContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  },
  imageArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textName: {
    color: 'black',
    marginTop: 15,
    fontSize: 24,
    fontWeight: '400',
  },
  textJob: {
    color: 'grey',
    fontSize: 18,
  },
  textAbout: {
    color: 'grey',
    marginTop: 15,
  },
});

const mapStateToProps = createStructuredSelector({
  selectedItem: selectSelectedItem()
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {

    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailScreen);
