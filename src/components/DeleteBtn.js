import {Alert} from "react-native";
import {IconButton} from "react-native-paper";
import {
  removeDataFromAsyncStorageById
} from "../helpers/asyncStorageApi";
import {useDispatch} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {getTasks} from "../store/tasksSlice";

export const DeleteBtn = ({itemData}) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()


  const deleteTask = () => {
    if (itemData) {
      Alert.alert('Delete a task', 'Are you sure you want to delete the task?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {
            removeDataFromAsyncStorageById('tasks', itemData.id)
              .then(res =>{
                dispatch(getTasks(res))
                navigation.navigate('Task Lists')
              })
              .catch(err => console.log('ERROR', err))
          }},
      ]);
    }
  }


  return (
    <IconButton
      icon="delete"
      iconColor='#FFF'
      size={28}
      onPress={deleteTask}
    />
  )
}
