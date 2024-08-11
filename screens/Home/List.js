import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { initializeDatabase, AppDataSource } from '../../database/database';
import { Region } from '../../database/table/region';

const List = ({ navigation }) => {
    const [region, setRegion] = useState([])
    const [addRegion, setAddRegion] = useState('')

    const getRegions = async () => {
        const regionRepository = AppDataSource.getRepository(Region);
        return await regionRepository.find();
    }

    const loadRegions = async () => {
        const regionRepository = AppDataSource.getRepository(Region);
        const allRegions = await regionRepository.find();
        setRegion(allRegions);
    };

    const handleAddRegion = async (nom) => {
        if (region.length > 0) {
            const regionRepository = AppDataSource.getRepository(addRegion);
            const newRegion = new Region();
            newRegion.name = nom;
            await regionRepository.save(newRegion);
            // setRegion('');
            loadRegions();
        }
    };

    const deleteRegion = async (id) => {
        const regionRepository = AppDataSource.getRepository(Region);
        const region = await regionRepository.findOneBy({ id : id });
        if (region) {
            await regionRepository.remove(region);
            loadRegions();
        }
    }

    useEffect(() => {
        initializeDatabase().then(() => {
            loadRegions();
        });
    }, []);


    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.text}>Home Screen</Text>
                <Button
                    title="Go to List"
                    onPress={() => navigation.navigate('Home', { name: 'John Doe' })}
                />
            </View>
            <FlatList
                data={region}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.id}: {item.name}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
    },
});

export default List;
