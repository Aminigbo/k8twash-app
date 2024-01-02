import {
    StyleSheet,
    StatusBar,
    View,
    Alert,
    Image
} from 'react-native';
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../../utilities/theme';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Button, SelectButton } from '../../global-components.js/buttons';
import { BoldText1, BoldText2, BoldText3 } from '../../global-components.js/texts';
import { NewInput } from '../../global-components.js/inputs';
import { connect } from 'react-redux';
import { AuthBackIcon } from '../../utilities/icons';
// import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Schedules } from '../../redux';
import { CreateScheduleController } from '../account-controllers';
import { Center, HStack, VStack, Stack, Box, Pressable, Actionsheet, useDisclose, Text, Input } from 'native-base';

// import RNPaystack from 'react-native-paystack'; 

const Colors = Color()


function UpdateVehicle({ navigation, disp_schedules, appState }) {
    const User = appState.User;
    const [drawerComponent, setDrawerComponent] = useState("")
    const [date, setDate] = useState(new Date());
    const [plateNumber, setPlateNumber] = useState("")
    const [loading, setLoading] = useState(false)
    const [PickedImage, setPickedImage] = React.useState({
        status: false
    })
    const [ScheduleDataState, setScheduleDataState] = useState({
        VehicleType: null,
        color: null,
        subscriptionPlans: null
    })

    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();

    useEffect(() => {
    }, [])

    const STYLES = ['default', 'dark-content', 'light-content'];
    const TRANSITIONS = ['fade', 'slide', 'none'];
    const [hidden, setHidden] = useState(false);
    const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
    const [statusBarTransition, setStatusBarTransition] = useState(
        TRANSITIONS[0],
    );





    const ScheduleData = {
        vehicleTypes: [
            "Truck", "Van", "Bus", "Taxi", "Normal car"
        ],
        colors: [
            {
                name: "Red",
                color: "red",
                textColor: "white"
            }, {
                name: "Green",
                color: "green",
                textColor: "white"
            }, {
                name: "Black",
                color: "black",
                textColor: "white"
            }, {
                name: "Blue",
                color: "blue",
                textColor: "white"
            }, {
                name: "Pink",
                color: "pink",
                textColor: "black"
            }, {
                name: "Purple",
                color: "purple",
                textColor: "white"
            },
            {
                name: "White",
                color: "white",
                textColor: "blak"
            },
            {
                name: "Gray",
                color: "grey",
                textColor: "black"
            },
            {
                name: "Yellow",
                color: "yellow",
                textColor: "blak"
            },
            {
                name: "Orange",
                color: "orange",
                textColor: "blak"
            },
            {
                name: "Teal",
                color: "teal",
                textColor: "white"
            },
            {
                name: "Platinum",
                color: "platinum",
                textColor: "black"
            },

        ],
        subscriptionPlans: [
            {
                duration: "Daily",
                amount: 50
            },
            {
                duration: "Weekly",
                amount: 100
            },
            {
                duration: "Monthly",
                amount: 200
            },
            {
                duration: "Three months",
                amount: 600
            },
            {
                duration: "Six months",
                amount: 1200
            }
        ]
    }

    function ReturnButton() {
        if (!ScheduleDataState.color || !ScheduleDataState.VehicleType || !ScheduleDataState.subscriptionPlans || !plateNumber || plateNumber.length < 5) {
            return (<>
                <Button
                    callBack={() => {
                    }}
                    text="Schedule"
                    primary
                    width="90%"
                    TextColor={Colors.white}
                    style={{
                        opacity: 0.5
                    }}
                />
            </>)
        } else {
            return <Button
                loading={loading}
                callBack={() => {
                    setLoading(true)
                    let Data = {
                        ...ScheduleDataState,
                        plateNumber,
                        setLoading,
                        Alert,
                        uuid: User.uuid,
                        navigation,
                        User

                    }
                    CreateScheduleController(Data)
                    // StateSchedule.push(Data)
                    // disp_schedules(StateSchedule)
                    // setTimeout(() => {
                    //     setLoading(false)
                    //     navigation.pop()
                    // }, 2000);
                }}
                text="Schedule"
                primary
                width="90%"
                TextColor={Colors.white}
            />

        }

    }

    const SelectPhoto = (prop) => {
        const options = {
            storageOptions: {
                path: "images",
                mediaType: "photo"
            },
            includeBase64: true,
            quality: 0.7
        }
        launchImageLibrary(options, response => {
            // console.log("ResponseXX", response.assets.id)

            if (response.didCancel) {

            } else if (response.error) {

            } else if (response.customButton) {
                console.log(response.customButton)
            } else {
                const source = {
                    uri: response.assets[0].uri
                }


                const fileExt = response.assets[0].uri.substring(response.assets[0].uri.lastIndexOf(".") + 1);
                const fileName = `${Math.random()}.${fileExt}`;
                var formData = new FormData();
                formData.append("files", {
                    uri: response.assets[0].uri,
                    name: fileName,
                    type: `image/${fileExt}`
                })

                console.log(formData)
                setPickedImage({
                    source,
                    fileName,
                    formData,
                    height: response.assets[0].height,
                    width: response.assets[0].width,
                    status: true,
                    type: prop
                })

            }
        })
    }


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
                    <Stack style={{ padding: 15 }} >
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
                                text="Schedule a wash"
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
                            <SelectButton
                                callBack={() => {
                                    setDrawerComponent("VEHICLE TYPE")
                                    // onPress={onOpen}
                                    onOpen()
                                }}
                                text={ScheduleDataState.VehicleType == null ? "Select Vehicle type" : ScheduleDataState.VehicleType}
                                TextColor="grey"
                                label="Vehicle type"
                                style={{
                                    backgroundColor: Colors.secondary,
                                    alignItems: "flex-start",
                                    paddingLeft: 10,
                                    fontSize: 10,
                                    marginBottom: 20
                                }} />
                            <SelectButton
                                callBack={() => {
                                    setDrawerComponent("VEHICLE COLOR")
                                    onOpen()
                                }}
                                label="Color"
                                text={ScheduleDataState.color == null ? "Select Vehicle color" : ScheduleDataState.color}
                                TextColor="grey"
                                style={{
                                    backgroundColor: Colors.secondary,
                                    alignItems: "flex-start",
                                    paddingLeft: 10,
                                    fontSize: 10,
                                    marginBottom: 20
                                }} />
                            <NewInput
                                data={plateNumber}
                                setData={setPlateNumber}
                                type=""
                                placeholder="Enter plate number"
                                label="Plate number"
                                background={Colors.secondary}
                            />

                            <SelectButton
                                callBack={() => {
                                    setDrawerComponent("SUBSCRIPTION PLAN")
                                    onOpen()
                                }}
                                label="Subscription plan"
                                text={ScheduleDataState.subscriptionPlans == null ? "Select Subscription plan" : ScheduleDataState.subscriptionPlans.duration}
                                TextColor="grey"
                                style={{
                                    backgroundColor: Colors.secondary,
                                    alignItems: "flex-start",
                                    paddingLeft: 10,
                                    fontSize: 10,
                                    marginBottom: 20
                                }} />


                        </View>

                        {/* add means of identification */}
                        <Pressable
                            onPress={() => {
                                // console.log("Good") 
                                SelectPhoto("CAR PHOTO")
                            }}
                            bg={Colors.secondary} w={334} p={5} mt={25}
                            style={{ borderRadius: 10, justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                            <Center>

                                {PickedImage.status == true ? <>
                                    <BoldText3 text="Change photo" color="grey" />
                                </> :
                                    <>
                                        <BoldText2 text="Add a photo of your car" color="grey" />
                                    </>
                                }

                            </Center>
                        </Pressable>

                        {PickedImage.status == true &&
                            <>
                                <Image
                                    style={[styles.imageBackground, {
                                        width: "100%", 
                                        // height: 100,
                                        aspectRatio: 1,
                                        // marginTop: 20,
                                        borderRadius: 4,
                                    }]}
                                    source={PickedImage.source}
                                // resizeMode={'contain'} 
                                />
                            </>
                        }



                        <View style={{
                            flex: 1,
                            // backgroundColor:"red",
                            marginTop: 50
                        }}>
                            <ReturnButton />
                        </View>

                    </Stack>
                </ScrollView>
            </SafeAreaView>

            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content >
                    <ScrollView style={{
                        // backgroundColor:"yellow",
                        width: "100%"
                    }} >

                        <Stack >

                            {/* Vehicle type */}
                            {drawerComponent == "VEHICLE TYPE" && <>
                                <View style={{
                                    alignItems: "center"
                                }} >
                                    <BoldText1
                                        color={Colors.dark}
                                        text="Select your vehicle type" />
                                </View>

                                <ScrollView>
                                    <View style={{
                                        padding: 15
                                    }} >
                                        {
                                            ScheduleData.vehicleTypes.map((e, index) => {
                                                return (<>
                                                    {/* <SelectButton
                                                key={index}
                                                noIcon
                                                callBack={() => {
                                                    handleSnapPress(0)
                                                    setScheduleDataState({
                                                        ...ScheduleDataState,
                                                        VehicleType: e
                                                    })
                                                }}
                                                text={e}
                                                TextColor="grey"
                                                style={{
                                                    backgroundColor: Colors.secondary,
                                                    alignItems: "flex-start",
                                                    paddingLeft: 15,
                                                    fontSize: 10,
                                                    marginBottom: 20,
                                                    // borderBottomWidth:1,
                                                    borderRadius: 0,
                                                    elevation: 1
                                                }} /> */}
                                                    <Actionsheet.Item
                                                        style={{
                                                            marginBottom: 10,
                                                            borderBottomColor: "lightgrey",
                                                            borderBottomWidth: 1
                                                            // flex: 1,
                                                            // display:"flex"
                                                        }}
                                                        onPress={() => {
                                                            onClose()
                                                            setScheduleDataState({
                                                                ...ScheduleDataState,
                                                                VehicleType: e
                                                            })

                                                        }} >
                                                        <HStack style={{
                                                            justifyContent: "center",
                                                            alignItems: "center"
                                                        }} >
                                                            <View style={{
                                                                borderColor: e.color == "white" ? "red" : e.color,
                                                                borderWidth: 1,
                                                                height: 20, width: 20, backgroundColor: e.color,
                                                                borderRadius: 10
                                                            }} />
                                                            <Text style={{ marginLeft: 30 }} > {e}</Text>
                                                        </HStack>

                                                    </Actionsheet.Item>

                                                </>)
                                            })
                                        }
                                    </View>
                                </ScrollView>
                            </>}


                            {/* Vehicle color */}
                            {drawerComponent == "VEHICLE COLOR" && <>
                                <View style={{
                                    alignItems: "center"
                                }} >
                                    <BoldText1
                                        color={Colors.dark}
                                        text="Select your vehicle color" />
                                </View>

                                {
                                    ScheduleData.colors.map((e, index) => {
                                        return (<>

                                            <Actionsheet.Item
                                                style={{
                                                    marginBottom: 10,
                                                    borderBottomColor: "lightgrey",
                                                    borderBottomWidth: 1
                                                    // flex: 1,
                                                    // display:"flex"
                                                }}
                                                onPress={() => {
                                                    onClose()
                                                    setScheduleDataState({
                                                        ...ScheduleDataState,
                                                        color: e.name
                                                    })

                                                }} >
                                                <HStack style={{
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }} >
                                                    <View style={{
                                                        borderColor: e.color == "white" ? "red" : e.color,
                                                        borderWidth: 1,
                                                        height: 20, width: 30, backgroundColor: e.color,
                                                    }} />
                                                    <Text style={{ marginLeft: 30 }} > {e.name}</Text>
                                                </HStack>
                                            </Actionsheet.Item>
                                        </>)
                                    })
                                }
                            </>}


                            {/* Vehicle type */}
                            {drawerComponent == "SUBSCRIPTION PLAN" && <>
                                <View style={{
                                    alignItems: "center"
                                }} >
                                    <BoldText1
                                        color={Colors.dark}
                                        text="Select a subscription plan" />
                                </View>
                                {
                                    ScheduleData.subscriptionPlans.map((e, index) => {
                                        return (<>
                                            <Actionsheet.Item onPress={() => {
                                                onClose()
                                                setScheduleDataState({
                                                    ...ScheduleDataState,
                                                    subscriptionPlans: e
                                                })

                                            }} >
                                                <HStack style={{
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }} >
                                                    <View style={{
                                                        borderColor: e.color == "white" ? "red" : e.color,
                                                        borderWidth: 1,
                                                        height: 20, width: 20, backgroundColor: e.color,
                                                        borderRadius: 12
                                                    }} />
                                                    <Text style={{ marginLeft: 30 }} > {e.duration}</Text>
                                                </HStack>

                                            </Actionsheet.Item>
                                        </>)
                                    })
                                }
                            </>}
                        </Stack>


                    </ScrollView>



                </Actionsheet.Content>
            </Actionsheet>

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


export default connect(mapStateToProps, mapDispatchToProps)(UpdateVehicle);



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
        // padding: 20
    },

});

