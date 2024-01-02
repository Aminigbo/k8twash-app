import {
    StyleSheet,
    StatusBar,
    View,
    ActivityIndicator,
    Text
} from 'react-native';
import React, { useEffect, useState, } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../../utilities/theme';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Button, SelectButton } from '../../global-components.js/buttons';
import { BoldText2, BoldText3 } from '../../global-components.js/texts';
import { NewInput } from '../../global-components.js/inputs';
import { connect } from 'react-redux';
import { AuthBackIcon } from '../../utilities/icons';
import { NotificationCard } from '../components/notificationCard';
import { GetNotificationsService } from '../../services/notification-service';
import { Divider } from 'react-native-paper';

// import RNPaystack from 'react-native-paystack'; 

const Colors = Color()


function ManageSub({ appState, navigation }) {
    const User = appState.User;
    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log("Hello")
        const Rerender = navigation.addListener('focus', async () => {
            GetNotificationsService({
                user: User.uuid,
                state: setData,
                setLoading
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
                        // backgroundColor:"red"
                    }} >
                        <TouchableOpacity
                            onPress={() => {
                                navigation.pop()
                            }}
                            style={{
                                // backgroundColor:"red",
                                padding: 10
                            }}>
                            <AuthBackIcon />
                        </TouchableOpacity>
                        <BoldText3
                            text="Notification"
                            color={Colors.dark}
                            style={{
                                marginLeft: 30,
                                marginTop: 10
                            }}
                        />
                    </View>

                    <View style={{
                        marginTop: 40
                    }} >
                        {loading == true ? <>
                            <View style={{
                                marginTop: 90
                            }} >
                                <ActivityIndicator color={Colors.primary} />
                            </View>
                        </> : <>
                            {data && <>
                                <View>
                                    {data && data.length > 0 && <>
                                        <BoldText3
                                            color={Colors.primary}
                                            text="New"
                                            style={{ marginLeft: 15 }}
                                        />
                                    </>}

                                    {
                                        data.map((e, index) => {
                                            return (<>
                                                <NotificationCard
                                                    data={e}
                                                    key={index} />
                                                <Divider style={{ marginVertical: 10 }} />
                                            </>)
                                        })
                                    }
                                </View>
                            </>}

                        </>}

                    </View>
                </ScrollView>
                {data && data.length < 1 && <>
                    <View style={{ flex: 1, alignItems: "center" }} >
                        <Text style={{
                            color: "grey"
                        }}>
                            You have no available notification
                        </Text>
                    </View>
                </>}
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


export default connect(mapStateToProps, mapDispatchToProps)(ManageSub);



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
        // padding: 20
    },

});

