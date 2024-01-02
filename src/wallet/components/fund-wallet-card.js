import { View, Text, ActivityIndicator } from "react-native"
import { Color } from "../../utilities/theme"
import { Button } from "../../global-components.js/buttons"
import { BoldText1, BoldText3 } from "../../global-components.js/texts"
import { NumberWithCommas } from "../../utilities"
const Colors = Color()
export function FundWalletCard({
    buttonCallBack,
    loading,
    User
}) {
    return (<>
        <View style={{
            backgroundColor: Colors.primaryDark,
            height: 190,
            width: "100%",
            borderRadius: 10,
            flex: 1,
            // alignItems:"center"
            justifyContent: "center"
        }} >
            <View style={{
                alignItems: "center"
            }} >
                <BoldText1
                    color={Colors.white}
                    text="Main balance" />
                {/* {console.log(User)} */}

                {loading ?
                    <ActivityIndicator /> :
                    <BoldText3
                        color="white"
                        text={User && User.wallet > 0 ? `₵${NumberWithCommas(User.wallet)}` : "GH₵0.00"} 
                        // text={`${NumberWithCommas("20000")}`}
                    />}
            </View>

            <Button
                text="Fund Wallet"
                TextColor="white"
                primary
                style={{
                    marginTop: 10,
                    width: "70%",
                    marginLeft: "15%"
                }}
                callBack={() => { buttonCallBack() }}
            />
            {/* {loading == true ?
                <>
                    <Button
                        text="Fund Wallet"
                        TextColor="white"
                        primary
                        loading
                        style={{
                            marginTop: 10,
                            width: "70%",
                            marginLeft: "15%"
                        }}
                        callBack={() => { buttonCallBack() }}
                    />
                </> :
                <>
                    <Button
                        text="Fund Wallet"
                        TextColor="white"
                        primary
                        style={{
                            marginTop: 10,
                            width: "70%",
                            marginLeft: "15%"
                        }}
                        callBack={() => { buttonCallBack() }}
                    />
                </>} */}

        </View>
    </>)
}