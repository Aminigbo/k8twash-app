// import { TextInput } from 'react-native-paper';
import { Color } from '../utilities/theme';
import { BoldText2 } from './texts';
// import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { View, TextInput, StyleSheet } from 'react-native';
import { Input } from 'native-base';


const Colors = Color()

export function Inputs({
    type,
    keyboardType,
    data, setData,
    label,
    placeholder,
    bottomLabel,
    navigation,
    disabled,
    multiline
}) {
    return (<>
        {label && <BoldText2 color={Colors.dark} text={label} />}
        {/* <TextInput
            height={55}
            keyboardType={keyboardType}
            // autoFocus
            value={data}
            onChangeText={(value) => setData(value)}
            placeholder={placeholder}
            style={{
                width: "100%",
                marginBottom: bottomLabel ? 4 : 30,
                backgroundColor: Colors.secondary,
                color: "black",
                borderRadius: 10,
                // maxHeight:200,
                // height: 55,
                paddingHorizontal: 10
                //  elevation:
            }}
            textColor={Colors.dark}
            theme={{
                colors: {
                    primary: Colors.dark,
                    background: 'red',
                    placeholder: "red",
                },
                roundness: 8,
            }}
            // mode="outlined"
            multiline={multiline}
        // label={label}
        /> */}

        <Input
            mb={3}
            // label="Password:"
            keyboardType={type ? type : ""}
            value={data}
            onChangeText={(value) => setData(value)}
            placeholder={placeholder}
        // placeholder="enter your password"
        // data={password}
        // setData={setpassword}
        // onChangeText={(text) => setpassword(text)}
        />

        {bottomLabel &&
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Request-otp")
                }}
                style={{
                    // marginTop: -25,
                    // backgroundColor:"red",
                    paddingVertical: 10
                }}
            >
                <BoldText2
                    color={Colors.dark}
                    text={bottomLabel} />
            </TouchableOpacity>
        }
    </>)
}

export function PickerInput({
    pickData, setpickData, label, Items
}) {
    return (
        <>

        </>
    )
}

export function NewInput({
    data, setData, placeholder, type, label,
    background
}) {
    return (
        <>
            {label && <BoldText2 color={Colors.dark} text={label} />}
            <TextInput
                style={[styles.input, {
                    backgroundColor: background,
                    borderWidth: 0,
                    color: "black",
                }]}
                placeholder={placeholder}
                // value={cvv}
                value={data} // Display masked CVV
                onChangeText={(text) => setData(text)}
                // maxLength={3}
                keyboardType={type}
                placeholderTextColor="#888"
                height={55}
            /></>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: "black"
    },
});
