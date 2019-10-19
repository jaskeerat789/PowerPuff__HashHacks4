import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
export default class Header extends Component {
    render() {
        return (
            <View style={styles.head}>
                <View style={styles.icon}>
                <Icon name="language" color='black' size={30} />
                <Text>English</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    head:{
        width:'100%',
        height:50,
        flexDirection:'row-reverse',
        backgroundColor:'white',
        marginBottom:10,
    },
    icon:{
        margin:10,
        justifyContent:'center',
        alignItems:'center',
    }
})
