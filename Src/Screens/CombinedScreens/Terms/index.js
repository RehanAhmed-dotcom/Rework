import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ImageBackground } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Styles from './Styles'
import Back from 'react-native-vector-icons/AntDesign'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ToggleSwitch from 'toggle-switch-react-native'

const Index = ({ navigation }) => {
    const [isOn, setisOn] = useState(false)

    return (
        <>
            <ImageBackground style={Styles.bg}
                source={require('../../../Assets/bg.png')}
                resizeMode="stretch"
            >

                <View style={Styles.HeaderTopView}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Back name="left" color="white" size={20} />
                    </TouchableOpacity>
                    <Image source={require('../../../Assets/LogoWhite.png')}
                        resizeMode="contain"
                        style={Styles.smallLogo}
                    />
                </View>
                <Text style={Styles.BigText}>Terms</Text>


                <ScrollView showsVerticalScrollIndicator={false}
                    style={{ paddingHorizontal: 15, marginTop: wp(20) }}
                >
                    <Text style={Styles.AboutTxt}>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                        laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                        architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                        sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                        consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
                        dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
                        ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel
                        eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel
                        illum qui dolorem eum fugiat quo voluptas nulla pariatur


                    </Text>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 20, justifyContent: 'space-between', paddingRight: 20 }}>

                        <ToggleSwitch
                            isOn={isOn}
                            onColor="#15096F"
                            offColor="white"
                            size="small"
                            trackOnStyle={{ color: 'green' }}
                            thumbOffStyle={{ backgroundColor: '#15096F' }}
                            onToggle={() => setisOn(!isOn)}
                        />

                        <Text style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}>Agree with the terms and condition</Text>
                    </View>
                </ScrollView>
            </ImageBackground>
        </>
    );
}

const styles = StyleSheet.create({})

export default Index;
