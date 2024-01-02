import { ActivityIndicator, SafeAreaView, StyleSheet, ToastAndroid, View } from "react-native";
import { connect } from "react-redux";
import { Color } from "../../utilities/theme";
import { Schedules } from "../../redux";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Stack } from "native-base";
import { AdBanner } from "../components/adBanner";
import { AddIcon, NotificationIcon, UserIcon } from "../../utilities/icons";
import { BoldText2 } from "../../global-components.js/texts";
import { BottomNav } from "../../global-components.js/bottom-navigation";
import React, { useState } from "react";
import { GetAllSchedules } from "../../services/schedule-services";
import { ScheduleCard } from "../components/scheduleCards";

const Colors = Color()


function HomeScreen({ navigation, appState, disp_schedules }) {
    const [loading, setLoading] = useState(false)
    const Schedules = appState.Schedules;
    const User = appState.User

    React.useEffect(() => {
        const Rerender = navigation.addListener('focus', async () => {
            setLoading(true)
            GetAllSchedules(User.uuid)
                .then(response => {
                    if (response.success == true) {
                        console.log(response.data)
                        disp_schedules(response.data)
                    } else {
                        ToastAndroid.show(response.message, ToastAndroid.SHORT);
                    }
                    setLoading(false)
                })
                .catch(error => {
                    console.log(error)
                })
        });
        return Rerender;
    }, [navigation])




    return User == null ? navigation.replace("Auth", { screen: "signin" }) : (
        // return (

        <>


            <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
                <ScrollView>

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 10,
                        padding: 20
                    }}>
                        <View style={{
                            flexDirection: "row",
                            // backgroundColor: "red",
                            flex: 1
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
                                <TouchableOpacity style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                                    onPress={() => { navigation.navigate("Account") }}
                                >
                                    <BoldText2 text="Hi"
                                        color={Colors.dark}
                                    />
                                    <BoldText2
                                        style={{
                                            // marginTop: -10
                                            marginLeft: 5
                                        }}
                                        text={User.name.split(" ")[0]}
                                        color={Colors.dark}

                                    />
                                </TouchableOpacity>


                            </View>

                        </View>

                        <View style={{
                            flexDirection: "row"
                        }} >
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Notification")
                                }}
                                style={{
                                    // backgroundColor: "red",
                                    padding: 10
                                }} >
                                <NotificationIcon />
                            </TouchableOpacity>

                        </View>

                    </View>


                    <Stack>
                        {/* <AdBanner /> */}
                    </Stack>


                    {loading ? <View style={{
                        marginTop: 90
                    }} >
                        <ActivityIndicator color={Colors.primary} />
                    </View> :
                        <>
                            {Schedules.length > 0 ? <>
                                <View style={{
                                    marginTop: 15,
                                    marginBottom: 100,
                                }} >
                                    {Schedules.map((e, index) => {
                                        return (<>
                                            <ScheduleCard key={index} data={e} navigation={navigation} />
                                        </>)
                                    })}
                                </View>
                            </> :

                                <View style={{
                                    // backgroundColor: "#000",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flex: 1,
                                    height:500
                                }} >
                                   <BoldText2 text="There is no wash schedule." color="#000" />
                                </View>
                            }
                        </>
                    }


                </ScrollView>

            </SafeAreaView>
            <BottomNav navigation={navigation} page="Home" />

            <View style={{
                backgroundColor: "#A8F0DA",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                bottom: 130,
                right: 20,
                zIndex: 2000,
                width: 50,
                height: 49,
                borderRadius: 10
            }} >
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Account", { screen: "Update Vehicle" })
                }} >
                    <AddIcon />
                </TouchableOpacity>
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
        disp_schedules: (payload) => dispatch(Schedules(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
        // padding: 20
    },

});

