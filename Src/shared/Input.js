import React from 'react';
import { View, TextInput, StyleSheet } from "react-native"
const input = ({ pholder, value, setvalue }) => {

    return (
        <View style={Styles.inputView}>
            <TextInput style={[Styles.input, { marginLeft: 2 }]} placeholder={pholder}
                placeholderTextColor='gray'
                value={value}
                onChangeText={(text) => { setvalue(text) }} />
        </View>
    )
}
export default input
const Styles = StyleSheet.create({
    inputView: {
        height: 50,
        width: "100%",
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 10,
        marginBottom: 10,

    },
    input: {

        height: 50,
        width: "90%",
        color: 'black',
        fontFamily: "Segoe UI Regular",
        fontSize: 15,

    },
})