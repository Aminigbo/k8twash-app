import {
    StyleSheet,
    StatusBar,
    View,
} from 'react-native';
import React, { useEffect, useState, } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../../utilities/theme';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Button, SelectButton } from '../../global-components.js/buttons';
import { BoldText1, BoldText2, BoldText3 } from '../../global-components.js/texts';
import { NewInput } from '../../global-components.js/inputs';
import { connect } from 'react-redux';
import { AuthBackIcon } from '../../utilities/icons';
// import Clipboard from '@react-native-clipboard/clipboard';
// import Toast from "react-native-root-toast";

// import RNPaystack from 'react-native-paystack'; 

const Colors = Color()


function ReferalScreen({ navigation }) {

    const [date, setDate] = useState(new Date());

    const [loading, setLoading] = useState(false)



    useEffect(() => {
    }, [])

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
                        alignItems: "center",
                        flexDirection: "row",
                        // backgroundColor:"red"
                    }} >
                        <TouchableOpacity
                            onPress={() => {
                                navigation.pop()
                            }} style={{
                                // backgroundColor:"red",
                                padding: 10
                            }}>
                            <AuthBackIcon />
                        </TouchableOpacity>
                        <BoldText3
                            text="Referral program"
                            color={Colors.dark}
                            style={{
                                marginLeft: 50,
                                marginTop: 10
                            }}
                        />
                    </View>

                    <View style={{
                        marginTop: 80
                    }} >

                        <BoldText1
                            text="Good things should be shared. If you like K8twash, refer it to a friend, and you both will get 50 % discount. Click here to know more."
                            color={Colors.dark}
                        />

                        <View style={{
                            marginTop: 40
                        }} >
                            <SelectButton
                                callBack={() => {
                                    // Clipboard.setString('hello world');
                                    // Toast.show("Referral code copied", {
                                    //     duration: Toast.durations.LONG,
                                    // });
                                }}
                                label="Referral code"
                                text="A7H465OJ02"
                                TextColor="grey"
                                copy
                                style={{
                                    backgroundColor: Colors.secondary,
                                    alignItems: "flex-start",
                                    paddingLeft: 10,
                                    fontSize: 10,
                                    marginBottom: 20
                                }} />
                        </View>

                        <View style={{
                            flex: 1,
                            // backgroundColor:"red",
                            marginTop: 40
                        }}>
                            <Button
                                callBack={() => {
                                    // Toast.show("Referral code copied", {
                                    //     duration: Toast.durations.LONG,
                                    // });
                                }}
                                text="Copy link"
                                primary
                                width="90%"
                                TextColor={Colors.white}
                            />
                        </View>
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


export default connect(mapStateToProps, mapDispatchToProps)(ReferalScreen);



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20
    },

});

