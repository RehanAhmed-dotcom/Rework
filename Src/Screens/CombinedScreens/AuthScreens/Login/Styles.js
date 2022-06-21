import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
export default StyleSheet.create({
    MainView: {
        paddingTop: 10,
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: '#ffff',
        paddingBottom: 30
    },
    LogoImg: {
        height: hp(11),
        width: wp(100),
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 50
    },
    SignUpText: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 16,
        color: '#15096F',
        fontFamily: "Poppins-Medium"

    },
    manImg: {
        height: hp(30),
        width: wp(90),
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 40
    },
    btn: {
        height: hp(8),
        width: wp(70),
        backgroundColor: "#5B77D0",
        alignSelf: "center",
        marginTop: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTxt: {
        color: 'white',
        fontSize: 18
    },
    HeaderTopView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        width: wp(100),
        alignItems: 'center',

    },
    smallLogo: {
        height: 40,
        width: 60,
        alignSelf: 'flex-end',
        opacity: 0.5
    },
    BigText: {
        color: '#5B77D0',
        fontSize: 40,
        alignSelf: 'center',
        fontFamily: "Poppins-Bold"
    },
    input: {
        height: hp(8),
        width: wp(70),
        borderWidth: 1,
        borderColor: '#15096F',
        alignSelf: 'center',
        borderRadius: 12,
        marginTop: 10,
        paddingHorizontal: 15,
        color: 'black',
    },
    RecoverView: {
        height: hp(8),
        width: wp(80),
    },
    RecoverTxt: {
        alignSelf: 'flex-end',
        marginTop: 5,
        color: '#15096F',
        fontSize: 14,
        fontFamily: "Poppins-Medium"
    },
    Logintext: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 12,
        marginTop: 5,
        color: '#15096F'
    },
    LoginTouch: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 12,
        marginTop: 5,
        fontWeight: 'bold',
        color: '#15096F'
    },

});