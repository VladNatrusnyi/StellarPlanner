import {FlatList, StyleSheet, Text, View} from "react-native";
import {TaskItem} from "./TaskItem";
import {useSelector} from "react-redux";
import {useMemo} from "react";

export const TasksList = ({ route }) => {
  const tasks = useSelector(state => state.tasks.tasks)

  const { listId } = route.params;

  const tasksArr = useMemo(() => {
    if (tasks) {
      const falseChecked = tasks.filter(obj => obj.completed === false);
      const trueChecked = tasks.filter(obj => obj.completed === true);
      const res = falseChecked.concat(trueChecked);
      if (listId) {
        if (listId === '1') {
          return res
        } else {
          return res.filter(el => el.listId === listId)
        }
      }
    }
  },[tasks, listId])


  return (
    <View style={styles.container}>
      <FlatList
        data={tasksArr}
        keyExtractor={(task) => task.id.toString()}
        renderItem={({ item: task }) => (
          <TaskItem key={task.id} taskData={task} />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
