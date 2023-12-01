import {TextInput} from "react-native-paper";
import {COLORS} from "../colors";

export const Input = ({value, onChange}) => {
  return (
    <TextInput
      label="Task text"
      value={value}
      placeholder={'Write your task'}
      mode={'outlined'}
      activeOutlineColor={COLORS.primary}
      onChangeText={text => onChange(text)}
    />
  )
}
