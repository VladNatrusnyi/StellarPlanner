import {COLORS} from "../colors";
import {FAB} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

export const AppLayout = ({children}) => {
  const navigation = useNavigation();
  return (
    <>
      {children}
      <FAB
        style={{
          position: 'absolute',
          margin: 20,
          right: 0,
          bottom: 0,
          backgroundColor: COLORS.secondary
        }}
        color={'white'}
        icon="plus"
        onPress={() => navigation.navigate('New Task')}
      />
    </>
  )
}
