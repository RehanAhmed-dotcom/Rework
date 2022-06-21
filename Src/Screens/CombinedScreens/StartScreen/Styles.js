import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  MainView: {
    paddingTop: 10,
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    paddingBottom: 30,
  },
  LogoImg: {
    height: hp(11),
    width: wp(100),
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  SignUpText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 18,
    color: '#15096F',
    fontFamily: 'Poppins-Regular',
  },
  manImg: {
    height: hp(30),
    width: wp(90),
    alignSelf: 'center',
    marginTop: hp(10),
    marginBottom: 40,
  },
  btn: {
    height: hp(8),
    width: wp(70),
    backgroundColor: '#5B77D0',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: 'white',
    fontSize: 18,
  },
  CheckView: {
    flexDirection: 'row',
    height: hp(5),
    width: wp(100),
    alignSelf: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 38,
  },
  checkTxt: {
    fontSize: 12,
    color: '#15096F',
    fontFamily: 'Poppins-Regular',
  },
  checkTxtBold: {
    fontSize: 13,
    color: '#15096F',
    fontFamily: 'Poppins-SemiBold',
  },
});
