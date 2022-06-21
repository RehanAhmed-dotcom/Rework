import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
export default StyleSheet.create({
    bg: {
        flex: 1, height: '45%', backgroundColor: '#F4F4FA',
    },
    BigText: {
        color: '#fff',
        fontSize: 25,
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center',
        marginTop: hp(12)

    },
    input: {
        height: hp(8),
        width: wp(80),
        borderWidth: 1,
        borderColor: '#15096F',
        alignSelf: 'center',
        borderRadius: 12,
        marginTop: 10,
        paddingHorizontal: 15,
        color: 'black',
        marginTop: 50
    },
    MediumText: {
        color: '#15096F',
        fontSize: 15,
        alignSelf: 'center',
        marginTop: 0,
        textAlign: 'left',
        marginTop: 20,
        fontFamily: 'Poppins-Medium'
    },



});