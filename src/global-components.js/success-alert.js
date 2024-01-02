import {
    StyleSheet,
    StatusBar,
    View, Modal
} from 'react-native';
import React, { useEffect, useState, } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { BoldText2, BoldText3 } from './texts';
import { AuthSuccessIcon } from '../utilities/icons';
import { Button } from './buttons';
import { Color } from '../utilities/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import RNPaystack from 'react-native-paystack'; 

const Colors = Color()


function SuccessAlert({ navigation }) {

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

                <View style={{
                    flex:1
                }} >
                    <View style={{
                        justifyContent: "center",
                        flex: 1,
                        alignItems: "center"
                    }} >
                        <AuthSuccessIcon />

                        <View
                            style={{
                                // justifyContent: "center",
                                alignItems: "center",
                                marginTop: 20,
                                width: "100%"
                            }} >

                            <BoldText3
                                color={Colors.primary}
                                text="Congratulations" />
                            <BoldText2
                                text="your account has been created successfully"
                                color={Colors.dark}
                            />

                        </View>
                    </View>
                    <TouchableOpacity style={{
                        // alignItems: "center",
                        marginTop: 25,
                        width: "90%",
                        // backgroundColor:"red",
                        marginHorizontal: "5%",
                        marginVertical: 30
                    }} >
                        <Button
                            text="Get started"
                            primary
                            width="90%"
                            TextColor={Colors.white}
                            callBack={() => {
                                // setModalVisible(true)
                                navigation.navigate("Home") 
                            }}
                        />
                    </TouchableOpacity>
                </View>

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


export default connect(mapStateToProps, mapDispatchToProps)(SuccessAlert);



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20
    },

});

