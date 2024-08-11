import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, ScrollView, StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Meteo from './Meteo';
import Other from './Other';
import Daily from './Daily';
import { debounce } from 'lodash';
import { fetchLocation, fetchMeteo, fetchDay } from '../api/weather';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const style = StyleSheet.create({
    searchBar: {
        margin: 20,
        marginTop: 20,
        zIndex: 50,
    },
    searchBar1: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 20,
    },
    searchBarInput: {
        flex: 1,
        paddingLeft: 20,
        color: 'white',
        fontSize: 17
    },
    searchBarButton: {
        backgroundColor: 'rgba(255,255,255, 0.5)',
        color: 'white',
        borderRadius: 20,
        padding: 10,
        height: 55,
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 60
    },
    searchBarResult: {
        width: 'auto',
        backgroundColor: 'rgba(255,255,255, 0.2)',
        top: 15,
        borderRadius: 20,
    },
    searchBarItems: {
        paddingVertical: 15,
        paddingLeft: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255, 0.5)'
    },
    backgroundImage: {
        flex: 1,
        position: 'absolute',
        height: '100%',
        width: '100%',
    }
});

const Home = ({ route  }) => {
    // const { name } = route.params;
    // useEffect(() => {
    //     console.log(name)
    // }, [])

    const [showSearch, setShowSearch] = React.useState(false);
    const [location, setLocation] = React.useState([]);
    const [region, setRegion] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [weather, setWeather] = React.useState([]);
    const [temp, setTemp] = React.useState('');
    const [text, setText] = React.useState('');
    const [icon, setIcon] = React.useState('');
    const [dayHourly, setDayHourly] = React.useState([]);

    const getText = value => {
        fetchLocation({ nom: value })
            .then((data) => {
                setLocation(data || null);
            })
            .catch((error) => {
                console.log('Erreur : ', error);
            });
    };

    const handleLocation = async (loc) => {
        setRegion(loc.name);
        setCountry(loc.country);
        setLocation([]);
        setShowSearch(false);

        fetchDay({ nom: loc.name })
            .then((data) => {
                setDayHourly(data?.forecast?.forecastday[0].hour);
            })
            .catch((error) => {
                console.log('Erreur : ', error);
            });

        fetchMeteo({ nom: loc.name })
            .then((data1) => {
                setWeather(data1?.forecast?.forecastday);
                setTemp(data1?.current?.temp_c);
                setText(data1?.current?.condition?.text);
                setIcon(data1?.current?.condition?.icon);
            })
            .catch((error) => {
                console.log('Erreur : ', error);
            });
    };

    const handleDebounce = React.useCallback(debounce(getText, 950), []);

    return (
        <ImageBackground
            source={require('../resources/bg.png')}
            style={{ flex: 1, height: '100%', width: '100%' }}
            blurRadius={75}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0, 0.5)' }}
            >
                <StatusBar style='dark' />
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={style.searchBar}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                borderRadius: 20,
                                backgroundColor: showSearch ? 'rgba(0,0,0, 0.4)' : 'transparent',
                            }}>
                            {showSearch ? (
                                <TextInput
                                    placeholder='Rechercher une ville ici'
                                    placeholderTextColor={'lightgrey'}
                                    style={style.searchBarInput}
                                    onChangeText={handleDebounce}
                                />
                            ) : null}
                            <TouchableOpacity
                                style={style.searchBarButton}
                                onPress={() => setShowSearch(!showSearch)}
                            >
                                <MagnifyingGlassIcon style={{ color: 'white',  }} />
                            </TouchableOpacity>
                        </View>
                        {location === null ? (
                            <Text>Vous êtes hors connexion, veuillez activer vos données mobiles ou votre WiFi</Text>
                        ) : (
                            location.length > 0 && showSearch ? (
                                <View style={style.searchBarResult}>
                                    {location.map((val, index) => {
                                        let showBorder = index + 1 !== location.length;
                                        let borderStyle = showBorder ? 'rgba(255,255,255, 0.8)' : 'transparent';
                                        return (
                                            <TouchableOpacity
                                                key={index}
                                                style={{
                                                    paddingVertical: 15,
                                                    paddingLeft: 20,
                                                    borderBottomWidth: 1,
                                                    borderBottomColor: borderStyle,
                                                }}
                                                onPress={() => handleLocation(val)}
                                            >
                                                <Text style={{ color: 'white', fontSize: 16 }}>{val.name}, {val.country}</Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            ) : null
                        )}
                    </View>
                    <Meteo
                        region={region}
                        country={country}
                        temp={temp}
                        text={text}
                        icon={icon}
                    />
                    <Other dayHourly={dayHourly} />
                    <Daily weather={weather} />
                </SafeAreaView>
            </ScrollView>
        </ImageBackground>
    );
};

export default Home;
