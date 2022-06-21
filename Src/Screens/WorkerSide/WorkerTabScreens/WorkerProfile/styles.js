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
    fontSize: 40,
    alignSelf: 'center',
  },
  MediumText: {
    color: 'white',
    fontSize: 18,
    // alignSelf: 'center',
    marginTop: 0,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  SmallText: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 10,
    right: wp(10),
    fontFamily: 'Poppins-SemiBold ',
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
    height: hp(15),
    width: hp(15),
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    right: 10,
  },
  Picker: {
    height: hp(12),
    width: hp(12),
    borderRadius: 70,
    alignSelf: 'center',
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
    bottom: 4,
  },
  ImageView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingLeft: 50,
    borderWidth: 0,
    alignItems: 'center',
    marginTop: 20,
  },
  DetailsView: {
    marginTop: hp(20),
    flex: 1,
    padding: 0,
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
  SkillsCard: {
    // height: hp(20),
    width: wp(90),
    borderBottomWidth: 1,
    alignSelf: 'center',
    // backgroundColor: 'red',
    // flexWrap: 'wra',
    padding: 10,
    borderBottomColor: 'lightgray',
  },
  insideSkillCard: {
    height: hp(7),
    width: wp(90),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  CardTxt: {
    fontSize: 16,
    color: '#15096F',
    fontFamily: 'Poppins-Medium',
  },
  StartCountTxt: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    left: 20,
  },
  Tag: {
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F4FA',
    marginRight: 5,
    marginBottom: 5,
    flexWrap: 'wrap',
    borderRadius: 5,
    // flex: 1,
    paddingHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  TagTxt: {
    fontSize: 10,
    color: '#15096F',
    fontFamily: 'Poppins-Medium',
  },
});
