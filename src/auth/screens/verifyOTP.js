import {
    StyleSheet,
    StatusBar, Alert,
    View, Modal, Pressable
} from 'react-native';
import React, { useEffect, useState, } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { fetchFcmToken } from '../../utilities/fcntoken';
import { Color } from '../../utilities/theme';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from '../../global-components.js/buttons';
import { Input, Inputs } from '../../global-components.js/inputs';
import { BoldText1, BoldText2, BoldText3 } from '../../global-components.js/texts';
import { AuthBackIcon } from '../../utilities/icons';
import { User } from '../../redux';

// import RNPaystack from 'react-native-paystack'; 



const Colors = Color()


function VerifyOTP({ navigation, route, disp_user }) {

    const [data, setData] = useState(null);
    const [otp, setotp] = useState("");
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setData(route.params.data)
    }, [navigation])

    const STYLES = ['default', 'dark-content', 'light-content'];
    const TRANSITIONS = ['fade', 'slide', 'none'];
    const [hidden, setHidden] = useState(false);
    const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
    const [statusBarTransition, setStatusBarTransition] = useState(
        TRANSITIONS[0],
    );


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
                                text="Verify your email account" />
                            <BoldText2
                                text="We  sent a code to your email account"
                                color={Colors.dark}
                            />
                        </View>
                    </View>

                    <View style={{
                        marginTop: 50
                    }} >
                        <Inputs
                            label="OTP"
                            placeholder="Enter OTP"
                            data={otp}
                            setData={setotp}
                        />

                        {/* 
                        <Input
                            label="OTP:"
                            placeholder="Enter OTP"
                            data={otp}
                            setData={setotp}
                        /> */}
                        {/* <View style={{ height: 35, width: 35, backgroundColor: Colors.primary, borderRadius: 35 }} /> */}

                        {/* <BoldText1
                            color="grey"
                            text="(00:39)" /> */}

                    </View>
                    <View style={{
                        flex: 1,
                        // backgroundColor:"red",
                        marginTop: 40
                    }}>
                        <Button
                            text="Verify"
                            primary
                            width="90%"
                            TextColor="white"
                            callBack={() => {
                                // setModalVisible(true)
                                // navigation.navigate("ResetPWD")
                                console.log(data)
                                if (otp == data.OTP) {
                                    Alert.alert("Success", "OTP verified successfully", [{
                                        text: route.params.Reg ? "Proceed to home": "Reset your pasword",
                                        onPress: () => {
                                            if (route.params.Reg) {
                                                disp_user(data)
                                                navigation.replace("Home", { data })
                                                //  at this point, user the returned email and password to login
                                            } else {
                                                navigation.replace("ResetPWD", { data })
                                            }
                                        }
                                    }])
                                } else {
                                    Alert.alert("Error", "You entered an invalid OTP")
                                }
                            }}
                        />

                        <TouchableOpacity style={{
                            alignItems: "center",
                            marginTop: 25
                        }} >
                            {/* <BoldText2
                                color={Colors.primary}
                                text="Resend code" /> */}
                        </TouchableOpacity>
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
        disp_user: (payload) => dispatch(User(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(VerifyOTP);



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20
    },

    containerX: {
        flex: 1,
        backgroundColor: "#141414",
        alignItems: "center",
        justifyContent: "center",
    },

});

