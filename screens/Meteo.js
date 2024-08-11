import React from 'react'
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
// import * as Animatable from 'react-native-animatable';
import { Icon } from '../constants/icon'
import { TextIcon } from '../constants/text'
import AnimatablePulse from '../Components/AnimatablePulse'
import * as Animatable from 'react-native-animatable';
const style = StyleSheet.create({
    main: {
        marginTop: 15,
        justifyContent: 'space-around',
    },
    text: {
        color: 'rgba(255,255,255, 1.8)',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '500'
    },
    text1: {
        color: 'rgba(255,255,255, 0.8)',
        fontSize: 20,
        fontWeight: '300'
    },
    image: {
        paddingTop: 20,
        paddingBottom : 15,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    degre: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        nbr: {
            color: 'white',
            fontSize: 40,
            fontWeight: '600',
            marginBottom: 4
        },
        txt: {
            color: 'white',
            fontSize: 20,
            fontWeight: '300',
            marginBottom: 15
        }
    }
})

const Meteo = ({ region, country, temp, text, icon }) => {
    // if (!region && !country && !temp && !text && !icon) {
    //     return null
    // }
    return (
        <>
            <View style={style.main} >
                <Text style={style.text}>{region ? region : ""}{region ? "," : ""}
                    <Text style={style.text1}>
                        {' '}{country ? country : ""}
                    </Text>
                </Text>

                { /* Image */}
                <View style={style.image}>
                    <Animatable.View
                        animation="pulse"
                        useNativeDriver
                        iterationCount='infinite'
                        easing="ease-out"
                        direction="alternate"
                    >
                        <Image
                            source={Icon[text] || { uri: "https://" + icon }}
                            style={{
                                height: 150,
                                width: 150
                            }}
                        />
                    </Animatable.View>

                </View>
                {/* <AnimatablePulse/> */}
                <View style={style.degre}>
                    <Text style={style.degre.nbr} > {temp ? temp + " °C" : ""} </Text>
                    <Text style={style.degre.txt} > {text ? TextIcon[text] || text : ""} </Text>
                </View>
            </View>
        </>
    )
}

export default Meteo
