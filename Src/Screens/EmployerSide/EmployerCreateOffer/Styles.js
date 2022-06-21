import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  bg: {
    flex: 1,
    height: '50%',
  },
  BigText: {
    color: '#fff',
    fontSize: 30,
    alignSelf: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  MediumText: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 10,
    textAlign: 'center',
  },
  SmallText: {
    color: '#5B77D0',
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 10,
  },
  SmallTextBold: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  input: {
    height: hp(8),
    width: wp(85),
    alignSelf: 'center',
    borderRadius: 10,
    color: 'black',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#15096F',
  },
  Peragraph: {
    height: hp(20),
    width: wp(85),
    alignSelf: 'center',
    borderRadius: 10,
    color: 'black',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    marginTop: 10,
    borderWidth: 1,
  },
  smallLogo: {
    height: 50,
    width: 60,
    alignSelf: 'flex-end',
    right: 10,
    opacity: 0.3,
  },
  FlatListCard: {
    height: hp(8),
    width: wp(86),
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    elevation: 2,
    flexDirection: 'row',
  },
  FlatListCard2: {
    width: wp(86),
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 5,
    maxHeight: 150,
    marginBottom: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    elevation: 2,
    flexDirection: 'row',
  },
  FlatListCardTxt: {
    color: '#15096F',
    fontSize: 16,
    alignSelf: 'center',
    fontFamily: 'Poppins-Medium',
  },
  GreenDot: {
    height: 15,
    width: 15,
    backgroundColor: '#15096F',
    borderRadius: 10,
  },
  smallCard: {
    height: hp(8),
    width: wp(86),
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5B77D0',
    justifyContent: 'center',
    elevation: 2,
  },

  SmallRoundPic: {
    height: hp(12),
    width: wp(12),
    borderRadius: 60,
  },
  HeaderTopView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(100),
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  TabViewTxt: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    borderColor: 'white',
  },
  TabView: {
    height: hp(8),
    width: wp(100),
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
    alignSelf: 'center',
    padding: 10,
  },
  Error: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    paddingLeft: 30,
    marginTop: 5,
  },
});
