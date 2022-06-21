import React, { useState } from 'react';
import { View, StyleSheet, Text, ImageBackground, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Styles from './styles';
import Button from '../../../shared/Button';
import Arrow from 'react-native-vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';
const Index = ({ navigation }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);
    return (
        <>
            <ImageBackground source={require('../../../Assets/bg.png')}
                style={Styles.bg}
            >
                <View style={Styles.HeaderTopView}>

                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <Arrow name="left" size={20} color="#fff" style={{ left: 20 }} />
                    </TouchableOpacity>
                    <Image source={require('../../../Assets/LogoWhite.png')}
                        style={Styles.smallLogo} resizeMode="contain" />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center' }}>
                    <Text></Text>
                    <Text style={Styles.BigText}>Find Offer</Text>
                    <Image source={require('../../../Assets/filter2.png')}
                        style={{ height: 20, width: 20 }}
                        resizeMode="contain"

                    />
                </View>
                <ScrollView>
                    <View style={Styles.InputsView}>
                        <Text style={Styles.HeadinOnly}>Location</Text>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            style={{ marginTop: 10, marginBottom: 10 }}
                            placeholder="Select Location"
                            searchPlaceholderTextColor="lightgray"
                        />

                        <Text style={Styles.HeadinOnly}>Experience</Text>
                        <TextInput style={Styles.Input}
                            placeholder="Enter Experience"
                        />
                        <TouchableOpacity style={Styles.ModalBtn}
                            onPress={() => navigation.goBack()}
                        >
                            <Image source={require('../../../Assets/tick.png')}

                                style={{ height: 15, width: 15, top: 3, tintColor: 'white' }}
                            />
                            <Text style={Styles.ModalBtnTxt}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>

        </>
    );
}
export default Index;