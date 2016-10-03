import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Button from 'react-native-button';
import {
  Scene,
  Reducer,
  Router,
  Switch,
  Modal,
  Actions,
  ActionConst,
} from 'react-native-router-flux';

class welcome extends React.Component {
  constructor(props){
    super(props);
    this.state={
      successMessage:null
    }
  }


_doLogin(){
  this.props.handleScene('login');
}
_doRegister(){
  this.props.handleScene('register');
}


    render(){
        return (
            <View style={styles.container}>
            <Text style={styles.cactus}>cactus</Text>
            <Button
                  containerStyle={[styles.button,styles.white]}
                  style={{fontSize: 16, color: '#6ec740'}}
                  onPress={this._doRegister.bind(this)}>Зарегистрироваться
            </Button>
            <View style={{margin:20}} />
            <Text  style={{color: 'darkgreen', textAlign:'center'}}>Уже есть эккаунт?</Text>
            <View style={{margin:5}} />
            <Button
                  containerStyle={[styles.button,styles.yell]}
                  style={{fontSize: 16, color: 'darkgreen'}}
                  onPress={this._doLogin.bind(this)}>Войти

            </Button>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#6ec740',
    },
    button: {
      margin:15,
      padding:10,
      height:45,
      borderRadius:3,
    },
    white:{
      backgroundColor: 'white',
    },
    yell: {
      backgroundColor: '#f3e91f',
    },
    cactus: {
      textAlign: 'center',
      fontSize: 54,
      padding:100,
      color:'darkgreen',
      fontWeight:'bold',
   },
});

module.exports = welcome;
