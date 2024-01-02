import { View, Text } from "react-native";
import { BoldText1, BoldText2, BoldText3 } from "../../global-components.js/texts";
import { Color } from "../../utilities/theme";
import { WasteBasketIcon } from "../../utilities/icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Colors = Color()

const SmallText = ({
    text
}) => {
    return (<>
        <View>
            <Text style={[{
                color: "grey",
                fontWeight: 500,
                fontSize: 13,
                // marginLeft: 50
            }]} >
                {text}
            </Text>
        </View></>)
}

const LargeText = ({
    text
}) => {
    return (<>
        <View>
            <Text style={[{
                color: "black",
                fontWeight: 500,
                fontSize: 14,
                // marginBottom: 10
            }]} >
                {text}
            </Text>
        </View></>)
}
export function HistoryCardComponent({
    Alert,
    data
}) {
    return (<>
        <View style={{
            backgroundColor: Colors.secondary,
            padding: 10,
            borderRadius: 10,
            flexDirection: "row",
            marginBottom: 10
        }}>
            <View style={{
                // backgroundColor: "red",
                flex: 1,
                justifyContent: "center",
                // alignItems:"center"
            }}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 5,
                    justifyContent: "space-between",

                }}>
                    <LargeText text="Vehicle type" />
                    <SmallText text="Truck" />
                </View>

                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 5,
                    justifyContent: "space-between",

                }}>
                    <LargeText text="Color" />
                    <SmallText text="Black" />
                </View>

                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 5,
                    justifyContent: "space-between",
                    // backgroundColor:"red"

                }}>
                    <LargeText text="Plate number:" />
                    <SmallText text="F23-4T4-R56" />
                </View>


                <View style={{ marginTop: 10 }}>
                    <BoldText3 text="Completed" color={Colors.primary} />
                </View>
            </View>

            <View style={{
                // backgroundColor: "green",
                flex: 0.4,
                justifyContent: "flex-start",
                alignItems: "flex-end"
            }}>
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert("Warning", "This schedule will be deleted from your history without a backup", [
                            {
                                text: "Proceed", onPress: () => {

                                }
                            }
                        ])
                    }}
                >
                    <WasteBasketIcon />
                </TouchableOpacity>
            </View>

        </View>
    </>)
}