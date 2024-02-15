import {
    StyleSheet,
    StatusBar,
    View,
    Alert
} from 'react-native';
import React, { useEffect, useState, } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
// import { fetchFcmToken } from '../../utilities/fcntoken';
import { Color } from '../../utilities/theme';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from '../../global-components.js/buttons';
import { Input, Inputs } from '../../global-components.js/inputs';
import { BoldText2, BoldText3 } from '../../global-components.js/texts';
import { AuthBackIcon } from '../../utilities/icons';
import { RequestOTPController } from '../auth-controllers';
import { isValidEmail } from '../../utilities';
// import RNPaystack from 'react-native-paystack'; 

const Colors = Color()


function RequestOTP({ navigation }) {

    const [date, setDate] = useState(new Date());
    const [Fcmoken, setFcmoken] = useState(null)
    const [data, setData] = useState({
        phone: ""
    });
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")


    useEffect(() => {
        console.log("OK")
        // fetchFcmToken(setFcmoken)

    }, [setDate])

    const STYLES = ['default', 'dark-content', 'light-content'];
    const TRANSITIONS = ['fade', 'slide', 'none'];
    const [hidden, setHidden] = useState(false);
    const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
    const [statusBarTransition, setStatusBarTransition] = useState(
        TRANSITIONS[0],
    );

    const Login = () => {

    }

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
                        // alignItems: "center"
                    }} >
                        <View style={{
                            marginVertical: 10,
                            justifyContent: "flex-start"
                        }} >
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.pop()
                                }}
                                style={{
                                    height: 50,
                                    // backgroundColor:"red"
                                }} >
                                <AuthBackIcon />
                            </TouchableOpacity>
                        </View>


                        <View style={{
                            // justifyContent:"center",
                            alignItems: "center"
                        }} >
                            <BoldText3
                                color={Colors.primary}
                                text="Enter your email account" />
                            <BoldText2
                                text="to verify it’s you"
                                color={Colors.dark}
                            />
                        </View>
                    </View>

                    <View style={{
                        marginTop: 50
                    }} >
                        <Inputs
                        label="Email"
                            placeholder="enter your email"
                            data={email}
                            setData={setEmail}
                        />
                        {/* <Input
                            label="Email:"
                            placeholder="enter your email"
                            data={email}
                            setData={setEmail}
                        /> */}

                    </View>
                    <View style={{
                        flex: 1,
                        // backgroundColor:"red",
                        marginTop: 20
                    }}>
                        <Button
                            loading={loading}
                            TextColor="white"
                            text="Request OTP"
                            primary
                            width="90%"
                            callBack={() => {
                                setLoading(true)
                                if (!isValidEmail(email)) {
                                    Alert.alert("Error", "Provide a valid email")
                                } else {
                                    RequestOTPController({
                                        email,
                                        Alert,
                                        navigation,
                                        setLoading

                                    })
                                }

                            }}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
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

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(RequestOTP);



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20
    },

});

