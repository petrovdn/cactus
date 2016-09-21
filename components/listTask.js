import React from 'react';
import {
	ListView,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	View
} from 'react-native';
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

export default class extends React.Component {
  
  constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			basic: true,
			listViewData: Array(10).fill('').map((_,i)=>`Заявка №${i}`)
		};
	}

	deleteRow(secId, rowId, rowMap) {
		rowMap[`${secId}${rowId}`].closeRow();
		const newData = [...this.state.listViewData];
		newData.splice(rowId, 1);
		this.setState({listViewData: newData});
	}
  
    render(){
        return (
            <View style={[styles.container, this.props.style]}>
       
             <Text></Text>
            <Text>Список задач: {this.props.data}</Text>
                     <SwipeListView
						dataSource={this.ds.cloneWithRows(this.state.listViewData)}
						renderRow={ data => (
							<TouchableHighlight
								onPress={()=>Actions.editTask({data: data, title:'Редактирование' })}
								style={styles.rowFront}
								underlayColor={'#AAA'}
							>
								<View>
									<Text> Название нашей любимой заявки: {data} </Text>
                                    <Text> Статус заявки: </Text>
                                    <Text> Дата создания: </Text>
								</View>
							</TouchableHighlight>
						)}
						renderHiddenRow={ (data, secId, rowId, rowMap) => (
							<View style={styles.rowBack}>
								<Text>хз</Text>
								<View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
									<Text style={styles.backTextWhite} onPress={()=>Actions.editTask({data: data, title:'Редактирование' })}>Редактировать</Text>
								</View>
								<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(secId, rowId, rowMap) }>
									<Text style={styles.backTextWhite}>Удалить</Text>
								</TouchableOpacity>
							</View>
						)}
						leftOpenValue={75}
						rightOpenValue={-220}
					/>
            
            
            
            
             <Button onPress={()=>Actions.editTask({data: 'Новая', title:'Новая заявка' })}>Новая заявка</Button>    
            <Button onPress={Actions.pop}>Назад</Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
    },
     backTextWhite: {
		color: '#FFF'
	},
	rowFront: {
		alignItems: 'center',
		backgroundColor: '#CCC',
		borderBottomColor: 'black',
		borderBottomWidth: 2,
		justifyContent: 'center',
		height: 50,
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 110
	},
	backRightBtnLeft: {
		backgroundColor: 'blue',
		right: 110
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0
	},
});
