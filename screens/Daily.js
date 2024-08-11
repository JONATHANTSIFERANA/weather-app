import React from 'react'
import { View, ScrollView, StyleSheet, Text, Image } from 'react-native'
import { TextIcon } from '../constants/text'
import { Icon } from '../constants/icon'
import { Day } from '../constants/day'
const style = StyleSheet.create({
    main: {
        // flexDirection: 'column',
    },
    child: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
        backgroundColor: 'rgba(255,255,255, 0.2)',
        borderRadius: 20,
        padding: 15,
        height: 'auto',
        width: 250,
        justifyContent: 'space-between',
        // alignItems: 'center'
    },
    child_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    sun: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    sun_child: {
        width: 30,
        height: 30
    }
})

const Daily = ({ weather }) => {
    // if (!Array.isArray(weather) || !weather) {
    //     return null;
    // }

    return (
        <ScrollView
            style={style.main}
            horizontal
        >
            {
                weather.map((item, index) => {
                    let date = new Date(item?.date)
                    let options = { weekday : 'long' }
                    let dayname = date.toLocaleDateString('en-US',options)
                    dayname = dayname.split(',')[0]
                    let text = item?.condition?.text.split(' ')[0]
                    return (
                        <View
                            style={style.child}
                            key={index}
                        >
                            <View style={style.child_container}>
                                <View>
                                    <Text style={{
                                        color: 'white',
                                        paddingBottom: 0,
                                        fontSize: 25,
                                        fontWeight: '400',
                                    }}
                                    >
                                        {
                                            Day[dayname]
                                        }
                                    </Text>
                                    <Text
                                        style={{
                                            color: 'white',
                                            paddingBottom: 0,
                                            fontSize: 21,
                                            fontWeight: '600',
                                        }}
                                    >
                                        {item?.day?.avgtemp_c + " °C"}
                                    </Text>
                                    <Text
                                        style={{
                                            color: 'white',
                                            fontSize: 18,
                                            fontWeight: '500',
                                            paddingBottom: 10,
                                        }}
                                    >
                                        {TextIcon[text || item?.day?.condition?.text] || item?.day?.condition?.text}
                                    </Text>
                                    <View style={style.sun}>
                                        <Image
                                            source={require('../resources/sun/sunrise.png')}
                                            style={style.sun_child}
                                        />
                                        <Text style={{ paddingLeft: 15, fontWeight: 'bold', color: 'rgba(255,255,255, 0.8)' }}>{item.astro.sunrise}</Text>
                                    </View>
                                    <View style={style.sun}>
                                        <Image
                                            source={require('../resources/sun/sunset.png')}
                                            style={style.sun_child}
                                        />
                                        <Text style={{ paddingLeft: 15, fontWeight: 'bold', color: 'rgba(255,255,255, 0.8)' }}>{item.astro.sunset}</Text>
                                    </View>
                                </View>
                                <View>
                                    <View>
                                        <Image
                                            source={Icon[text] || Icon[item?.day?.condition?.text] || { uri: 'https://' + item?.day?.condition?.icon }}
                                            style={{
                                                width: 70,
                                                height: 70
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                })
            }
        </ScrollView>
    )
}
export default Daily
