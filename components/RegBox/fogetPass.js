import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableHighlight,
  View,
  Image,
} from 'react-native'

import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';

export default class extends React.Component {

  _doLogin(){
    this.props.handleScene('login');
  }
  _doRegister(){
    this.props.handleScene('register');
  }
 render(){
        return (
            <View style={styles.container}>
            <View/>
            <View style={styles.form}>
            <GiftedForm
              formName='FogetPass' //
              validators={{
                login: {
                  title: 'Email address',
                  validate: [{
                    validator: 'isLength',
                    arguments: [6, 255],
                    },{
                 validator: 'isEmailOrMobile',
                      message: 'Только E-mail или телефон'
                      }]
                  }
              }}
              >
        <Text style={styles.title}>Восстановление пароля</Text>
        <Text></Text>
        <Text style={styles.title}>Пожалуйста, укажите электронный адрес или номер телефона, который Вы использовали при регистрации. </Text>
        <GiftedForm.SeparatorWidget />
        <GiftedForm.TextInputWidget
          widgetStyles={{
                  rowContainer: {
                    marginLeft:10,
                    marginRight:10,
                  }
          }}
          name='login' // mandatory
          title=''
          placeholder='E-mail / телефон'
          keyboardType='email-address'
          //clearButtonMode='while-editing'
          image={require('../../Resources/icons/color/user.png')}
        />

        <GiftedForm.SeparatorWidget />

        <GiftedForm.SubmitWidget
          title='Восстановить пароль'
          widgetStyles={{
                  submitButton: {
                      backgroundColor: 'green',
                    marginLeft:40,
                    marginRight:40,
                  }
          }}
          onSubmit={(isValid, values, validationResults, postSubmit = null, Navigator = null) => {
            if (isValid === true) {
              // prepare object
            postSubmit();  
            this._doLogin.bind(this);
              /* Implement the request to your server using values variable
              ** then you can do:
              ** postSubmit(); // disable the loader
              ** postSubmit(['An error occurred, please try again']); // disable the loader and display an error message
              ** postSubmit(['Username already taken', 'Email already taken']); // disable the loader and display an error message
              ** GiftedFormManager.reset('signupForm'); // clear the states of the form manually. 'signupForm' is the formName used
              */
            }
          }}
        />
        <Button style={styles.textregister} onPress={this._doRegister.bind(this)}>Регистрация</Button>
        <Button style={styles.textregister} onPress={this._doLogin.bind(this)}>Войти</Button>
    </GiftedForm>
  </View>
</View>
        );
    }
}
var styles = StyleSheet.create({
  container: {
        flex: 1,
        marginTop:60,
         justifyContent: "center",
         alignItems: "stretch",
         backgroundColor: 'rgb(110, 199, 64)',
        padding: 10
  },
  form: {
    backgroundColor: '#eee',
    marginBottom:150,
    },
  title: {
    fontSize: 16,
    textAlign: 'center',
    padding: 0,
  },
});
