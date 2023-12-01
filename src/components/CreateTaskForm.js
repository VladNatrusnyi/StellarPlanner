import {useDispatch, useSelector} from "react-redux";
import {addDataToAsyncStorage, changeDataToAsyncStorage, editTaskAsyncStorage} from "../helpers/asyncStorageApi";
import {getLists} from "../store/listsSlice";
import * as Notifications from "expo-notifications";
import {formatTime} from "../helpers/dateTransformers";
import {getTasks} from "../store/tasksSlice";
import {StyleSheet, View} from "react-native";
import {NewTaskFieldLayout} from "../layouts/NewTaskFieldLayout";
import {Input} from "./Input";
import {Calendar} from "./Calendar";
import {CategoryDropDown} from "./CategoryDropDown";
import {CategoriesNotExistBlock} from "./CategoriesNotExistBlock";
import {MyModal} from "./MyModal";
import {Button, TextInput} from "react-native-paper";
import {COLORS} from "../colors";
import {useState} from "react";
import {compareObj} from "../helpers/compareObj";
import {useNavigation} from "@react-navigation/native";

export const CreateTaskForm = ({initialTaskData, actionType}) => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const lists = useSelector(state => state.lists.lists)

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const [newListTitle, setNewListTitle] = useState('')

  const [newTaskData, setNewTaskData] = useState(initialTaskData)


  const createList = () => {
    addDataToAsyncStorage('lists', {id: Date.now(), title: newListTitle})
      .then(res =>{
        dispatch(getLists(res))
        setModalIsOpen(false)
        setNewListTitle('')
      })
      .catch(err => console.log('ERROR', err))
  }

  const registerNotification = async (data) => {
    if (data.date && data.time) {
      const res = await Notifications.scheduleNotificationAsync({
        content: {
          title: data.text,
          body: formatTime(data.time),
        },
        trigger: {
          hour: new Date(data.time).getHours(),
          minute: new Date(data.time).getMinutes(),
          repeats: true
        },
      });
    }
  }

  const createTask = async () => {
    addDataToAsyncStorage(
      'tasks',
      {
        ...newTaskData,
        id: Date.now(),
      }
    )
      .then(res =>{
        dispatch(getTasks(res))
        setNewTaskData(initialTaskData)
        registerNotification(newTaskData)
        // navigation.navigate('Task Lists')
      })
      .catch(err => {})
  }

  const editTask = () => {
    editTaskAsyncStorage(
      'tasks',
      {...newTaskData, id: initialTaskData.id},
      initialTaskData.id
    )
      .then(res =>{
        dispatch(getTasks(res))

        navigation.goBack()
      })
      .catch(err => console.log('ERROR', err))
  }


  const getText = (text) => {
    setNewTaskData({...newTaskData, text: text})
  }

  const getDate = (data) => {
    setNewTaskData({...newTaskData, date: data})
    if (!data) {
      getTime(data)
    }

  }
  const getTime = (data) => {
    setNewTaskData({...newTaskData, time: data})
  }

  const getCategory = (data) => {
    setNewTaskData({...newTaskData, listId: data})
  }

  return (
    <View style={styles.container}>
      <View>
        <NewTaskFieldLayout label={'What should be done?'}>
          <Input value={newTaskData.text} onChange={getText}/>
        </NewTaskFieldLayout>

        <NewTaskFieldLayout label={'Date'}>
          <Calendar value={newTaskData.date} type={'date'} getData={getDate}/>
        </NewTaskFieldLayout>

        {
          newTaskData.date &&
          <NewTaskFieldLayout label={'Time'} >
            <Calendar value={newTaskData.time} type={'time'} getData={getTime}/>
          </NewTaskFieldLayout>
        }


        <NewTaskFieldLayout label={'Category'} >
          {lists && lists.length
            ? <CategoryDropDown getData={getCategory} setModalIsOpen={setModalIsOpen}/>
            : <CategoriesNotExistBlock  setModalIsOpen={setModalIsOpen} />}
        </NewTaskFieldLayout>

        <MyModal
          setModalVisible={setModalIsOpen}
          modalVisible={modalIsOpen}
          headerTitle={'New List'}
        >
          <TextInput
            value={newListTitle}
            placeholder={'Enter a name for the new list'}
            mode={'outlined'}
            activeOutlineColor={COLORS.primary}
            onChangeText={text => setNewListTitle(text)}
          />
          <View style={styles.btnContainer}>
            <Button
              style={styles.btn}
              mode="outlined"
              onPress={() => setModalIsOpen(false)}
              textColor={'#FFF'}
            >
              Cansel
            </Button>

            <Button
              disabled={!newListTitle.trim()}
              style={styles.btn}
              mode="outlined"
              onPress={createList}
              textColor={'#FFF'}
            >
              Create
            </Button>
          </View>


        </MyModal>
      </View>


      {
        actionType === 'create'
          ?
          <Button
            disabled={!newTaskData.text.trim()}
            style={{backgroundColor: COLORS.secondary, paddingVertical: 7}}
            mode="contained"
            onPress={createTask}
          >
            CREATE
          </Button>
          :
          <Button
            disabled={compareObj(newTaskData, initialTaskData)}
            style={{backgroundColor: COLORS.secondary, paddingVertical: 7}}
            mode="contained"
            onPress={editTask}
          >
            Save changes
          </Button>

      }




    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between"
  },
  btnContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btn: {
    backgroundColor: COLORS.secondary,
    borderWidth: 0,
    color: '#fff'
  }
});

