import {StyleSheet, Text, View} from "react-native";
import {CreateTaskForm} from "../../components/CreateTaskForm";

export const TaskPage = ({ route }) => {
  const {taskData} = route.params;
  return (
    <CreateTaskForm actionType={'edit'} initialTaskData={taskData} />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    borderWidth: 1,
    borderRadius: 20,
    width: '80%',
    padding: 20
  }
});
