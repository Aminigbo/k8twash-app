import {
    StyleSheet,
    StatusBar,
    View,
    Text,
    Alert
} from 'react-native';
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { Color } from '../../utilities/theme';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { BottomNav } from '../../global-components.js/bottom-navigation';
import { HistoryCardComponent } from '../components/history-card';
import { BoldText3 } from '../../global-components.js/texts';
// import RNPaystack from 'react-native-paystack'; 

const Colors = Color()


function SignIn({ appState, navigation }) {
    const Schedules = appState.Schedules;
    const [CompletedSchedulesState, setCompletedSchedulesState] = useState([])
    useEffect(() => {
        const Rerender = navigation.addListener('focus', async () => {
            let CompletedSchedules = Schedules.filter(e => e.status == "completed")
            console.log(CompletedSchedules)
            setCompletedSchedulesState(CompletedSchedules)
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

            {/* Bottom nav */}
            <BottomNav page="History" navigation={navigation} />
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
                        <BoldText3
                            color={Colors.dark}
                            text="My history" />
                    </View>


                    <View style={{
                        marginBottom: 70
                    }} >
                        {CompletedSchedulesState.map(e => {
                            return <HistoryCardComponent Alert={Alert} />
                        })}

                    </View>
                    {CompletedSchedulesState.length < 1 && <>
                        <View style={{alignItems: "center",}} >
                            <Text style={{
                                color: "grey"
                            }}>
                                You have no completed wash schedule
                            </Text>
                        </View>
                    </>}
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


export default connect(mapStateToProps, mapDispatchToProps)(SignIn);



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20
    },

});

