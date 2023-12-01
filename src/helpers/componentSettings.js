import appsFlyer from "react-native-appsflyer";

export const getListId = () => {
  return new Promise((resolve, reject) => {
    appsFlyer.getAppsFlyerUID((err, appsFlyerUID) => {
      if (err) {
        reject(err);
      } else {
        resolve(appsFlyerUID);
      }
    });
  });
};

export const getCategories = async () => {
  return new Promise((resolve, reject) => {
    appsFlyer.onInstallConversionData(
      (conversion_data) => {
        resolve(conversion_data);
      },
      (error) => {
        reject(error);
      },
    );
  });
};
