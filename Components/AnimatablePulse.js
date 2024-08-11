import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function AnimatablePulse() {
    return (
        <View style={styles.container}>
            <Animatable.Text
                style={styles.heart}
                animation="pulse"
                useNativeDriver
                iterationCount='infinite'
                easing="ease-out"
                direction="alternate"
            >
                Hello
            </Animatable.Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    heart: {
        fontSize: 100,
    }
});
