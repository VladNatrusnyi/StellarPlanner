import {View, Text, StyleSheet, FlatList} from "react-native";
import {AppLayout} from "../../layouts/AppLayout";
import {COLORS} from "../../colors";
import {Button} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {TaskItem} from "../../components/TaskItem";
import {useEffect, useMemo} from "react";
import * as Notifications from 'expo-notifications';
import {formatDate, formatTime, transformToNotification} from "../../helpers/dateTransformers";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {TasksList} from "../../components/TasksList";


const Tab = createMaterialTopTabNavigator();

export const TasksListPage = () => {
  const navigation = useNavigation()
  const lists = useSelector(state => state.lists.lists)

  const tasks = useSelector(state => state.tasks.tasks)


  // const clearAll = async () => {
  //   try {
  //     await AsyncStorage.clear()
  //   } catch(e) {
  //     // clear error
  //   }
  //
  //   console.log('Done.')
  // }

  const deleteAllNotifications = async () => {
    const subscriptions = await Notifications.getAllScheduledNotificationsAsync();

// Скасувати всі підписки
    subscriptions.forEach(subscription => {
      Notifications.cancelScheduledNotificationAsync(subscription.identifier);
    });
  };

  return (
    <AppLayout>
      {/*<Button*/}
      {/*  style={{backgroundColor: COLORS.secondary, paddingVertical: 7}}*/}
      {/*  mode="contained"*/}
      {/*  // onPress={deleteAllNotifications}*/}
      {/*  onPress={clearAll}*/}
      {/*  // onPress={foo}*/}
      {/*>*/}
      {/*  Clear STORE*/}
      {/*</Button>*/}

      {
        tasks ?
          <Tab.Navigator
            initialLayout={'All'}
            screenOptions={{
              tabBarLabelStyle: { color: COLORS.primary },
              tabBarIndicatorStyle: {backgroundColor: COLORS.primary},
            }}
          >
            {
              lists ?
                <>
                  <Tab.Screen name="All" component={TasksList} initialParams={{ listId: '1' }}/>
                  {
                    lists.map(list => {
                      return (
                        <Tab.Screen
                          key={list.id}
                          name={list.title}
                          component={TasksList}
                          initialParams={{ listId: list.id }}
                        />
                      )
                    })
                  }
                </>
                : <Tab.Screen name="All" component={TasksList} initialParams={{ listId: '1' }}/>
            }
          </Tab.Navigator>
          :
          <View style={styles.noTaskWrap}>
            <Text>You have no tasks. Create new tasks.</Text>
            <Button
              style={{backgroundColor: COLORS.secondary, paddingVertical: 7}}
              mode="contained"
              onPress={() => navigation.navigate('New Task')}
            >
              Create task
            </Button>
          </View>
      }
    </AppLayout>
  )
}

const styles = StyleSheet.create({
  noTaskWrap: {
    paddingVertical: 20,
    alignItems: "center",
    gap: 15
  },
});



