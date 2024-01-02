import { BoldText1, BoldText2 } from "../../global-components.js/texts";
import { View } from "react-native"
import { Color } from "../../utilities/theme";

const Colors = Color()
export function NotificationCard({
    data
}) {
    console.log(data)
    return (<>
        <View style={{
            // marginBottom:10,
            // backgroundColor:"red",
            // elevation:1,
            paddingHorizontal: 15
        }} >
            <BoldText2
                text={data.data.message}
                color={Colors.dark}
            />
            <BoldText1
                text={data.data.date}
                color={Colors.dark}
                style={{
                    marginTop: -4
                }}
            />
        </View>
    </>)
}