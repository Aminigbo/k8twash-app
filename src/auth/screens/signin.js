import {
    StyleSheet,
    StatusBar,
    View
} from 'react-native';
import React, { useEffect, useState, } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
// import { fetchFcmToken } from '../../utilities/fcntoken';
import { Color } from '../../utilities/theme';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from '../../global-components.js/buttons';
// import { Input } from '../../global-components.js/inputs';
import { BoldText2, BoldText3 } from '../../global-components.js/texts';
import { User } from '../../redux';
import { SigninController } from '../auth-controllers';
import { PinInput, Input } from 'native-base';
// import RNPaystack from 'react-native-paystack'; 

const Colors = Color()


function SignIn({ appState, navigation, disp_user }) {

    const [date, setDate] = useState(new Date());
    const [Fcmoken, setFcmoken] = useState(null)
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("")
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        // fetchFcmToken(setFcmoken)
        console.log(appState)
    }, [setDate])

    const STYLES = ['default', 'dark-content', 'light-content'];
    const TRANSITIONS = ['fade', 'slide', 'none'];
    const [hidden, setHidden] = useState(false);
    const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
    const [statusBarTransition, setStatusBarTransition] = useState(
        TRANSITIONS[0],
    );

    return appState.User != null ? navigation.replace("Home") : (

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
                        alignItems: "center"
                    }} >
                        <BoldText3
                            color={Colors.primary}
                            text="Sign In" />
                        <BoldText2
                            text="Welcome back"
                            color={Colors.dark}
                        />
                    </View>

                    <View style={{
                        marginTop: 50
                    }} >
                        <Input
                        mb={10}
                            label="Email:"
                            placeholder="enter your email"
                            data={email}
                            onChangeText={(text) => setemail(text)}
                            // setData={setemail}
                        /> 
                        <Input
                        mb={3}
                            label="Password:"
                            placeholder="enter your password"
                            data={password}
                            // setData={setpassword}
                            onChangeText={(text) => setpassword(text)}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Request-otp")
                            }} >
                            <BoldText2
                                text="Forgot password ?"
                                color={Colors.dark}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flex: 1,
                        // backgroundColor:"red",
                        marginTop: 20
                    }}>
                        <Button
                            callBack={() => {
                                if (loading == false) {
                                    SigninController({
                                        email, password,
                                        setLoading, disp_user, navigation
                                    })
                                }
                            }}
                            loading={loading}
                            text="Sign In"
                            primary
                            width="90%"
                            TextColor={Colors.white}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("SignUp")
                            }}
                            style={{
                                flexDirection: "row",
                                marginTop: 20,
                                justifyContent: "center"
                            }}
                        >
                            <BoldText2
                                color={Colors.dark}
                                text="Don't have an account? " />
                            <BoldText2
                                color="red"
                                text="Sign up" />
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


export default connect(mapStateToProps, mapDispatchToProps)(SignIn);



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20
    },

});

