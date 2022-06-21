import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
export default StyleSheet.create({
    bg: {
        flex: 1, height: '35%'
    },
    MainView: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15

    },
    BigText: {
        color: '#fff',
        fontSize: 35,
        alignSelf: 'center',
        fontFamily: 'Poppins-Bold',
        marginTop: 40
    },
    MediumText: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
        marginTop: 10,
        textAlign: 'center'
    },
    SmallText: {
        color: '#5B77D0',
        fontSize: 14,
        alignSelf: 'center',
        marginTop: 10
    },
    SmallTextBold: {
        color: '#5B77D0',
        fontSize: 14,
        alignSelf: 'center',
        marginTop: 10,
        fontWeight: 'bold'
    },
    input: {
        height: hp(8),
        width: wp(65),
        borderWidth: 1,
        borderColor: '#fff',
        alignSelf: 'center',
        borderRadius: 10,
        color: 'black',
        backgroundColor: '#5B77D0',
        marginTop: 30,
        paddingHorizontal: 12
    },

    smallLogo: {
        height: 40,
        width: 60,
        alignSelf: 'flex-end',
        opacity: 0.3,
    },
    AboutTxt: {
        fontSize: 16,
        textAlign: 'justify',
        fontFamily: 'Poppins-Regular'
    },
    HeaderTopView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        width: wp(100),
        alignItems: 'center'

    }




});