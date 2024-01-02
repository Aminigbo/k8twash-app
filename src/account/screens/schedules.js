import {
    StyleSheet,
    StatusBar,
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
import { GetAllSchedules, GetingleSchedules } from '../../services/schedule-services';

// import RNPaystack from 'react-native-paystack'; 

const Colors = Color()


function AllSchedules({ appState, navigation, route }) {
    const User = appState.User
    const [date, setDate] = useState(new Date());
    const [page, setpage] = useState("")
    const [loading, setLoading] = useState(false)
    const [Schedules, setSchedules] = useState(null)



    useEffect(() => {
        const Rerender = navigation.addListener('focus', async () => {
            setLoading(true)
            GetAllSchedules(User.uuid)
                .then(response => {
                    if (response.success == true) {
                        console.log(response.data)
                        setSchedules(response.data)
                    } else {
                        ToastAndroid.show('', ToastAndroid.SHORT);
                    }
                    setLoading(false)
                })
                .catch(error => {
                    setLoading(false)
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
                        <View>
                            <TouchableOpacity onPress={() => {
                                setpage("SCHEDULE")
                            }} >
                                <BoldText3
                                    text="Appointment"
                                    color={Colors.dark}
                                />
                                {/* {page == "SCHEDULE" && <UnderLineIcon.large />} */}
                                <UnderLineIcon.large />
                            </TouchableOpacity>
                        </View>

                        {/* <View>
                            <TouchableOpacity onPress={() => {
                                setpage("TRACKING")
                            }} >

                                <BoldText3
                                    text="Tracking"
                                    color={Colors.dark}
                                />
                                <UnderLineIcon.small />

                            </TouchableOpacity>
                        </View> */}

                    </View>


                    <View style={{
                        // marginTop: 40,
                        // padding: 20
                    }} >


                        {loading ? <View style={{
                            marginTop: 90
                        }} >
                            <ActivityIndicator color={Colors.primary} />
                        </View> :
                            <>
                                {Schedules && Schedules.length > 0 && <>
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
                                </>}
                            </>
                        }

                    </View>

                </ScrollView>
                {Schedules && Schedules.length < 1 && <>
                    <View style={{ flex: 1, alignItems: "center" }} >
                        <Text style={{
                            color: "grey"
                        }}>
                            You have no available schedule
                        </Text>
                    </View>
                </>}



            </SafeAreaView >
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


export default connect(mapStateToProps, mapDispatchToProps)(AllSchedules);



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
        // padding: 20
    },

});

