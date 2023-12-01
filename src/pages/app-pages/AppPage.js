import {StyleSheet, Text, View} from 'react-native';
import {RootNavigation} from "../../navigation/RootNavigation";
import {TasksListPage} from "./TasksListPage";
import {PaperProvider} from "react-native-paper";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getLists} from "../../store/listsSlice";
import {getDataFromAsyncStorage} from "../../helpers/asyncStorageApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getTasks} from "../../store/tasksSlice";

export const AppPage = () => {
  const dispatch = useDispatch()

  useEffect( () => {
    getDataFromAsyncStorage('tasks')
      .then(res => {
        dispatch(getTasks(res))
      } )
      .catch(error => {
        console.log('Error', error)
      })


    getDataFromAsyncStorage('lists')
      .then(res => {
        dispatch(getLists(res))
      } )
      .catch(error => {
        console.log('Error', error)
      })

  }, [])
  return (
    <View style={styles.container}>
      <PaperProvider>
        <RootNavigation />
      </PaperProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
