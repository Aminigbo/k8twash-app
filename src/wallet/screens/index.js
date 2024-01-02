import {
    StyleSheet,
    StatusBar,
    View,
    ActivityIndicator
} from 'react-native';
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { fetchFcmToken } from '../../utilities/fcntoken';
import { Color } from '../../utilities/theme';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { BoldText1, BoldText2, BoldText3 } from '../../global-components.js/texts';
import { FundWalletCard } from '../components/fund-wallet-card';
import { TransactionsCard } from '../components/transactionCard';
import { AuthSuccessIcon, CreditCardIcon, DebitIcon, PaypalIcon, UserIcon } from '../../utilities/icons';
import { CardInput } from '../components/paypal-card-input';
import { Button } from '../../global-components.js/buttons';
import { BottomNav } from '../../global-components.js/bottom-navigation';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
// import RNPaystack from 'react-native-paystack'; 
import { Paystack } from "react-native-paystack-webview";
import Toast from "react-native-root-toast";
import { AddWalletService, GetTransactionHistoryService } from '../../services/payment-service';
import { User } from '../../redux';

const Colors = Color()


function SignIn({ appState, navigation, disp_user }) {
    const [amount, setAmount] = useState("")
    const [transactionHistory, setTransactionHistory] = useState(null)
    const [drawerState, setdrawerState] = useState(0)
    const [loading, setLoading] = useState(false)
    const [Cardpayment, setCardpayment] = useState(false)
    const [PaymentSuccess, setPaymentSuccess] = useState(false)
    const User = appState.User
    const [ToPay, setToPay] = useState(false)

    function Fetch() {
        setLoading(true)
        GetTransactionHistoryService(User.uuid)
            .then(response => {
                console.log("Responseeeee", response.data)
                if (response.data.success == true) {
                    let Data = response.data.data;
                    let Wallet = response.data.wallet;
                    disp_user({ ...User, wallet: Wallet })
                    setTransactionHistory(Data)
                } else {
                    setTransactionHistory([])
                }
                setLoading(false)
            })
    }
    useEffect(() => {
        const Rerender = navigation.addListener('focus', async () => {
            Fetch()
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

    // bottomSheetRef ref
    const bottomSheetRef = useRef(null);

    // bottom drawer  snapPoints variables
    const snapPoints = useMemo(() => ['1%', '35%', '45%', '55%'], []);

    // callbacks when the drawer is closed or open
    const handleSheetChanges = useCallback((index) => {
        console.log("closing", index)
        setdrawerState(index)
    }, []);

    // show the overlay from the bottom drawer
    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={0}
                appearsOnIndex={1}
            />
        ),
        []
    );

    // control bottom drawer hide and show
    const handleSnapPress = useCallback((index) => {
        setdrawerState(index)

        bottomSheetRef.current?.snapToIndex(index);
    }, []);

    return (

        <>
            {ToPay && (
                <View style={{ flex: 1 }}>
                    <Paystack
                        paystackKey="pk_live_02468d2800841051e35f9c137c63443e43481650"
                        currency = "GHS"

                        // paystackKey="pk_test_1b580eadea7c76d12313e1cc057923cfb1d8adbe"
                        // currency="NGN"

                        amount={amount}
                        billingEmail={User.email}
                        billingMobile={+2349011684637}
                        activityIndicatorColor="green"
                        onCancel={(e) => {
                            // handle response here
                            // Toast.show("Transaction Cancelled!!", {
                            //     duration: Toast.durations.LONG,
                            // });
                            // setToPay(false)
                            // setLoading(false)
                        }}
                        onSuccess={(response) => {
                            // handle response here

                            const responseObject = response["transactionRef"]["message"];
                            if (responseObject === "Approved") {
                                setLoading(true)
                                AddWalletService({
                                    uuid: User.uuid,
                                    payref: response,
                                    amount
                                })
                                    .then(response => {
                                        Fetch()
                                        // disp_user(response.data.data)
                                        handleSnapPress(3)
                                        setLoading(false)
                                        console.log(response)
                                    })
                            } else {
                                Alert.alert("Error", "There was an error while funding your wallet.")
                            }
                            setToPay(false)

                        }}
                        autoStart={ToPay}
                    />
                </View>
            )}



            {/* Bottom nav */}
            {drawerState != 1 && <BottomNav page="Wallet" navigation={navigation} />}

            {/* <View style={{
                // marginTop: 90,
                backgroundColor:"black",
                flex:1,
                justifyContent:"center",
                zIndex:2000,
                opacity:0.9
            }} >
                <ActivityIndicator color={Colors.primary} />
            </View> */}
            {console.log(User)}
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
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 35
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
                                <BoldText2 text="Hello"
                                    color={Colors.dark}
                                />
                                <BoldText3
                                    style={{
                                        marginTop: -10
                                    }}
                                    text="Paul Joker"
                                    // text={User.name}
                                    color={Colors.dark}

                                />
                            </TouchableOpacity>


                        </View>

                    </View>
                    <FundWalletCard
                        User={User}
                        loading={loading}
                        ActivityIndicator
                        // <ActivityIndicator color={Colors.primary} />
                        buttonCallBack={() => {
                            setCardpayment(true)
                            setPaymentSuccess(false)
                            setTimeout(() => {
                                handleSnapPress(1)
                            }, 300);
                        }} />
                    {console.log(transactionHistory)}
                    {transactionHistory && transactionHistory.length > 0 && <>
                        <View style={{
                            marginVertical: 30
                        }} >
                            <BoldText1
                                color={Colors.dark}
                                text="Recent transactions" />
                        </View>
                    </>}



                    <View>
                        {transactionHistory && transactionHistory.map((e, index) => {
                            return (<>
                                <TransactionsCard key={index} data={e} credit />
                            </>)
                        })}
                        {/* <TransactionsCard />
                        <TransactionsCard credit />
                        <TransactionsCard /> */}
                    </View>

                    {transactionHistory && transactionHistory.length > 6 && <>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            marginBottom: 35
                        }}>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                // backgroundColor: "red",
                                flex: 1,
                                marginLeft: 10
                            }}>
                                <TouchableOpacity>
                                    <BoldText2 text="See all history"
                                        color={Colors.dark}
                                    />
                                </TouchableOpacity>


                            </View>

                        </View>
                    </>}


                </ScrollView>
            </SafeAreaView>

            <BottomSheet
                enablePanDownToClose={false}
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                onChange={handleSheetChanges}
            >

                {Cardpayment == false && <>
                    <View style={{
                        alignItems: "center",
                        paddingVertical: 20
                    }} >
                        <BoldText2
                            text="Payment methods"
                            color={Colors.dark}
                        />
                        <BoldText1
                            style={{
                                marginTop: -10,
                            }}
                            text="Choose a payment method"
                            color={Colors.dark}
                        />

                        <TouchableOpacity
                            onPress={() => {
                                // handleSnapPress(0)
                                setCardpayment(true)
                                setTimeout(() => {
                                    handleSnapPress(1)
                                }, 300);
                            }}
                            style={{
                                marginBottom: 20,
                                marginTop: 20
                            }} >
                            <CreditCardIcon />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                // handleSnapPress(1)
                                setToPay(true)
                                setLoading(true)
                            }}
                            style={{
                                marginBottom: 10
                            }} >
                            <PaypalIcon />
                        </TouchableOpacity>
                    </View>
                </>}

                {Cardpayment == true && <>
                    <View style={{
                        alignItems: "center",
                        paddingVertical: 20,
                    }} >
                        <BoldText2
                            // text="Credit card"
                            text="Fund wallet"
                            color={Colors.dark}
                        />
                        <BoldText1
                            style={{
                                marginTop: -10,
                            }}
                            text="Enter amount to top-up"
                            color={Colors.dark}
                        />

                    </View>
                    <CardInput
                        amount={amount}
                        setAmount={setAmount}
                        proceedCallback={() => {
                            setCardpayment(null)
                            setPaymentSuccess(true)
                            handleSnapPress(0)

                            // setTimeout(() => {
                            //     handleSnapPress(3)
                            // }, 300);
                            setToPay(true)
                        }}
                        CancelCallBack={() => {
                            setCardpayment(false)
                            handleSnapPress(1)
                        }}
                    />
                </>}

                {PaymentSuccess == true && <>
                    <View style={{
                        alignItems: "center",
                        marginTop: 60,
                        justifyContent: "center",
                        // flex: 1
                    }}>
                        <AuthSuccessIcon />
                        <View style={{
                            alignItems: "center",
                            paddingVertical: 20,
                        }} >
                            <BoldText2
                                text="Payment Successful!"
                                color={Colors.dark}
                            />
                            <BoldText1
                                style={{

                                }}
                                text="Your subscription has been paid for with ease"
                                color={Colors.dark}
                            />


                        </View>
                    </View>
                    <Button
                        callBack={() => {
                            setCardpayment(null)
                            setPaymentSuccess(false)
                            handleSnapPress(0)
                        }}
                        text="Okay"
                        TextColor={Colors.white}
                        primary
                        style={{
                            width: "90%",
                            marginLeft: "5%"
                        }}
                    />
                </>}



            </BottomSheet> 

            <BottomNav navigation={navigation} page="Wallet" />

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
        padding: 20
    },

});

