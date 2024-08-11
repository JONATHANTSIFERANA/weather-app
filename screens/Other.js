
import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { TextIcon } from '../constants/text';
import { Icon } from '../constants/icon';
const style = StyleSheet.create({
    main: {
        flexDirection: 'column',
        child: {
            padding: 20,
            marginBottom: 15,
            marginHorizontal: 15,
            flexDirection: 'row',
            backgroundColor: 'rgba(255,255,255, 0.2)',
            borderRadius: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',

        },
    },
});

const Other = ({ dayHourly }) => {
    return (
        <View style={style.main}>
            {
                !dayHourly ? "" :
                    dayHourly.map((hourData, index) => {
                        let hour = hourData?.time.split(' ')[1]
                        let text = hourData?.condition?.text.split(' ')[0]
                        return (
                            <View style={style.main.child} key={index}>
                                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>{hour}</Text>
                                <Text style={{ color: 'white' }}>{hourData?.temp_c}</Text>
                                <Text>{TextIcon[text] || TextIcon[hourData?.condition?.text]}</Text>
                                <Image
                                    source={Icon[text] || Icon[hourData?.condition?.text] || { uri: 'https://' + hourData?.condition?.icon }}
                                    style={{
                                        width: 30,
                                        height: 30
                                    }}
                                />
                            </View>
                        )
                    }
                    )
            }
        </View>
    );
};

export default Other;
