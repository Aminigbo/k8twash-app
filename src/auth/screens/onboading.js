import {
    StyleSheet,
    StatusBar,
    View
} from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { Color } from '../../utilities/theme';
import { OnboardingIcon } from '../../utilities/icons';
import { BoldText1, BoldText4 } from '../../global-components.js/texts';
import { Button } from '../../global-components.js/buttons';
import { initAuth } from '../../redux';
// import RNPaystack from 'react-native-paystack'; 

const Colors = Color()


function Onboarding({ appState, navigation, disp_initAuth }) {

    useEffect(() => {
        console.log(appState.initialized)
    }, [])



    return appState.initialized == true ? navigation.replace("Auth", { screen: "signin" }) : (

        <>
            {/* {console.log(Fcmoken)} */}
            <SafeAreaView style={styles.container}>
                <StatusBar
                    animated={true}
                    backgroundColor={Colors.light}
                    barStyle="dark-content"
                    showHideTransition="fade"
                />
                <View>
                    <OnboardingIcon />
                </View>
                <View style={{
                    marginTop: 20,
                }} >
                    <BoldText4
                        color="white"
                        text="We do the washing " />
                    <BoldText1
                        style={{
                            textAlign: "center"
                        }}
                        color="white"
                        text="so that you can have more time to do all the things you love" />
                </View>


            </SafeAreaView>

            <View style={{
                padding: 20,
                position: "absolute",
                bottom: 30,
                width: "90%",
                marginLeft: "5%"
                // justifyContent:"center",
                // alignItems:"center"
            }}>
                <Button
                    callBack={() => {
                        disp_initAuth()
                        navigation.replace("signin")
                    }}
                    TextColor={Colors.primary}
                    text="Get started" />
            </View>
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
        disp_initAuth: (payload) => dispatch(initAuth(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        justifyContent: "center",
        alignItems: "center",
        padding: 18
    },

});

