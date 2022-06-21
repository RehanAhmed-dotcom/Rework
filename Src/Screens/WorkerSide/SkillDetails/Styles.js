import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Platform} from 'react-native';
export default StyleSheet.create({
  ModalView: {
    width: wp('80%'),
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    paddingVertical: 20,
    marginTop: hp(15),
    alignSelf: 'center',
    marginBottom: 30,
  },
  ModalHeadingTxt: {
    color: '#15096F',
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    alignSelf: 'center',
  },
  ModalInput: {
    height: hp(8),
    width: wp('70%'),
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    borderColor: '#15096F',
  },
  ModalBtn: {
    height: hp(8),
    width: wp('80%'),
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
    fontWeight: 'bold',
  },
  bg: {
    flex: 1,
    height: '35%',
  },
  BigText: {
    color: '#fff',
    fontSize: 40,
    paddingLeft: 30,
    fontFamily: 'Poppins-SemiBold',
  },
  Subheaing: {
    color: '#fff',
    fontSize: 14,
    paddingLeft: 30,
    fontFamily: 'Poppins-Medium',
  },
  HeaderTopView: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    width: wp(100),
    height: hp(5),
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
  },

  smallLogo: {
    height: 50,
    width: 60,
    alignSelf: 'flex-end',
    right: 10,
    opacity: 0.3,
    top: Platform.OS == 'ios' ? 20 : 10,
  },
});
