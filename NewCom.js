import React, { Component, } from 'react'
import {
  AppRegistry,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableHighlight,
  View,
  AsyncStorage,
  Image,
  ActivityIndicatorIOS,
} from 'react-native'
import ImagePicker from 'react-native-image-picker';

var styles = StyleSheet.create({
  container: {
  flex: 1,
    padding: 30,
    marginTop: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
    pageDocuments: {
      
  },
    flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  textInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    fontSize: 14,
    borderWidth: 1,
    borderColor: 'firebrick',
    borderRadius: 8,
    color: 'firebrick',
  },
    buttonText: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: 'rgb(110, 199, 64)',
    borderColor: 'rgb(110, 199, 64)',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});



class NewCom extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor(props) {
    super(props)
    this.state = {}
  }

  onImagePressedPressed() {
var options = {
  title: 'Фото документа...',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
    ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  }
  else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  }
  else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  }
  else {
    // You can display the image using either data...
    const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

    // or a reference to the platform specific asset location
    if (Platform.OS === 'ios') {
      const source = {uri: response.uri.replace('file://', ''), isStatic: true};
    } else {
      const source = {uri: response.uri, isStatic: true};
    }

    this.setState({
      avatarSource: source
    });
  }
});
 }
  
  render() {
    return (
     <View style={styles.container}>
        <View style={styles.flowRight}> 
          <TextInput 
             style={styles.TextInput} />
          <TouchableHighlight style={styles.button}
         underlayColor='lavenderblush' onPress={this.onImagePressedPressed.bind(this)}>
              <Text style={styles.buttonText}>Выбрать картинку</Text>
          </TouchableHighlight>
        </View> 
        </View>
    )
  }
}

export default NewCom