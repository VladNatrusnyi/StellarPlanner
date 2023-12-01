import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Checkbox from 'expo-checkbox';
import {COLORS} from "../colors";
import {useDispatch, useSelector} from "react-redux";
import { useMemo} from "react";
import {formatDate, formatTime} from "../helpers/dateTransformers";
import { changeDataToAsyncStorage} from "../helpers/asyncStorageApi";
import {getTasks} from "../store/tasksSlice";
import {useNavigation} from "@react-navigation/native";


export const TaskItem = ({taskData}) => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const lists = useSelector(state => state.lists.lists)

  const category = useMemo(() => {
    if (lists && taskData.listId) {
      const data = lists.find(list => list.id === taskData.listId)
      if (data) {
        return data.title
      }
    }
  }, [taskData, lists])

  const checkTask = () => {
    changeDataToAsyncStorage(
      'tasks',
      !taskData.completed,
      taskData.id
    )
      .then(res =>{
        dispatch(getTasks(res))
      })
      .catch(err => console.log('ERROR', err))
  }


  return (
    <>
      <View style={styles.wrapper}>
        <View style={{flex: 1}}>
          <Checkbox
            style={styles.checkbox}
            // value={true}
            value={taskData.completed}
            onValueChange={checkTask}
            color={taskData.completed ? COLORS.secondary : undefined}
          />
        </View>
        <TouchableOpacity style={styles.block2} onPress={() => navigation.navigate('Task page', {taskData: taskData, title: taskData.text})}>
          <View style={styles.textBlock}>
            <Text
              style={{...styles.title, textDecorationLine: taskData.completed ? 'line-through': "none"}}>{taskData.text.toString()}</Text>
            <Text>{taskData.date && formatDate(taskData.date).toString()} {taskData.time && formatTime(taskData.time).toString()}</Text>
          </View>
          <View style={{flex: 1}}>
            {
              category &&
              <View style={styles.category}>
                <Text style={{ color: '#000'}}>{category}</Text>
              </View>
            }
          </View>
        </TouchableOpacity>
      </View>
    </>

  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.primary,
    paddingVertical: 10,
    paddingRight: 20,
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
    // justifyContent: "space-between"
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  block2: {
    flex: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  textBlock: {
    flex: 3,
    alignItems: "center"
  },
  checkbox: {
    width: 25,
    height: 25,
    margin: 8,
  },
  category: {
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    backgroundColor: 'lightgrey',
    borderRadius: 5
  }
});
