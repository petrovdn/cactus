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

  _doLogin(){
    this.props.handleScene('login');
  }

  _doRegister(isValid, values, validationResults, postSubmit ){
    if (isValid === true) {
    this.setState({ postSubmit: postSubmit});
    fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: values.login,
        })
    })
      .then (response => response.json())
      .then (json => this._onResponse(json))
      .catch(error => {this.setState({ textStatus: 'Ошибка сети' });
      });
  }
}
    _onResponse(json) {
      this.state.postSubmit();
      if (json.status == 'success') {
        this.setState({ textStatus: json.message  });
           Actions.login({data:"Войти", title:'Войти' });
      }  else if (json.status == 'error') {
        this.setState({ textStatus: json.message });
         setInterval(() => {
           this.setState({ textStatus: '' });
        }, 2000);
      }
    }


    render(){
        return (
          <View style={styles.container}>
            <GiftedForm
              style={styles.form}
              formName='registration' //
              validators={{
                login: {
                  title: 'Логин',
                  validate: [{
                    validator: 'isLength',
                    arguments: [6, 255],
                    },{
                   validator: 'isEmailOrMobile',
                        message: 'Только почта или телефон'
                        }]
                    }
                  }}>
              <Text style={styles.headText}>Регистрация</Text>
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
                clearButtonMode='while-editing'
                image={require('../../Resources/icons/color/user.png')}/>

              <GiftedForm.SeparatorWidget />

              <GiftedForm.SubmitWidget
                title='Зарегистрироваться'
                widgetStyles={{
                        submitButton: {
                            backgroundColor: 'green',
                          margin:10,
                        }
                }}
                onSubmit={this._doRegister.bind(this)}
              />
            <GiftedForm.SeparatorWidget />
            <Text style={styles.Text}>или</Text>
            <Text style={styles.Text}>Войти с помощью</Text>
                <View style={styles.ImagesContaner}>
                    <Image source={require('../../Resources/icons/FB.png')} style={styles.image}/>
                </View>
            <GiftedForm.SeparatorWidget />
                <View style={styles.rowString}>
                     <Text>Уже наш пользователь?     </Text>
                     <Button style={styles.textlogin} onPress={this._doLogin.bind(this)}>Войти</Button>
                 </View>
          </GiftedForm>
          <View style={styles.viewStatus}>
            <Text style={styles.textStatus}>{this.state.textStatus}</Text>
          </View>
        </View>
        );
    }
}

var styles = StyleSheet.create({
  container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "stretch",
        backgroundColor: 'rgb(110, 199, 64)',
  },

  form: {
    flex: 4,
    backgroundColor: '#eee',
    marginTop:120,
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
  textlogin: {
    textAlign: 'right',
    textDecorationLine:'underline',
  },
  image:{
    width: 50,
    height: 50,
    alignItems:'center',
    justifyContent:'center'
  },
  imagesContaner:{
    flexDirection:'row',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding: 20,
  },
  rowString:{
    marginTop:80,
    flexDirection:'row',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding: 20,
  },
  viewStatus: {
    flex: 1,
    marginBottom:50,
    marginLeft:10,
    marginRight:10,
  },
  textStatus: {
    padding: 20,
    textAlign: 'center',
    fontSize: 20,
  },
})
