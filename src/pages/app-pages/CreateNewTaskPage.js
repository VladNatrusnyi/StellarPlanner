import {View, StyleSheet, Text} from "react-native";
import {Input} from "../../components/Input";
import {COLORS} from "../../colors";
import {NewTaskFieldLayout} from "../../layouts/NewTaskFieldLayout";
import {Calendar} from "../../components/Calendar";
import {useState} from "react";
import {Button, TextInput} from "react-native-paper";
import {CategoriesNotExistBlock} from "../../components/CategoriesNotExistBlock";
import {MyModal} from "../../components/MyModal";
import {useDispatch, useSelector} from "react-redux";
import {addDataToAsyncStorage, changeDataToAsyncStorage} from "../../helpers/asyncStorageApi";
import {getLists} from "../../store/listsSlice";
import {CategoryDropDown} from "../../components/CategoryDropDown";
import {useNavigation} from "@react-navigation/native";
import {getTasks} from "../../store/tasksSlice";
import * as Notifications from "expo-notifications";
import {formatTime} from "../../helpers/dateTransformers";
import {CreateTaskForm} from "../../components/CreateTaskForm";

const initialTaskData = {
  id: null,
  text: '',
  date: null,
  time: null,
  listId: null,
  completed: false
}


export const CreateNewTaskPage = () => {
 return (
   <CreateTaskForm actionType={'create'} initialTaskData={initialTaskData} />
 )
}

