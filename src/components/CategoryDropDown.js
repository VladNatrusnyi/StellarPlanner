import {Text, View} from "react-native";
import {useState} from "react";
import {Picker} from "@react-native-picker/picker";
import {COLORS} from "../colors";
import {Button} from "react-native-paper";
import {useSelector} from "react-redux";

export const CategoryDropDown = ({categories, setModalIsOpen, getData}) => {
  const lists = useSelector(state => state.lists.lists)

  const [selectedLanguage, setSelectedLanguage] = useState(1);

  return (
    <>
      {
        lists && lists.length ?
        <View>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedLanguage(itemValue)
              getData(itemValue)
            }
            }>
            {
              [...lists, {id: 1, title: 'Uncategorized'}].map(el => {
                return (
                  <Picker.Item key={el.id} label={el.title} value={el.id} />
                )
              })
            }
          </Picker>
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
          : <Text>FFFFFFFFFFFFFFFFFFFFFF</Text>
      }
    </>

  )
}
