import {StyleSheet, Platform, Dimensions} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const {width} = Dimensions.get('window');
export default StyleSheet.create({
  bg: {
    flex: 1,
    height: '38%',
    paddingTop: Platform.OS == 'ios' ? 30 : 0,
  },
  BigText: {
    color: '#fff',
    fontSize: 40,
    alignSelf: 'center',
  },
  MediumText: {
    color: '#15096F',
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
  MediumText2: {
    color: 'white',
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 0,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  SmallText: {
    color: '#15096F',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  SmallTextBold: {
    color: '#5B77D0',
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 10,
    fontWeight: 'bold',
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
    paddingHorizontal: 12,
  },
  smallLogo: {
    height: 50,
    width: 60,
    alignSelf: 'flex-end',
    right: 10,
    opacity: 0.3,
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
    elevation: 4,
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
    paddingTop: 10,
  },
  PickerView: {
    height: hp(12),
    width: hp(12),
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    right: 10,
    bottom: 10,
    borderWidth: 1,
  },
  Picker: {
    height: hp(12),
    width: hp(12),
    borderRadius: 100,
  },
  EditTxtView: {
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
    fontFamily: 'Poppins-Regular',
    bottom: 5,
  },
  ImageView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 0,
    paddingHorizontal: 30,
    marginTop: 30,
  },
  DetailsView: {
    marginTop: hp(19),
    flex: 1,
    backgroundColor: '#F4F4FA',
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
    borderBottomColor: 'lightgray',
  },

  StartCountTxt: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: 'white',
    left: 10,
  },
  ProfessionTxt: {
    color: '#15096F',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  InputView: {
    height: hp(8),
    width: wp('90%'),
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    elevation: 2,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  InputViewPeragraph: {
    height: hp(20),
    width: wp('90%'),
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    elevation: 3,
    alignItems: 'flex-start',
    // justifyContent: 'center',
    marginBottom: 0,
  },
  RatingViewTop: {
    width: wp(100),
    height: hp(9),
    borderWidth: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: '#F4F4FA',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  child: {justifyContent: 'center'},
  text: {fontSize: 20, textAlign: 'center'},

  Swiper: {
    // height: hp(30),
    // width: wp(100),
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 0,
    flex: 1,
  },
  ReviewBox: {
    height: hp(30),
    borderWidth: 0,
    width: wp(89),
    alignSelf: 'center',
    elevation: 2,
    borderRadius: 20,
    marginRight: 20,
    backgroundColor: '#fff',
    // justifyContent: 'center'
    // paddingHorizontal: 20,
    top: 0,
  },
  ReviewBoxTopView: {
    borderWidth: 0,
    height: hp(15),
    width: wp(95),
    borderWidth: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  container: {
    backgroundColor: '#F4F4FA',
    width: '95%',
    alignSelf: 'center',
    borderRadius: 20,
    marginBottom: 30,
    height: '35%',
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Picker2: {
    height: hp(8),
    width: hp(8),
    borderRadius: 70,
    top: 10,
    // marginTop: 20
  },
  Empty: {
    color: 'red',
    alignSelf: 'center',
    marginTop: 20,
  },
});
