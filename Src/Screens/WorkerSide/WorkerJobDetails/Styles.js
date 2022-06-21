import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
export default StyleSheet.create({
    ModalView: {
        width: wp('80%'),
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 10,
        paddingVertical: 20,
        marginTop: hp(13),
        alignSelf: 'center',
        marginBottom: 30,
        flexGrow: 1
    },
    ModalHeadingTxt: {
        color: '#15096F',
        fontSize: 22,
        fontFamily: 'Poppins-Bold',
        alignSelf: 'center',
        letterSpacing: 2
    },
    ModalInput: {
        height: hp(8),
        width: wp("70%"),
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        paddingHorizontal: 10
    },
    ModalBtn: {
        height: hp(8),
        width: wp('60%'),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#5B77D0',
        marginBottom: 30,

    },
    ModalBtnTxt: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    bg: {
        flex: 1, height: '35%', backgroundColor: '#F4F4FA'
    },
    BigText: {
        color: '#fff',
        fontSize: 40,
        paddingLeft: 10,
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center',
        marginTop: 50
    },

    HeaderTopView: {
        flexDirection: 'row',
        width: wp(90),
        height: hp(5),
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderWidth: 0,
        paddingHorizontal: 10

    },

    smallLogo: {
        height: 50,
        width: 60,
        opacity: 0.3,
        top: 10,
        left: 30,
    },
    ProfessionTxt: {
        color: '#15096F',
        fontSize: 15,
        fontFamily: 'Poppins-SemiBold',
    },
    InputView: {
        height: hp(8),
        width: wp("90%"),
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 15,
        paddingHorizontal: 10,
        elevation: 3,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    InputViewPeragraph: {
        height: hp(20),
        width: wp("90%"),
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 10,
        padding: 10,
        elevation: 3,
        alignItems: 'flex-start',
        // justifyContent: 'center',
        marginBottom: 30,

    },




})