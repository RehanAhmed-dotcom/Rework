import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
export default StyleSheet.create({
    root: { flex: 1, },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { justifyContent: 'space-between', paddingHorizontal: 60, marginTop: 45 },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 1,
        borderColor: '#15096F',
        textAlign: 'center',
        color: '#15096F',
        borderRadius: 5
    },
    focusCell: {
        borderColor: '#5B77D0',
    },
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