import {
    StyleSheet,
    StatusBar,
    View, Alert
} from 'react-native';
import React, { useEffect, useState, } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { fetchFcmToken } from '../../utilities/fcntoken';
import { Color } from '../../utilities/theme';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from '../../global-components.js/buttons';
import { Input, Inputs } from '../../global-components.js/inputs';
import { BoldText2, BoldText3 } from '../../global-components.js/texts';
import { AuthBackIcon, AuthSuccessIcon } from '../../utilities/icons';
import { ResetPwdController } from '../auth-controllers';
import { User } from '../../redux';
import { PasswordValidate } from '../../utilities';
// import RNPaystack from 'react-native-paystack'; 

const Colors = Color()


function ResetPWD({ navigation, appState, route }) {
    let User = appState.User
    const [pwd1, setpwd1] = useState("")
    const [pwd2, setpwd2] = useState("")
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null);
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
                        <View
                            style={{
                                alignItems: "center"
                            }}
                        >
                            <BoldText3
                                color={Colors.primary}
                                text="Reset your password" />
                        </View>
                    </View>

                    <View style={{
                        marginTop: 50
                    }} >
                        <Inputs
                            label="Enter new password:"
                            placeholder="enter new password"
                            data={pwd1}
                            setData={setpwd1}
                        />

                        <Inputs
                            label="Confirm new password:"
                            placeholder="Re-enter new password"
                            data={pwd2}
                            setData={setpwd2}
                        />

                    </View>
                    <View style={{
                        flex: 1,
                        // backgroundColor:"red",
                        marginTop: 20
                    }}>
                        <Button
                            text="Reset"
                            primary
                            loading={loading}
                            width="90%"
                            TextColor={Colors.white}
                            callBack={() => {
                                if (pwd1.length < 3 || pwd2.length < 3) {
                                    Alert.alert("Error", "Enter a valid password")
                                } else if (!PasswordValidate(pwd1) || pwd1.length < 6 || !PasswordValidate(pwd2) || pwd2.length < 6) { // chech for valid email
                                    Alert.alert("Pawword error", "Password length must be greater 6 characters including at least a number and a special character")
                                } else {
                                    if (pwd1 != pwd2) {
                                        Alert.alert("Error", "Your password do not match")
                                    } else {
                                        setLoading(true)
                                        ResetPwdController({
                                            pwd: pwd1,
                                            uuid: data.uuid,
                                            Alert,
                                            navigation,
                                            setLoading
                                        })
                                    }
                                }
                                // navigation.navigate("Success")
                                // setModalVisible(true)
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


export default connect(mapStateToProps, mapDispatchToProps)(ResetPWD);



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20
    },

});

