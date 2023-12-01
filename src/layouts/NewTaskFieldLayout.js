import {Text, View} from "react-native";
import {COLORS} from "../colors";

export const NewTaskFieldLayout = ({label, children}) => {
  return (
    <View style={{marginBottom: 20}}>
      <Text style={{
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 5
      }} variant="labelLarge">{label}</Text>
      {children}
    </View>
  )
}
