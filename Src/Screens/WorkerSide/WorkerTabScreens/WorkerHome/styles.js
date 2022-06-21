import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
export default StyleSheet.create({
    bg: {
        flex: 1, height: '45%', backgroundColor: '#F4F4FA',
    },
    BlueDot: {
        height: 13, width: 13, backgroundColor: '#15096F', borderRadius: 20
    },
    BigText: {
        color: '#fff',
        fontSize: 30,
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center',
        marginTop: hp(8)

    },
    smallLogo: {
        height: 25,
        width: 100,
        alignSelf: 'flex-end',
        // right: 10,
        opacity: 0.3
    },
    HeaderTopView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp(100),
        paddingVertical: 10,
        right: 10
    },
    ActiveCardView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        paddingHorizontal: 30,
        height: 48,
        borderWidth: 0,
        alignItems: 'center',
        marginBottom: 16,
        alignSelf: 'center',
        borderRadius: 15,
        elevation: 2,
        backgroundColor: '#5B77D0'
    },

    CardName: {
        color: '#15096F',
        fontSize: 16,
        alignSelf: 'center',
        fontFamily: 'Poppins-Medium',

    },
    GreenDot: {
        height: 15,
        width: 15,
        backgroundColor: 'green',
        borderRadius: 10
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
    Empty: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 16,
        marginTop: 100,
        color: 'red'
    }




});