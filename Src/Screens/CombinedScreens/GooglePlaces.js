import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const Googleplaces = () => {
    const ref = useRef();
    const [textFocused, settextFocused] = useState(true);
    const [googleSearchText, setgoogleSearchText] = useState(null)
    const [pickstreeAdres, setpickstreeAdres] = useState("")
    const [pickstreeAdresErr, setpickstreeAdresErr] = useState('')
    const [latitude, setlatitude] = useState(0)
    const [longitude, setlongitude] = useState(0)
    return (
        <View style={{ flex: 1 }}>

            <Text>Places Api </Text>
            <GooglePlacesAutocomplete
                ref={ref}
                placeholder=""
                fetchDetails={true}
                textInputProps={{
                    value: pickstreeAdres,
                    onChangeText: text => {
                        setpickstreeAdresErr('');
                        setpickstreeAdres(text);
                        if (text === '') {
                            settextFocused(false);
                        } else {
                            if (!textFocused) {
                                settextFocused(true);
                            }
                        }
                    },
                }}
                query={{
                    key: 'AIzaSyAI-CFlK9DidWoWRwjbFq8_nzLO0lrs9y4',
                    language: 'en',
                }}
                enablePoweredByContainer={false}
                onPress={(data, details) => {
                    console.log("[][][][][]", data.description)
                    //Function which send to parent screen.
                    setpickstreeAdres(data.description);
                    setlatitude(details.geometry.location.lat);
                    setlongitude(details.geometry.location.lng);
                }}

                styles={{
                    textInputContainer: {
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                        width: '80%',
                        alignSelf: 'center',
                        marginLeft: 30,
                    },
                    textInput: {
                        borderWidth: 1,
                        borderColor: '#15096F',
                        borderRadius: 10,
                        height: 50
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                    },
                    listView: {
                        backgroundColor: '#fff',
                        borderWidth: 0.5,
                        borderColor: '#dedede',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 6,
                        },
                        shadowOpacity: 0.05,
                        shadowRadius: 10,
                        elevation: 4,
                    },
                    description: {
                        color: 'grey',
                    },
                }}
            />

        </View>
    );
}

const styles = StyleSheet.create({})

export default Googleplaces;
