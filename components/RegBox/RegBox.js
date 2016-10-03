import React from 'react';

import {
  Scene,
  Reducer,
  Router,
  Switch,
  Modal,
  Actions,
  ActionConst,
} from 'react-native-router-flux';

import login from './login';
import fogetPass from './fogetPass';
import register from './register';
import welcome from './welcome';

export default class extends React.Component {
  constructor(){
  super();
  this.state={
    show:'welcome',
    };
  }

  render(){
    return(
     <Router>
       <Scene key="modal" component={Modal} >
         <Scene key="RegBox"
                 component={Switch}
                 tabs={true}
                 unmountScenes
                 initial
                 selector = {() => this.state.show}>
             <Scene key="welcome" component={welcome} handleScene={this._handleScene.bind(this)} hideNavBar={true} />
             <Scene key="login" component={login} title="Вход в систему" setToken={this._setToken.bind(this)} handleScene={this._handleScene.bind(this)}  hideNavBar={false}/>
             <Scene key="fogetPass" component={fogetPass} title="Восстановление пароля" handleScene={this._handleScene.bind(this)} hideNavBar={false}/>
             <Scene key="register" component={register} title="Регистрация" handleScene={this._handleScene.bind(this)}  hideNavBar={false}/>
         </Scene>
       </Scene>
     </Router>
   );
  }

    _handleScene(show){
    if (show === 'TaskBox') {
      this.props.goToTaskBox();
    } else {
      this.setState({show:show});
      Actions.refresh();
    }
  }
    _setToken(token){
  		this.props.token(token)
  		console.log('Установка в рФорм:'+token)
      }

}
