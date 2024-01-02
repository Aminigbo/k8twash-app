import {
    StyleSheet,
    StatusBar, ToastAndroid,
    View, Text, ActivityIndicator
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
import { BookedIcon, CircleIcon, CompletedIcon, ConfirmedIcon, ProcessedIcon, ReadyIcon, ScheduleText, TrackingText, UnderLineIcon } from '../components/icons';
import { ScheduleCard } from '../../home/components/scheduleCards';
import { GetingleSchedules } from '../../services/schedule-services';

// import RNPaystack from 'react-native-paystack'; 

const Colors = Color()


function TrackingScreen({ navigation, route }) {

    const [date, setDate] = useState(new Date());
    const [page, setpage] = useState("")
    const [loading, setLoading] = useState(false)
    const [Schedule, setSchedule] = useState(null)



    useEffect(() => {
        const Rerender = navigation.addListener('focus', async () => {
            console.log(route)
            GetingleSchedules({
                id: route.params.id,
                uuid: route.params.uuid
            })
                .then(response => {
                    if (response.success == true) {
                        console.log(response.data)
                        setSchedule(response.data)
                    } else {
                        ToastAndroid.show('', ToastAndroid.SHORT);
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        });
        return Rerender;
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
                        alignItems: "center",
                        flexDirection: "row",
                        padding: 20,
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
                            text="Track progress"
                            color={Colors.dark}
                            style={{
                                marginLeft: 60,
                                marginTop: 10
                            }}
                        />
                    </View>

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10,
                        padding: 20
                    }} >
                        {/* <View>
                            <TouchableOpacity onPress={() => {
                                setpage("SCHEDULE")
                            }} >
                                <BoldText3
                                    text="Appointment"
                                    color={Colors.dark}
                                />
                                {page == "SCHEDULE" && <UnderLineIcon.large />}
                            </TouchableOpacity>
                        </View> */}

                        <View>
                            <TouchableOpacity onPress={() => {
                                setpage("TRACKING")
                            }} >

                                <BoldText3
                                    text="Tracking"
                                    color={Colors.dark}
                                />
                                <UnderLineIcon.small />

                            </TouchableOpacity>
                        </View>

                    </View>


                    <View style={{
                        // marginTop: 40,
                        padding: 20
                    }} >


                        {!Schedule ? <>
                            <View style={{
                                marginTop: 90
                            }} >
                                <ActivityIndicator color={Colors.primary} />
                            </View>
                        </> :

                            <>
                                <View style={{
                                    marginTop: 10
                                }} >
                                    <SelectButton
                                        text={`Oder#: ${Schedule.created_at.slice(-14)}`}
                                        TextColor="grey"
                                        noIcon
                                        style={{
                                            backgroundColor: Colors.secondary,
                                            alignItems: "flex-start",
                                            paddingLeft: 10,
                                            fontSize: 10,
                                            marginBottom: 20
                                        }} />


                                    <SelectButton
                                        text={`Plate number: ${Schedule.data.plateNumber}`}
                                        TextColor="grey"
                                        noIcon
                                        style={{
                                            backgroundColor: Colors.secondary,
                                            alignItems: "flex-start",
                                            paddingLeft: 10,
                                            fontSize: 10,
                                            marginBottom: 20
                                        }} />
                                </View>

                                <View style={{
                                    flexDirection: "row",
                                    flex: 1,
                                    width: "100%",
                                    marginTop: 40,
                                    marginBottom: 40,
                                }} >
                                    <View style={{
                                        // height: 100,
                                        // backgroundColor: "green",
                                        padding: 5,
                                        alignItems: "center",
                                        // width: 50
                                        // flex:1
                                    }} >
                                        <View style={{
                                            height: 100,
                                            backgroundColor: Schedule.tracking.booked == true ? "#FBA370" : "grey",
                                            width: 2,
                                            alignItems: "center",
                                            justifyContent: "space-between"
                                            // flex:1
                                        }}>
                                            <CircleIcon color={Schedule.tracking.booked == true ? "#FBA370" : "grey"} />
                                            <CircleIcon color={Schedule.tracking.confirmed == true ? "#FBA370" : "grey"} />
                                        </View>
                                        <View style={{
                                            height: 100,
                                            backgroundColor: Schedule.tracking.confirmed == true ? "#FBA370" : "grey",
                                            width: 2,
                                            alignItems: "center",
                                            justifyContent: "flex-end"
                                            // flex:1
                                        }}>
                                            <CircleIcon color={Schedule.tracking.processed == true ? "#1EAC81" : "grey"} />
                                        </View>
                                        <View style={{
                                            height: 100,
                                            backgroundColor: Schedule.tracking.processed == true ? "#1EAC81" : "grey",
                                            width: 2,
                                            alignItems: "center",
                                            justifyContent: "flex-end"
                                            // flex:1
                                        }} >
                                            <CircleIcon color={Schedule.tracking.completed == true ? "#1EAC81" : "grey"} />

                                        </View>
                                        <View style={{
                                            height: 100,
                                            backgroundColor: Schedule.tracking.completed == true ? "#1EAC81" : "grey",
                                            width: 2,
                                            alignItems: "center",
                                            justifyContent: "flex-end"
                                            // flex:1
                                        }}>
                                            <CircleIcon color={Schedule.tracking.ready == true ? "mediumseagreen" : "grey"} />
                                        </View>

                                    </View>


                                    <View style={{
                                        width: "90%",
                                        // backgroundColor: "red",
                                        // flex: 1,
                                        marginLeft: 20,
                                        // paddingRight:30
                                    }} >

                                        <View style={{
                                            height: 80,
                                            width: "85%",
                                            // backgroundColor: "brown",
                                            // flex: 1,
                                            marginLeft: 20,
                                            flexDirection: "row"
                                        }}>
                                            <BookedIcon
                                                fill={Schedule.tracking.booked == true ? "#FBA370" : "#00000059"}
                                            />
                                            <View style={{
                                                marginLeft: 15,
                                            }}>
                                                <BoldText2
                                                    text="Appointment booked"
                                                    color={Colors.dark}
                                                />
                                                <BoldText1
                                                    style={{
                                                        marginTop: -10
                                                    }}
                                                    text="We have received your appointment booking on 20/08/2023"
                                                    color={Colors.dark}
                                                />
                                            </View>
                                        </View>

                                        <View style={{
                                            height: 100,
                                            width: "85%",
                                            // backgroundColor: "green",
                                            // flex: 1,
                                            marginLeft: 20,
                                            flexDirection: "row"
                                        }}>
                                            <ConfirmedIcon
                                                fill={Schedule.tracking.confirmed == true ? "#FBA370" : "#00000059"}
                                            />
                                            <View style={{ marginLeft: 15 }}>
                                                <BoldText2
                                                    text="Appointment confirmed"
                                                    color={Colors.dark}
                                                />
                                                <BoldText1
                                                    style={{
                                                        marginTop: -10
                                                    }}
                                                    text="We have confirmed your appointment booking on 20/08/2023"
                                                    color={Colors.dark}
                                                />
                                            </View>
                                        </View>

                                        <View style={{
                                            height: 100,
                                            width: "85%",
                                            // backgroundColor: "grey",
                                            // flex: 1,
                                            marginLeft: 20,
                                            flexDirection: "row"
                                        }}>
                                            <ProcessedIcon
                                                fill={Schedule.tracking.processed == true ? "#51E1B6" : "#00000059"} />
                                            <View style={{ marginLeft: 15 }}>
                                                <BoldText2
                                                    text="Appointment processed"
                                                    color={Schedule.tracking.processed == true ? "#51E1B6" : "#00000059"}
                                                />
                                                <BoldText1
                                                    style={{
                                                        marginTop: -10
                                                    }}
                                                    text="We have booked your appointment booking on 20/08/2023"
                                                    color={Schedule.tracking.processed == true ? "#51E1B6" : "#00000059"}
                                                />
                                            </View>
                                        </View>

                                        <View style={{
                                            height: 100,
                                            width: "85%",
                                            // backgroundColor: "gold",
                                            // flex: 1,
                                            marginLeft: 20,
                                            flexDirection: "row"
                                        }}>
                                            <CompletedIcon
                                                fill={Schedule.tracking.completed == true ? "#51E1B6" : "#00000059"} />
                                            <View style={{ marginLeft: 15 }}>
                                                <BoldText2
                                                    text="Washing complete"
                                                    color={Schedule.tracking.completed == true ? "#51E1B6" : "#00000059"}
                                                />
                                                <BoldText1
                                                    style={{
                                                        marginTop: -10
                                                    }}
                                                    text="your vehicle has been washed and is ready for delivery"
                                                    color={Schedule.tracking.completed == true ? "#51E1B6" : "#00000059"}
                                                />
                                            </View>
                                        </View>

                                        <View style={{
                                            // height: 100,
                                            // backgroundColor: "black",
                                            // flex: 1,
                                            marginLeft: 20,
                                            width: "85%",
                                            flexDirection: "row"
                                        }}>
                                            <ReadyIcon
                                                fill={Schedule.tracking.ready == true ? "mediumseagreen" : "#00000059"} />
                                            <View style={{ marginLeft: 15 }}>
                                                <BoldText2
                                                    text="Ready for pickup"
                                                    color={Schedule.tracking.ready == true ? "mediumseagreen" : "#00000059"}
                                                />
                                                <BoldText1
                                                    style={{
                                                        marginTop: -10
                                                    }}
                                                    text="your vehicle has been washed and is ready for delivery"
                                                    color={Schedule.tracking.ready == true ? "mediumseagreen" : "#00000059"}
                                                />
                                            </View>
                                        </View>


                                    </View>
                                </View>
                            </>

                        }



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


export default connect(mapStateToProps, mapDispatchToProps)(TrackingScreen);



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
        // padding: 20
    },

});

