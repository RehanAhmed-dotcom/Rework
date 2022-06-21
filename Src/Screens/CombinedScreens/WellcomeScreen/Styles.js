import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
export default StyleSheet.create({
    MainView: {
        paddingTop: 10,
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: '#5B77D0',
        paddingBottom: 30
    },
    LogoImg: {
        height: hp(11),
        width: wp(100),
        alignSelf: 'center',
    },

    Wellcom: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 30,
        fontFamily: 'Poppins-Medium',
        letterSpacing: 10,
        marginTop: hp(25)
    },
    CategoryTxt: {
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Poppins-Regular'
    },
    BtnExtraStyle: { backgroundColor: 'white', borderWidth: 1, borderColor: 'white', marginTop: 100 },
    BtnTxtExtraStyle: { color: '#5B77D0' },

});


