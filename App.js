import {StatusBar, StyleSheet, Text, View} from 'react-native';

import appsFlyer from 'react-native-appsflyer';
import {useEffect, useState} from "react";


// import {initializeLibs} from "./src/libs";
import axios from "axios";
import {PreloaderPage} from "./src/pages/PreloaderPage";
import {ViewPage} from "./src/pages/CurrentTask";
import {AppPage} from "./src/pages/app-pages/AppPage";
import {COLORS} from "./src/colors";
import {Provider, useDispatch} from "react-redux";
import {store} from "./src/store";
import {getCategoriesData} from "./src/store/listsSlice";
import {MainLayout} from "./src/layouts/MainLayout";



export default function App() {
 return (
   <Provider store={store} >
      <MainLayout/>
   </Provider>
 )
}

