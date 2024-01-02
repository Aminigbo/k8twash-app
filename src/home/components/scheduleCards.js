import { View, Text, Pressable } from "react-native";
import { BoldText1, BoldText2 } from "../../global-components.js/texts";
import { Color } from "../../utilities/theme";
const Colors = Color()

export function ScheduleCard({ navigation, data }) {
    let NewData = data.data  
    return (<>
        <View style={{
            backgroundColor: Colors.secondary,
            padding: 16,
            marginHorizontal: 20,
            marginVertical: 10,
            borderRadius: 10
        }} >
            <Pressable
                onPress={() => { 
                    navigation.push("Tracking",{id:data.id, uuid:NewData.uuid})
                }}
            >


                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <BoldText2 text="Vehicle type"
                        color="black"
                    />
                    <BoldText1 text={NewData.vehicleType}
                        color="black"
                    />
                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <BoldText2 text="Vehicle color"
                        color="black"
                    />
                    <BoldText2 text={NewData.vehicleColor}
                        color={NewData.vehicleColor.toLowerCase()}
                    />
                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <BoldText2 text="Plate number"
                        color="black"
                    />
                    <BoldText1 text={NewData.plateNumber}
                        color="black"
                    />
                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <BoldText2 text="Start date"
                        color="black"
                    />
                    <BoldText1 text={NewData.startDate}
                        color="black"
                    />
                </View>
            </Pressable>
        </View>
    </>)
}