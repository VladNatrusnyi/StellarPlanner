import {Text, View} from "react-native";
import {Button} from "react-native-paper";
import {COLORS} from "../colors";

export const CategoriesNotExistBlock = ({setModalIsOpen}) => {
  return (
    <View style={{
      alignSelf: 'center',
      alignItems: 'center'
    }}>
      <Text>You have no categories yet.</Text>
      <Text>Create your own category.</Text>
      <Button
        icon="plus"
        mode="outlined"
        style={{
          marginTop: 10,
          width: '40%',
          backgroundColor: COLORS.secondary,
          borderWidth: 0
        }}
        textColor={'#fff'}
        onPress={() => setModalIsOpen(true)}>
        Create
      </Button>
    </View>
  )
}
