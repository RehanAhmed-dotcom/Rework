import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
export default StyleSheet.create({
    bg: {
        flex: 1, height: '55%', backgroundColor: '#F4F4FA'
    },
    BigText: {
        color: '#fff',
        fontSize: 30,
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center'
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
    input: {
        height: hp(8),
        width: wp(85),
        alignSelf: 'center',
        borderRadius: 10,
        color: 'white',
        backgroundColor: '#5B77D0',
        paddingHorizontal: 12,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#fff'
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
        justifyContent: 'space-between',
        width: wp(100),
        alignItems: 'center'
    },
    TabView: {
        height: hp(5),
        width: wp(45),
        borderWidth: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 30,
        marginTop: 0,
        alignItems: 'center'
    },
    TabViewTxt: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        color: 'white',
        borderColor: 'white'

    },
    ActiveTxt: {
        fontSize: 12,
        textAlign: 'right',
        color: '#98A9E1',
        fontFamily: 'Poppins-Regular'
    },
    SmallRound: {
        height: hp(12),
        width: hp(12),
        borderWidth: 1,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    yesNo: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        color: '#15096F'
    },
    FoundText: {
        fontSize: 30,
        color: '#15096F',
        alignSelf: 'center',
        fontFamily: 'Poppins-Medium'
    },
    AnswerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: hp(5)
    },
    ActiveCardView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        // height: 55,
        borderWidth: 0,
        marginBottom: 10,
        alignSelf: 'center',
        borderRadius: 15,
        elevation: 2,
        backgroundColor: '#5B77D0'
    },
    ActiveCardImageView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0,
        width: '80%',
        paddingHorizontal: 12,
    },
    ActiveCardRatingView: {
        height: 20,
        width: 60,
        borderWidth: 0,
        alignSelf: 'center',

    },
    CardName: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#15096F'
    },
    CardProfession: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#A19DC5',
        left: 5
    },
    ModalView: {
        height: hp('70%'),
        width: wp('80%'),
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 10,
        paddingVertical: 20
    },
    ModalHeadingTxt: {
        color: '#5B77D0',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        letterSpacing: 2,
        marginBottom: 10
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
    ModalPeragraph: {
        height: hp(15),
        width: wp("70%"),
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        textAlignVertical: "top",
        marginTop: 10,
        paddingHorizontal: 10
    },
    DropDown: {
        height: hp(8),
        width: wp('70%'),
        alignSelf: 'center',
        marginTop: 10,
    },
    ContainerStyle: {
        height: hp(8),
        width: wp('70%'),
        alignSelf: 'center',

    },
    ModalBtn: {
        height: hp(8),
        width: wp('50%'),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#5B77D0',
        marginTop: 30
    },
    ModalBtnTxt: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    Empty: {
        marginTop: 100,
        alignSelf: 'center',
        color: 'red'
    }



});