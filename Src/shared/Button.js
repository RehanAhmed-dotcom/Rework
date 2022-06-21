import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from "react-native"
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
const Button = ({ Title, navigation, onpress, Btnstyle, Txtstyle }) => {

    return (
        <TouchableOpacity style={{ ...Styles.btn, ...Btnstyle }}
            onPress={onpress}>
            <Text style={{ ...Styles.btnTxt, ...Txtstyle }}>{Title}</Text>

        </TouchableOpacity>

    )
}
export default Button
const Styles = StyleSheet.create({
    btn: {
        height: hp(8),
        width: wp(75),
        backgroundColor: "#5B77D0",
        alignSelf: "center",
        marginTop: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTxt: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold'
    }
})