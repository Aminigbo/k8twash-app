import { View, Text } from "react-native"
import { Color } from "../utilities/theme"
import { AccountIcon, HistoryIcon, HomeIcon, WalletIcons } from "../utilities/bottomNavIcons"
import { TouchableOpacity } from "react-native-gesture-handler"
import { BoldText1 } from "./texts"
const Colors = Color()
export function BottomNav({
    page, navigation
}) {
    return (<>
        <View style={{
            height: 55,
            backgroundColor: Colors.primary,
            position: "absolute",
            bottom: 30,
            zIndex: 1,
            width: "90%",
            marginLeft: "5%",
            borderRadius: 10,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: 10,
            // display:"none"
        }}>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Home")
                }}
            >
                {page == "Home" ?
                    <>
                        <View style={{
                            backgroundColor: Colors.white,
                            top: -15,
                            zIndex: 2000,
                            padding: 14,
                            borderRadius: 100
                        }} >
                            <HomeIcon primary />
                        </View>
                        <BoldText1
                            style={{ top: -10 }}
                            text={page}
                            color="white" />
                    </>
                    :

                    <View style={{
                        // backgroundColor: Colors.white,
                        // top:-20,
                        zIndex: 2000,
                        padding: 7,
                        borderRadius: 100
                    }} >

                        <HomeIcon />

                    </View>
                }
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Wallet")
                }}
            >
                {page == "Wallet" ?
                    <>
                        <View style={{
                            backgroundColor: Colors.white,
                            top: -15,
                            zIndex: 2000,
                            padding: 14,
                            borderRadius: 100
                        }} >
                            <WalletIcons primary />
                        </View>
                        <BoldText1
                            style={{ top: -10 }}
                            text={page}
                            color="white" />
                    </>
                    :
                    <View style={{
                        // backgroundColor: Colors.white,
                        // top:-30,
                        zIndex: 2000,
                        padding: 7,
                        borderRadius: 100
                    }} >
                        <WalletIcons />
                    </View>
                }
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("History")
                }}
            >
                {page == "History" ?
                    <>
                        <View style={{
                            backgroundColor: Colors.white,
                            top: -15,
                            zIndex: 2000,
                            padding: 12,
                            borderRadius: 100
                        }} >
                            <HistoryIcon primary />
                        </View>
                        <BoldText1
                            style={{ top: -10 }}
                            text={page}
                            color="white" />
                    </>
                    :
                    <View style={{
                        // backgroundColor: Colors.white,
                        // top:-30,
                        zIndex: 2000,
                        padding: 7,
                        borderRadius: 100
                    }} >
                        <HistoryIcon />

                    </View>
                }
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Account")
                }}
            >
                {page == "Account" ?
                    <>
                        <View style={{
                            backgroundColor: Colors.white,
                            top: -15,
                            zIndex: 2000,
                            padding: 14,
                            borderRadius: 100
                        }} >
                            <AccountIcon primary />
                        </View>
                        <BoldText1
                            style={{ top: -10 }}
                            text={page}
                            color="white" />
                    </>
                    : <View style={{
                        // backgroundColor: Colors.white,
                        // top:-30,
                        zIndex: 2000,
                        padding: 7,
                        borderRadius: 100
                    }} >

                        <AccountIcon />
                    </View>
                }
            </TouchableOpacity>

        </View>
    </>)
}