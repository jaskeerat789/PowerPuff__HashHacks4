import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableWithoutFeedback, Dimensions, Animated, Platform } from 'react-native'

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as Battery from 'expo-battery';

const Width = Dimensions.get('window').width
export default class SOSButton extends Component {

    state = {
        location: null,
        errorMessage: null,
        Batterylevel:null,
    }

    componentDidMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
            this._getBatteryLevelAsync();
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
    };
    _getBatteryLevelAsync=async()=>{
        let Batterylevel=await Battery.getBatteryLevelAsync();
        this.setState({Batterylevel},()=>{console.log(this.state.Batterylevel)})

    }

    scaleValue = new Animated.Value(0);
    scale = () => {
        this.scaleValue.setValue(0);
        Animated.timing(
            this.scaleValue,
            {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }
        ).start()

    }

    render() {
        const ButtonScale = this.scaleValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, .9, 1],
        })

        let text = 'Fetching location ..';
        if (this.state.errorMessage) {
            text = this.state.errorMessage;
        } else if (this.state.location) {
            text = " Saved your Location";
            console.log(this.state.location);
        }
        if(this.state.Batterylevel != null)
        {
            text="saved Battery level"
        }
        return (
            <View style={{width:'100%',alignItems:'center'}}>
                <TouchableWithoutFeedback
                    onPress={() => this.scale()}
                >
                    <Animated.View style={[styles.Button, { transform: [{ scale: ButtonScale }] }]}>
                        <Text style={styles.text} > SOS</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20 }} >
                    <Text>
                        Log:{text}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Button: {
        width: Width * .35,
        height: Width * .35,
        borderRadius: Width * .35 / 2,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
    },
    text:
    {
        color: 'white',
        fontSize: 20,
        textAlign: 'left',
        padding: 0,
        marginRight: 2,
    }
})
