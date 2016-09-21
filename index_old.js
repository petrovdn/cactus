import React, { Component } from 'react';
import { 
  TabViewAnimated, 
  TabViewPage, 
  TabBarTop 
} from 'react-native-tab-view';

import {
  AppRegistry,
  Text,
  StyleSheet,
  View,
  Image
} from 'react-native';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import NewCom from './NewCom'; 


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageCommisions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(234, 244, 233)',
  },
   newCommision: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(249, 247, 233)',
  },
  
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  }
});

export default class cactus extends Component {
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Поручения' },
      { key: '2', title: 'Новое поручение' },
    ],
  };

  _newComission = () => {
    this.setState({ index: 1 });
}
  
  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderHeader = (props) => {
    return <TabBarTop {...props}  />;
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return (
        <View style={styles.pageCommisions} >
          <View style={{flex:1, backgroundColor: 'green'}}>
        {/*Rest of App come ABOVE the action button component!*/}
        <ActionButton buttonColor="rgb(110,199,64)" position = 'center'  >
          <ActionButton.Item buttonColor='#9b59b6' title="Передать файл" onPress={() => this._newComission()}>
            <Icon name="md-camera" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Подготовить отчет" onPress={() => {}}>
            <Icon name="md-star" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="Выдать справку" onPress={() => {}}>
            <Icon name="md-star" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
        </View>);
    case '2':
      return (
        <View style={styles.newCommision}>
          <NewCom />
        </View>
   )      
    default:
      return null;
    }
  };

  _renderPage = (props) => {
    return <TabViewPage {...props} renderScene={this._renderScene} />;
  };

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderPage}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  }
}

AppRegistry.registerComponent('cactus', () => cactus);