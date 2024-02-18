import {
    StyleSheet,
    StatusBar,
    View,
    Alert, Text
} from 'react-native';
import React, { useEffect, useState, } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
// import { fetchFcmToken } from '../../utilities/fcntoken';
import { Color } from '../../utilities/theme';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Button, SelectButton } from '../../global-components.js/buttons';
import { Inputs, PickerInput } from '../../global-components.js/inputs';
import { BoldText1, BoldText2, BoldText3 } from '../../global-components.js/texts';
import { User } from "../../redux"
import { SignupController } from '../auth-controllers';
import { Actionsheet, useDisclose, Stack, HStack } from 'native-base';
// import RNPaystack from 'react-native-paystack'; 

const Colors = Color()


function SignIn({ navigation, appState, disp_user }) {

    const [date, setDate] = useState(new Date());
    const [Fcmoken, setFcmoken] = useState(null)
    const [loading, setLoading] = useState(false)
    const [drawerComponent, setDrawerComponent] = useState("")
    const [name, setname] = useState("");
    const [phone, setphone] = useState("");
    const [email, setemail] = useState("")
    const [country, setcountry] = useState("")
    const [city, setcity] = useState("")
    const [password, setpassword] = useState("")

    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();

    useEffect(() => {
        // fetchFcmToken(setFcmoken)

    }, [setDate])

    const STYLES = ['default', 'dark-content', 'light-content'];
    const TRANSITIONS = ['fade', 'slide', 'none'];
    const [hidden, setHidden] = useState(false);
    const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
    const [statusBarTransition, setStatusBarTransition] = useState(
        TRANSITIONS[0],
    );
    const Countries = [
        { name: "Nigeria" },
        { name: "Ghana" },
    ]

    return (

        <>
            {/* {console.log(Fcmoken)} */}
            <SafeAreaView style={styles.container}>
                <StatusBar
                    animated={true}
                    backgroundColor={Colors.background}
                    barStyle={statusBarStyle}
                    showHideTransition={statusBarTransition}
                    hidden={hidden}
                />

                <ScrollView>
                    <View style={{
                        // justifyContent:"center",
                        alignItems: "center",
                        // padding:10
                    }} >
                        <BoldText3
                            color={Colors.primary}
                            text="Sign Up" />
                        <BoldText2
                            text="Register to begin your journey"
                            color={Colors.dark}
                        />
                    </View>

                    <View style={{
                        marginTop: 20,
                        padding: 20
                    }} >
                        <Inputs
                            label="Name:"
                            placeholder="enter your fullname"
                            data={name}
                            setData={setname}
                            keyboardType='email-address'
                        />
                        <Inputs
                            type="numeric"
                            label="Phone number:"
                            placeholder="enter your phone number"
                            data={phone}
                            setData={setphone}
                        />

                        <Inputs
                            label="Email:"
                            placeholder="enter your email"
                            data={email}
                            setData={setemail}
                        />

                        <SelectButton
                            callBack={() => {
                                setDrawerComponent("Country")
                                onOpen()
                            }}
                            label="Country"
                            text={country == "" ? "Select Country" : country}
                            TextColor="grey"
                            style={{
                                backgroundColor: Colors.secondary,
                                alignItems: "flex-start",
                                paddingLeft: 10,
                                fontSize: 10,
                                marginBottom: 20
                            }} />

                        <Inputs
                            label="City:"
                            placeholder="enter your city"
                            data={city}
                            setData={setcity}
                        />
                        <Inputs
                            label="Password:"
                            placeholder="enter your password"
                            data={password}
                            setData={setpassword}
                        />

                    </View>

                    <View style={{
                        flex: 1,
                        padding: 20
                        // backgroundColor:"red",
                        // marginTop: 50
                    }}>
                        <BoldText1
                            color="grey"
                            text="By clicking sign Up, you agree to our conditions and terms of use." />
                        <Button
                            text="Sign In"
                            primary
                            width="90%"
                            TextColor={Colors.white}
                            callBack={() => {
                                if (loading == false) {
                                    SignupController({
                                        name, email, country, city, password,
                                        setLoading, disp_user, navigation, phone
                                    })
                                }
                            }}
                            loading={loading}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("signin")
                            }}
                            style={{
                                flexDirection: "row",
                                marginTop: 20,
                                justifyContent: "center"
                            }}
                        >
                            <BoldText2
                                color={Colors.dark}
                                text="Have an account? " />
                            <BoldText2
                                color="red"
                                text="Sign in" />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>

            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content >
                    <ScrollView style={{
                        // backgroundColor:"yellow",
                        width: "100%"
                    }} >

                        <Stack >

                            {/* Vehicle type */}
                            {drawerComponent == "Country" && <>
                                <View style={{
                                    alignItems: "center"
                                }} >
                                    <BoldText1
                                        color={Colors.dark}
                                        text="Select your Country" />
                                </View>

                                <ScrollView>
                                    <View style={{
                                        padding: 15
                                    }} >
                                        {
                                            Countries.map((e, index) => {
                                                return (<>
                                                    <Actionsheet.Item
                                                        style={{
                                                            marginBottom: 10,
                                                            borderBottomColor: "lightgrey",
                                                            borderBottomWidth: 1
                                                            // flex: 1,
                                                            // display:"flex"
                                                            dont add any other thing again.
                                                        }}
                                                        onPress={() => {
                                                            onClose()
                                                            setcountry(e.name)

                                                        }} >
                                                        <HStack style={{
                                                            justifyContent: "center",
                                                            alignItems: "center"
                                                        }} >
                                                            <View style={{
                                                                borderColor: e.color == "green" ? "red" : e.color,
                                                                borderWidth: 1,
                                                                height: 20, width: 20, backgroundColor: e.color,
                                                                borderRadius: 10
                                                            }} />
                                                            <Text style={{ marginLeft: 30, color:"#000" }} > {e.name}</Text>
                                                        </HStack>

                                                    </Actionsheet.Item>

                                                </>)
                                            })
                                        }
                                    </View>
                                </ScrollView>
                            </>}
                        </Stack>


                    </ScrollView>



                </Actionsheet.Content>
            </Actionsheet>

        </>

    );
}


const mapStateToProps = (state) => {
    return {
        appState: state.user,
    };
};


const mapDispatchToProps = (dispatch, encoded) => {
    return {
        disp_user: (payload) => dispatch(User(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SignIn);



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
        // backgroundColor:"red",
        // padding: 10
    },

});

