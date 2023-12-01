import appsFlyer from "react-native-appsflyer";
import { OneSignal } from 'react-native-onesignal';

const initializeLibs = () => {
  appsFlyer.initSdk(
    {
      devKey: 'ek9GnoMKATBs366nphQqCf',
      isDebug: false,
      appId: '',
      onInstallConversionDataListener: true, //Optional
      onDeepLinkListener: true, //Optional
      timeToWaitForATTUserAuthorization: 10 //for iOS 14.5
    },
    (result) => {
    },
    (error) => {
      console.error(error);
    }
  );

  OneSignal.initialize("d3143295-232c-4bf8-a0e0-2b8621d276e9");
}


export default initializeLibs
