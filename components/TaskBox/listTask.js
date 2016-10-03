import React from 'react';
import {
	Alert,
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
//          listViewData:[]
			listViewData: [
              [1097,'Передать данные в Сов.налоговую','В работе','08.09.2016'],
              [1976,'Подготовка сведений в ПФР','Новая','08.09.2016'],
              [234,'ЕНВД за 3 квартал 2016','Создана','08.09.2016'],
              [7,'3-НДФЛ за 2015','В работе','08.09.2016'],
              [4567,'Передача файла в Нижегородскую налоговую','В работе','08.09.2016'],
            ]
		};
	}
	deleteRow(secId, rowId, rowMap) {
		rowMap[`${secId}${rowId}`].closeRow();
		const newData = [...this.state.listViewData];
		newData.splice(rowId, 1);
		this.setState({listViewData: newData});
	}
  
    render(){
      if (this.state.listViewData.length == 0) {
        return (
          <View style={styles.container}>
             <Button style={styles.backTextWhite} onPress={()=>Actions.editTask({data: 'Новая', title:'Новая заявка' })}>Отправь свою первую отчетность</Button>  
          </View>
          )  
      };
        return (
                    
            <View style={styles.container}> 
              <SwipeListView
						dataSource={this.ds.cloneWithRows(this.state.listViewData)}
						renderRow={ data => (			
              <TouchableHighlight onPress={()=>Actions.editTask({data: data, title:'Заявка №'+data[0] })}
								underlayColor={'#AAA'}>
                     <View style={styles.rowFront}>
							<View>
									<Text> № {data[0]} </Text>
                                    <Text> {data[1]}</Text>
                                    <Text> Статус: {data[2]}, Дата создания: {data[3]}</Text>
                              </View>
                     </View>
				</TouchableHighlight>
						)}
  
						renderHiddenRow={ (data, secId, rowId, rowMap) => (
							<View style={styles.rowBack}>
								<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} 
                                   onPress={() => Alert.alert(
                                    'Удалить заявку?',
                                    '',
                                    [
                                        {text: 'Отменить', onPress: () => console.log('Cancel Pressed!')},
                                        {text: 'Удалить', onPress: () => this.deleteRow(secId, rowId, rowMap)},
                                    ]
                                    )}>
									<Text style={styles.backTextWhite}>Удалить</Text>
								</TouchableOpacity>
							</View>
						)}
						leftOpenValue={0}
						rightOpenValue={-100}
					/>
            <Button style={styles.backTextWhite} onPress={()=>Actions.editTask({data: '', title:'Новая заявка' })}>Новая заявка</Button>    
            </View>
        );
    }
}

var styles = StyleSheet.create({
  container: {
        flex: 1,
        marginTop: 60,
        justifyContent: "center",
         alignItems: "stretch",
         backgroundColor: 'rgb(110, 199, 64)',
         padding: 10	
  },
  title: {
    fontSize: 16,
    justifyContent: 'center',
    padding: 10,
  },
  	rowFront: {
	    flexDirection: 'row',
        flex: 1,
        padding: 10,	
		backgroundColor: '#CCC',
		borderBottomColor: 'darkgreen',
		borderBottomWidth: 1,
		height: 70,
    },  
 	rowBack: {
		alignItems: 'stretch',
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
		width: 100
	},
	backRightBtnLeft: {
		backgroundColor: 'blue',
		right: 110
	},
	backRightBtnRight: {
		backgroundColor: 'darkgreen',
		right: 0
	},
  backTextWhite:{
    color:'white',
  }
});
