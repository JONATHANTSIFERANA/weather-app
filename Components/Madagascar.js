const { DrawerLayoutAndroidBase } = require("react-native");

const Madagascar = () => {
    return (
        <>
            <View style={styles.column}>
                <Text style={{ color: 'black' }}>{styles.column.backgroundColor}</Text>
                {/* <StatusBar style="auto" /> */}
            </View>
            <View style={styles.container}>
                <View style={styles.row1}>
                    <Text style={{ color: 'black', textAlign: 'center' }}>{styles.row1.backgroundColor}</Text>
                    <Text color='white'>{name}</Text>
                    {/* <StatusBar style="auto" /> */}
                    {/* <TextInput value={name} onChange={test}  style={{ width : '50%', backgroundColor : 'white', color : 'black' }}/> */}
                </View>
                <View style={styles.row2}>
                    <Text style={{ color: 'black', textAlign: 'center' }}>{styles.row2.backgroundColor}</Text>
                    <Text color='white'>{name}</Text>
                    {/* <StatusBar style="auto" /> */}
                    {/* <TextInput value={name} onChange={test}  style={{ width : '50%', backgroundColor : 'white', color : 'black' }}/> */}
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    column: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: '30%',
        marginBottom: '30%',
        backgroundColor: 'white',
    },
    row1: {
        justifyContent: 'center',
        backgroundColor: 'green',
        height: '100%',
        width: '50%',
        
    },
    row2: {
        justifyContent: 'center',
        backgroundColor: 'red',
        height: '100%',
        width: '50%',
        
    },
    container: {
        flex: 1,
        backgroundColor: 'green',
        marginTop: '10%',
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center'
    },
    ss : {
        backgroundColor : 'red',
    }
});