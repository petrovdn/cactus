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
  constructor(props) {
    super(props);
    this.state = {textStatus: ''};
  }

  _doFogetPass(){
    this.props.handleScene('fogetPass');
  }
  _doRegister(){
    this.props.handleScene('register');
  }

 _onResponse(json) {
  this.state.postSubmit();
   if (json.status =='success'){
      this.props.setToken(json.token);
      this.props.handleScene('TaskBox');;
      console.log('Установка в Login:'+json.token);
     //Actions.listTask({data:"Данные для списка", title:'Список задач' });
   } else {
     alert ('Неправильный логин или пароль');
   }

  }

 _doLogin (isValid, values, validationResults, postSubmit ) {

   if (isValid === true) {

      this.setState({ postSubmit: postSubmit});

     fetch('http://localhost:8080/login', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
      'Content-Type': 'application/json',
     },
     body: JSON.stringify({
     login: values.login,
     password: values.password,
     })
})
.then (response => response.json())
.then (json => this._onResponse(json))
//.catch(error => this.setState({ textStatus: 'Ошибка сети' }))
}
}

  render(){
    return(

    <View style={styles.container}>
            <GiftedForm
              style={styles.form}
              formName='loginForm' //
              validators={{
                password: {
                  title: 'Password',
                  validate: [{
                    validator: 'isLength',
                    arguments: [6, 16],
                    message: 'Длина пароля не менее 6 символов'
                    }]
                  },
                login: {
                  title: 'login',
                  validate: [{
                      validator: 'isLength',
                      arguments: [6, 255],
                    },{
                      validator: 'isEmailOrMobile',
                      message: 'Только почта или телефон'
                      }]
                  }
              }}
              >
        <Text style={styles.headText}>Вход</Text>
        <GiftedForm.SeparatorWidget />
        <GiftedForm.TextInputWidget
          name='login' // mandatory
          title='Логин:'
          placeholder='Почта или телефон'
          keyboardType='email-address'
          clearButtonMode='while-editing'
          image={require('../../Resources/icons/color/email.png')}
        />
        <GiftedForm.TextInputWidget
          name='password' // mandatory
          title='Пароль:'
          placeholder='******'
          clearButtonMode='while-editing'
          secureTextEntry={true}
          image={require('../../Resources/icons/color/lock.png')}
        />
        <GiftedForm.SeparatorWidget />
        <Button style={styles.textFogetpass} onPress={this._doFogetPass.bind(this)}>Забыли пароль?</Button>
        <GiftedForm.SubmitWidget
          title='Войти'
          widgetStyles={{
                    submitButton: {
                      backgroundColor: 'green',
                      margin:40,
                      }
                      }}
          onSubmit={this._doLogin.bind(this)}
        />
<GiftedForm.HiddenWidget name='tos' value={true} />

      <GiftedForm.SeparatorWidget />
      <Text style={styles.Text}>или</Text>
      <Text style={styles.Text}>Войти с помощью</Text>
              <Image source={require('../../Resources/icons/FB.png')} style={styles.image}/>
      <GiftedForm.SeparatorWidget />
      <Button style={styles.textregister} onPress={this._doRegister.bind(this)}>Регистрация</Button>
    </GiftedForm>
</View>
)
}
}
var styles = StyleSheet.create({
  container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "stretch",
        backgroundColor: '#6ec740',
  },

  form: {
    flex: 4,
    backgroundColor: '#eee',
    marginTop:100,
    marginBottom:100,
    marginLeft:10,
    marginRight:10,
    },
  headText: {
    textAlign: 'center',
    fontSize: 16,
    padding:10,
  },
  Text: {
    textAlign: 'center',
    fontSize: 16,
  },
  textFogetpass: {
    textAlign: 'right',
    textDecorationLine:'underline',
    paddingRight:10
  },
  textregister: {
    textAlign: 'center',
    textDecorationLine:'underline',
  },
  image:{
  width: 50,
  height: 50,
  alignItems:'center',
  justifyContent:'center'
  }
})
