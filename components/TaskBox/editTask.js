import React,{Component} from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  View,
  ListView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import ImagePicker from 'react-native-image-crop-picker';

var THUMBS = ['../Resources/helpme.png', 
              '../Resources/caсtus.png',
             '../Resources/menu_burger.png'];

var createThumbRow = (uri, i) => <Thumb key={i} uri={uri} />;
class Thumb extends Component{
render() {
    return (
      <View style={styles.button}>
        <Image style={styles.img} source={{uri:this.props.uri}} />
      </View>
    );
  }
}
var listViewData= [];
export class editTask extends Component {
    constructor(props) {
		super(props);
        this._onAddImages = this._onAddImages.bind(this)
  		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          dataSource: ds.cloneWithRows(listViewData)
        };
		
    }
  _onAddImages(img){
    var newData = listViewData;
    
    img.map(function(im) {
      newData.push(im.path)
    });
    this.setState({dataSource: this.state.dataSource.cloneWithRows(newData)});
      
//	this.setState({dataSource: this.fillRaws(newData)});
    return;
  }        
  _addImages(){
    ImagePicker.openPicker({
      multiple: true
    }).then(images => {
      this._onAddImages(images);
    //const newData = [...this.state.DataSource];
	//	newData.push("Апельсин", "Персик");
	//	this.setState({dataSource: newData});
  });
  }
  render() {

    return (
      <View style={styles.container}> 
        <ListView
          enableEmptySections t
        dataSource={this.state.dataSource}
          
        renderRow={(rowData) => <Image style={styles.img} source={rowData} />}
      />
        <Button style={styles.backTextWhite} onPress={()=>this._addImages()}>Добавить картинки</Button>  
      </View>     
    );
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
        justifyContent: "center",
        alignItems: "stretch",
        backgroundColor: 'rgb(110, 199, 64)',
        padding: 10,	
    },
    title: {
        fontSize: 16,
        textAlign: "center",
        margin: 10,
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
    },
    image: {
        width: 212,
        height: 59
    },
   scrollView: {
    backgroundColor: '#6A85B1',
    height: 300,
  },
  horizontalScrollView: {
    height: 120,
  },
  containerPage: {
    height: 50,
    width: 50,
    backgroundColor: '#527FE4',
    padding: 5,
  },
  text: {
    fontSize: 20,
    color: '#888888',
    left: 80,
    top: 20,
    height: 40,
  },
  button: {
    margin: 7,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    borderRadius: 3,
  },
  buttonContents: {
    flexDirection: 'row',
    width: 64,
    height: 64,
  },
  img: {
    width: 64,
    height: 64,
  }
});
export default editTask;