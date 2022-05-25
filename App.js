import React, { useState } from 'react';

// react navigation stack
import RootStack from './navigators/RootStack';

// Apploading
import AppLoading from 'expo-app-loading';

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credential context
import { CredentialsContext } from './components/CredentialsContext';

export default function App() {

  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");

  const checkLoginCredentials = () => {
    AsyncStorage
      .getItem('flowerHouseCredentials')
      .then((result) => {
        if(result !== null) {
          setStoredCredentials(JSON.parse(result));
        }
        else {
          setStoredCredentials(null);
        }
      })
      .catch(error => console.log(error))
  }

  if (!appReady){
    return (
      <AppLoading
        startAsync={checkLoginCredentials}
        onFinish={ () =>setAppReady(true) }
        onError={console.log()}
      />
    )
  }

  return (
    <CredentialsContext.Provider value={{storedCredentials, setStoredCredentials}}>
      <RootStack/>
    </CredentialsContext.Provider>
  );
}