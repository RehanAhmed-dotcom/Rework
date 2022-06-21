import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  bg: {
    flex: 1,
    height: hp(35),
  },
  BigText: {
    color: '#fff',
    fontSize: 30,
    alignSelf: 'center',
    marginTop: 10,
    fontFamily: 'Poppins-SemiBold',
  },
  MediumText: {
    color: 'white',
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  SmallText: {
    color: 'white',
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 10,
    right: 40,
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

  HeaderTopView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(100),
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  PickerView: {
    height: 120,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 90,
    alignSelf: 'center',
    marginTop: hp(4),
    // borderWidth: 1
  },
  Picker: {
    height: 120,
    width: 120,
    borderRadius: 90,
    alignSelf: 'center',
  },
  EditTxtView: {
    height: hp(3),
    width: wp(100),
    borderColor: '#ffff',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    marginTop: 30,
  },
  EditTxt: {
    color: 'white',
    opacity: 0.6,
  },
  ImageView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  DetailsView: {
    flex: 1,
    padding: 15,
  },
  SingleCard: {
    // backgroundColor: 'red',
    width: wp(90),
    borderBottomWidth: 1,
    height: 60,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderBottomColor: 'lightgray',
  },
  CardTxt: {
    // fontSize: 17,
    // color: '#15096F',
    // fontWeight: '800',
    // justifyContent: 'center',
    // height: hp(7),
    // width: wp(70),
    // alignItems: 'center',
    // paddingHorizontal: 15
    fontSize: 16,
    color: '#15096F',
    fontFamily: 'Poppins-Medium',
    // borderWidth: 1,
    width: wp(70),
  },
  RoundView: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'flex-end',
    elevation: 2,
  },
});
