import { TouchableOpacity } from "react-native-gesture-handler";
import { ActivityIndicator, Text } from "react-native"
import { Color } from "../utilities/theme";
import { AngleDownIcon, CopyIcon } from "../utilities/icons";
import { BoldText2 } from "./texts";
const Colors = Color()

export function Button({
    text,
    loading,
    callBack,
    primary,
    TextColor,
    width,
    style
}) {
    return (<>
        <TouchableOpacity
            onPress={() => {
                callBack()
            }}
            style={[
                {
                    backgroundColor: primary ? Colors.primary : Colors.white,
                    height: 50,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                }, style && style
            ]}>
            <Text style={{
                color: TextColor,
                fontSize: 18,
                textAlign: "center",
                fontWeight: 500
            }} >
                {!loading ? text : <ActivityIndicator color="white" />}
            </Text>
        </TouchableOpacity>
    </>)
}

export function SelectButton({
    text,
    loading,
    callBack,
    primary,
    TextColor,
    label,
    style,
    copy,
    noIcon
}) {
    return (<>
        {label && <BoldText2 style={{
            marginTop: 10
        }} color={Colors.dark} text={label} />}
        <TouchableOpacity
            onPress={() => {
                callBack()
            }}
            style={[
                {
                    backgroundColor: primary ? Colors.primary : Colors.white,
                    // height: 50,
                    width: "100%",
                    alignItems: "center",
                    borderRadius: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 16,
                    paddingRight: 10
                }, style && style
            ]}>
            <Text style={{
                color: TextColor,
                fontSize: 15,
                textAlign: "center",
                // fontWeight: 500
            }} >
                {text}
            </Text>
            {copy ? <CopyIcon /> : !noIcon && <AngleDownIcon />}
        </TouchableOpacity>
    </>)
}