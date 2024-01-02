import {
    StyleSheet,
    StatusBar,
    View,
    Text
} from 'react-native';
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { Color } from '../../utilities/theme';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { BottomNav } from '../../global-components.js/bottom-navigation';
import { BoldText2, BoldText3, BoldText4 } from '../../global-components.js/texts';
import { Avater, LogoutIcon, ProfileEdit, RatingIcon, ReferralIcon, SubMgtIcon, TrackingIcon, UpdateVehiceIcon } from '../components/icons';
import { User } from '../../redux';
// import RNPaystack from 'react-native-paystack'; 

const Colors = Color()


function SignIn({ appState, navigation, disp_user }) {
const User = appState.User

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
            <View style={{
                alignItems: "flex-end",
                // flex: 1,
                // backgroundColor: "red",
                width: "100%",
                position: "absolute",
                top: 15,
                zIndex: 1000

            }} >
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Update Vehicle")
                    }}
                    style={{
                        // backgroundColor: "green",
                        padding: 15
                    }} >
                    <ProfileEdit />
                </TouchableOpacity>
            </View>
            {/* Bottom nav */}
            <BottomNav page="Account" navigation={navigation} />
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
                        alignItems: "center",
                        marginVertical: 20,
                    }} >


                        <View style={{
                            height: 100,
                            width: 100,
                            borderRadius: 40,
                            backgroundColor: Colors.primaryDark,
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                            marginTop: 40
                        }} >

                            <BoldText4 text={User && User.name.split(" ")[0][0]}
                                color={Colors.primary}
                            />
                            <BoldText4 text={` ${User && User.name.split(" ")[1][0]}`}
                                color={Colors.primary}
                            />
                        </View>
                        <BoldText2 text={User && User.name}
                            color={Colors.primary}
                            style={{
                                marginTop: 10
                            }}
                        />

                    </View>
                    <View style={{
                        marginBottom: 90,
                        marginTop: 40,
                    }} >
                        {/* <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Manage Subscription")
                            }}
                            style={{
                                marginVertical: 10
                            }} >
                            <SubMgtIcon />

                        </TouchableOpacity> */}

                        <TouchableOpacity onPress={() => {
                            navigation.navigate("Update Vehicle")
                        }} style={{
                            marginVertical: 10
                        }} >
                            <UpdateVehiceIcon />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            navigation.navigate("Referal")
                        }} style={{
                            marginVertical: 10
                        }} >
                            <ReferralIcon />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            navigation.navigate("PostReview")
                        }} style={{
                            marginVertical: 10
                        }} >
                            <RatingIcon />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            navigation.navigate("AllSchedules")
                        }} style={{
                            marginVertical: 10
                        }} >
                            <TrackingIcon />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            navigation.replace("Auth", { screen: "signin" })
                            disp_user(null)
                        }} style={{
                            marginVertical: 10
                        }} >
                            <LogoutIcon />
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
        // padding: 20
    },

});

