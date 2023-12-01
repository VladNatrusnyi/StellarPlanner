import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {TasksListPage} from "../pages/app-pages/TasksListPage";
import {CreateNewTaskPage} from "../pages/app-pages/CreateNewTaskPage";
import {StyleSheet} from 'react-native';
import {AnimatedFAB, FAB} from "react-native-paper";
import {COLORS} from "../colors";
import {TaskPage} from "../pages/app-pages/TaskPage";
import {DeleteBtn} from "../components/DeleteBtn";

const Stack = createStackNavigator();

export const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Task Lists"
        name={"Root"}
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: 'white',
        }}
      >
        <Stack.Screen
          name="Task Lists"
          component={TasksListPage}
        />
        <Stack.Screen name="New Task" component={CreateNewTaskPage} />
        <Stack.Screen
          options={({ route }) => ({
            title: route.params && route.params.title ? route.params.title : 'Task page',
            headerRight: () => (
              <DeleteBtn itemData={route.params && route.params.taskData ? route.params.taskData : null}/>
            ),
          })}
          name="Task page"
          component={TaskPage}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
 });
