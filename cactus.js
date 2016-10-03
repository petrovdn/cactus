import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Scene,
  Reducer,
  Router,
  Switch,
  Modal,
  Actions,
  ActionConst,
} from 'react-native-router-flux';

import RegBox from './components/RegBox/RegBox';
import TaskBox from './components/TaskBox/TaskBox';




import listTask from './components/TaskBox/listTask';
import editTask from './components/TaskBox/editTask';

import setting from './components/setting';



class cactus extends Component {
  	constructor(props){
		super(props);
		this.state={
			token:null,
			show:'TaskBox',
		}
	}

  render() {
    return (
      <Router>
        <Scene key="root"
                component={Switch}
                tabs={true}
                unmountScenes
                initial
                selector = {() => this.state.show}>
            <Scene key="RegBox" component={RegBox} token={this._setToken.bind(this)} goToTaskBox={this._goToTaskBox.bind(this)} hideNavBar={true}/>

            <Scene key="TaskBox" component={TaskBox} token={this._setToken.bind(this)} goToTaskBox={this._goToTaskBox.bind(this)} hideNavBar={true} />
        </Scene>
      </Router>
      //  <Scene key="RegistrationForm" component={RegistrationForm} title="RegistrationForm" token={this._setToken.bind(this)} goToTaskBox={this._goToTaskBox.bind(this)} hideNavBar={true} />
      // <Scene key="login" component={login} title="Вход в систему" setToken={this._setToken.bind(this)} loggedIn={this.props.goToTaskBox}  hideNavBar={false}/>
      // <Scene key="fogetPass" component={fogetPass} title="Восстановление пароля" hideNavBar={false}/>
      // <Scene key="register" component={register} title="Регистрация"  hideNavBar={false}/>
      // </Scene>
        // </Scene>
                //
        //           <Scene key="listTask" component={listTask} title="Список заявок"   hideNavBar={false}
        //             navigationBarStyle={styles.navBar}
        //             leftButtonImage = {require('./Resources/menu_burger.png')}
        //             backButtonImage = {require('./Resources/menu_burger.png')}
        //             //leftButtonImage = {require('./Resources/cactus.png')}
        //             onBack={()=>Actions.setting({data: '', title:'Настройка' })}
        //             onLeft={()=>Actions.setting({data: '', title:'Настройка' })}ß/>
        //           <Scene key="editTask" component={editTask} title="Редактирование задачи" hideNavBar={false}/>
        //     </Scene>
        //     <Scene key="setting" component={setting} title="Launch" hideNavBar={false} />
      //  </Scene>

      //</Router>
    );
  }
  _setToken(token){
		this.setState({token:token})
		console.log(this.state.token);
	}

  _goToTaskBox(){
		this.setState({show:'TaskBox'})
    Actions.refresh();
	}


}
//Задаем таблицу стилей всего приложения
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
  navBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    height: 60
  }
});
export default cactus;
