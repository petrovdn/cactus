import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import Button from 'react-native-button'
import {Actions} from 'react-native-router-flux'

class Launch extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <Text>Первая сл.страница</Text>
                <Button onPress={()=>Actions.listTask({data:"Данные для списка", title:'Список задач' })}>Список задач-></Button>
                <Button onPress={()=>Actions.login({data:"Custom data", title:'Custom title' })}>Go to Login page</Button>
                <Button onPress={Actions.register}>Go to Register page</Button>
                <Button onPress={Actions.register2}>Go to Register page without animation</Button>
                <Button onPress={Actions.error('error message')}>Show error popup</Button>
                <Button onPress={Actions.tabbar}>Go to TabBar page</Button>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    }
});

module.exports = Launch;