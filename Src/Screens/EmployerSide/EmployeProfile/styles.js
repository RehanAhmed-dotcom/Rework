import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
export default StyleSheet.create({
    bg: {
        flex: 1, height: '50%'
    },
    BigText: {
        color: '#fff',
        fontSize: 40,
        alignSelf: 'center',
    },
    MediumText: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
        marginTop: 10,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold'
    },
    SmallText: {
        color: 'white',
        fontSize: 16,
        alignSelf: 'center',
        marginTop: 10,
        right: wp(10),
        fontFamily: 'Poppins-SemiBold '
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
        height: 50,
        width: 60,
        alignSelf: 'flex-end',
        right: 10,
        opacity: 0.3
    },
    smallCard: {
        flex: 1,
        height: hp(9),
        width: wp(86),
        alignSelf: 'center',
        borderRadius: 10,
        borderWidth: 0,
        marginTop: 5,
        marginBottom: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        elevation: 4
    },
    SmallRoundPic: {
        height: hp(12),
        width: wp(12),
        borderRadius: 60,
    },
    HeaderTopView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: wp(100),
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 10
    },
    PickerView: {
        height: 90,
        width: 90,
        borderRadius: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
        right: 10,

    },
    Picker: {
        height: 90,
        width: 90,
        borderRadius: 70,
        alignSelf: 'center',
        marginTop: 20


    },
    EditTxtView:
    {
        height: hp(3),
        width: wp(100),
        borderColor: '#ffff',
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingHorizontal: 18,
        marginTop: 30,
        // backgroundColor:'#fff'
    },
    EditTxt: {
        color: 'white',
        opacity: 0.5,
        fontSize: 14,
        fontFamily: 'Poppins-Regular'
    },
    ImageView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0
    },
    DetailsView: {

        marginTop: hp(20),
        flex: 1,
        padding: 0,
        backgroundColor: '#F4F4FA'
    },
    SingleCard: {
        height: hp(10),
        width: wp(90),
        borderBottomWidth: 1,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        alignItems: 'center',
        borderBottomColor: 'lightgray'

    },
    CardTxt: {
        fontSize: 16,
        color: '#15096F',
        fontFamily: 'Poppins-SemiBold'
    },
    StartCountTxt: {
        fontSize: 14, fontFamily: 'Poppins-Bold',
        color: 'white',
        left: 20
    }




});