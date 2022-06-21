import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
export default StyleSheet.create({
    bg: {
        flex: 1, height: '45%', backgroundColor: '#F4F4FA',
    },
    BigText: {
        color: '#fff',
        fontSize: 30,
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
    },
    MediumText: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
        marginTop: 0,
        textAlign: 'center'
    },
    SmallText: {
        color: '#5B77D0',
        fontSize: 14,
        alignSelf: 'center',
        marginTop: 10
    },
    SmallTextBold: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold'
    },


    smallLogo: {
        height: 50,
        width: 60,
        alignSelf: 'flex-end',
        right: 10,
        opacity: 0.3
    },
    SmallRoundPic: {
        height: 45,
        width: 45,
        borderRadius: 60,
    },
    HeaderTopView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: wp(100),
        padding: 15
    },
    Error: {
        color: 'red',
        alignSelf: 'center',
        marginTop: 10,
        fontSize: 12,
        fontFamily: 'Poppins-Medium'
    }










});