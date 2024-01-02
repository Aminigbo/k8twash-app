import {
    StyleSheet,
    StatusBar,
    View,
    Alert
} from 'react-native';
import React, { useEffect, useState, } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../../utilities/theme';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Button, SelectButton } from '../../global-components.js/buttons';
import { BoldText1, BoldText2, BoldText3 } from '../../global-components.js/texts';
import { Input, NewInput } from '../../global-components.js/inputs';
import { connect } from 'react-redux';
import { AuthBackIcon, UserIcon } from '../../utilities/icons';
import { User } from '../../redux';

// import RNPaystack from 'react-native-paystack'; 

const Colors = Color()


function PostReview({ appState, navigation }) {
    const User = appState.User
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        // console.log(User)
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
                            text="Post a review"
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



                        <View style={{
                            // marginTop: 40
                            backgroundColor: Colors.secondary
                        }} >
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                // marginBottom: 35,
                                padding: 15
                            }}>
                                <View>
                                    <UserIcon />
                                </View>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    // backgroundColor: "red",
                                    flex: 1,
                                    marginLeft: 10
                                }}>
                                    <TouchableOpacity>
                                        <BoldText3 text={User.name}
                                            color={Colors.dark}
                                        />
                                        <BoldText2
                                            style={{
                                                marginTop: -10
                                            }}
                                            text={User.city + " " + User.country}
                                            color={Colors.dark}

                                        />
                                    </TouchableOpacity>


                                </View>

                            </View>

                            <Input
                                data={data}
                                setData={setData}
                                multiline={true}

                                placeholder='Write your review'
                            />
                        </View>

                        <View style={{
                            flex: 1,
                            // backgroundColor:"red",
                            marginTop: 40
                        }}>
                            <Button
                                loading={loading}
                                callBack={() => {
                                    if (data.length > 5) {
                                        setLoading(true)
                                        setTimeout(() => {
                                            Alert.alert("Success", "Your review have been submitted successfully", [
                                                {
                                                    text: "Ok", onPress: () => {
                                                        setLoading(false)
                                                        navigation.pop()
                                                    }
                                                }
                                            ])
                                        }, 1500);
                                    } else {
                                        Alert.alert("Error", "Provide a valid review.")
                                    }
                                }}
                                text="Send"
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


export default connect(mapStateToProps, mapDispatchToProps)(PostReview);



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20
    },

});

