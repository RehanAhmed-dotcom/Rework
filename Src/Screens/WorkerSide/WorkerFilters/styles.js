import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
export default StyleSheet.create({
    bg: {
        flex: 1, height: hp('40%')
    },
    BigText: {
        color: '#fff',
        fontSize: 40,
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

    GreenDot: {
        height: 15,
        width: 15,
        backgroundColor: 'green',
        borderRadius: 10
    },
    HeaderTopView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp(100),
        alignItems: 'center',
        height: hp(7)
    },
    InputsView: {
        marginTop: hp('25%'),
        paddingHorizontal: 15,
        marginBottom: 30
    },
    HeadinOnly: {
        fontSize: 20,
        color: '#15096F',
        fontFamily: 'Poppins-Regular'
    },
    RatingsTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    RatingView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 10
    },
    Input: {
        height: hp(8),
        width: wp('90%'),
        borderWidth: 1,
        backgroundColor: '#fff',
        color: 'black',
        paddingHorizontal: 12,
        borderRadius: 5,
        marginTop: 10,
    },
    ModalBtn: {
        height: hp(8),
        width: wp('80%'),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#5B77D0',
        marginTop: hp(15)

    },
    ModalBtnTxt: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },




});