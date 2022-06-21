import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
export default StyleSheet.create({
    bg: {
        flex: 1, height: '38%', backgroundColor: '#F4F4FA',
    },
    BigText: {
        color: '#fff',
        fontSize: 30,
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center',
        marginTop: hp(5)

    },
    MediumText: {
        color: '#15096F',
        fontSize: 16,
        alignSelf: 'center',
        marginTop: 10,
        textAlign: 'center',
        fontFamily: 'Poppins-Medium'
    },
    SmallText: {
        color: '#15096F',
        color: '#15096F',
        fontSize: 12,
        fontFamily: 'Poppins-Regular'
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
        justifyContent: 'flex-end',
        width: wp(100),
        padding: 15
    },
    TabView: {
        height: hp(5),
        width: wp(100),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    TabViewTxt: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        color: 'white',
        borderColor: 'white'

    },
    ActiveTxt: {
        fontSize: 10,
        textAlign: 'right',
        top: 0,
        color: '#fff',
        fontFamily: 'Poppins-ExtraLight'
    },
    ActiveCardView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        paddingHorizontal: 10,
        height: 65,
        borderWidth: 0,
        alignItems: 'center',
        marginBottom: 10,
        alignSelf: 'center',
        borderRadius: 15,
        elevation: 5,
        backgroundColor: '#5B77D0'
    },
    ActiveCardImageView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0,
        width: 130,
        paddingHorizontal: 12
    },
    ActiveCardRatingView: {
        height: 20,
        width: 60,
        borderWidth: 0,
        alignSelf: 'center',

    },
    CardName: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: '#15096F'
    },
    CardProfession: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: 'lightgray',
        left: 5
    },
    Picker2: {
        height: hp(8),
        width: hp(8),
        borderRadius: 70,
        top: 10
        // marginTop: 20


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
    OfferJob: {
        height: hp(4),
        width: wp('20% '),
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        alignSelf: 'flex-end'
    },
    OfferJobTxt: {
        fontSize: 12,
        color: '#15096F',
        fontFamily: 'Poppins-Medium'
    },
    Swiper: {
        // height: hp(30),
        // width: wp(100),
        alignSelf: 'center',
        marginBottom: 20,
        borderWidth: 0,
        flex: 1



    },
    ReviewBox: {
        height: hp(28),
        borderWidth: 0,
        width: wp(90),
        alignSelf: 'center',
        // borderWidth: 1,
        borderRadius: 20,
        marginBottom: 10,
        backgroundColor: '#fff',
        elevation: 2
        // justifyContent: 'center'
        // paddingHorizontal: 20,




    },
    ReviewBoxTopView: {
        borderWidth: 0,
        height: hp(15),
        width: wp(95),
        borderWidth: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        alignSelf: 'center'



    },
    container: { flex: 1, backgroundColor: '#fff', width: '95%', alignSelf: 'center', borderRadius: 20 },
    PickerView: {
        height: hp(15),
        width: wp(20),
        borderRadius: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
        right: 10,

    },
    Picker: {
        height: hp(12),
        width: wp(20),
        borderRadius: 70,
        // marginTop: 20


    },
    StartCountTxt: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        color: 'white',
        left: 10
    },


});