import { View, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { BoldText1, BoldText2, BoldText3 } from "../../global-components.js/texts"
import { Color } from "../../utilities/theme"
import { CreditIcon, DebitIcon } from "../../utilities/icons"
import { NumberWithCommas } from "../../utilities"

const Colors = Color()

export function TransactionsCard({
    credit,
    data,
    key
}) {
    return (<>
        <View key={key} style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 15
        }}>
            <View>
                {data.data.type == "Wallet top-up" ? <CreditIcon /> : <DebitIcon />}
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
                    <BoldText2 text={data.data.type}
                        color={Colors.dark}
                    />
                    <BoldText1
                        text={data.date}
                        color={Colors.dark}

                    />
                </TouchableOpacity>

                <View style={{

                }} >
                    <BoldText1
                        text={`$${NumberWithCommas(data.data.amount)}`}
                        color={Colors.dark}
                    />
                </View>
            </View>

        </View>
    </>)
}