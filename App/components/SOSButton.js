import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableWithoutFeedback, Dimensions,Animated,Easing} from 'react-native'
const Width = Dimensions.get('window').width
export default class SOSButton extends Component {
    scaleValue=new Animated.Value(0);
    scale=()=>{
        this.scaleValue.setValue(0);
        Animated.timing(
            this.scaleValue,
            {
                toValue:1,
                duration:200,
                easing:Easing.inOut,
                useNativeDriver:true,
            }
        ).start()
    }
    render() {
        const ButtonScale=this.scaleValue.interpolate({
            inputRange:[0,0.5,1],
            outputRange:[1,.9,1],
        })
    return (
        <TouchableWithoutFeedback
            onPress={() =>this.scale()}
            // onPressIn={() => {this.pressInAnimation();}}
            // onPressOut={() => {this.pressOutAnimation();}}
            
        >
            <Animated.View style={[styles.Button,{transform:[{scale:ButtonScale}]}]}>
                <Text style={styles.text} > SOS</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}
}

// const SCALE = {
//     // this defines the terms of our scaling animation. 
//     getScaleTransformationStyle(animated, startSize = 1, endSize = 0.99) {
//         const interpolation = animated.interpolate({
//             inputRange: [0, 1],
//             outputRange: [startSize, endSize],
//         });
//         return {
//             transform: [
//                 { scale: interpolation },
//             ],
//         };
//     },
//     // This defines animation behavior we expext onPressIn
//     pressInAnimation(animated: Animated.Value, duration: number = 150) {
//         animated.setValue(0);
//         Animated.timing(animated, {
//             toValue: 1,
//             duration,
//             useNativeDriver: true,
//         }).start();
//     },
//     // This defines animatiom behavior we expect onPressOut
//     pressOutAnimation(animated: Animated.Value, duration: number = 150) {
//         animated.setValue(1);
//         Animated.timing(animated, {
//             toValue: 0,
//             duration,
//             useNativeDriver: true,
//         }).start();
//     },
// };

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
