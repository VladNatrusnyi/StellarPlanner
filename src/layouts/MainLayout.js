import {Provider, useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {getCategoriesData} from "../store/listsSlice";
import {store} from "../store";
import {PreloaderPage} from "../pages/PreloaderPage";
import {CurrentTask} from "../pages/CurrentTask";
import {AppPage} from "../pages/app-pages/AppPage";
import {StatusBar} from "react-native";
import {COLORS} from "../colors";
import {useEffect, useState} from "react";
import {getCurrentTask} from "../store/tasksSlice";

export const MainLayout = () => {
  const dispatch = useDispatch()

  const {categories} = useSelector(state => state.lists)
  const {currentTask, isLoadingCurrentTask} = useSelector(state => state.tasks)

  useEffect( () => {
    dispatch(getCategoriesData())
  }, []);


  useEffect(() => {
    if (categories) {
      dispatch(getCurrentTask(categories))
    }
  },[categories])

  return (
    <>
      {
        isLoadingCurrentTask ? <PreloaderPage /> : currentTask ? <CurrentTask task={currentTask} /> : <AppPage />
      }
      <StatusBar
        animated={true}
        backgroundColor={COLORS.primary}
      />
    </>
  );
}
