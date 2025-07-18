import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/Components/NavigationService';
import StackNavigation from './src/Navigation/StactNavigation.js';
 

import { GlobalProvider } from './src/Components/GlobalContext';



const App = () => {


  return ( 
    <>
      <NavigationContainer ref={navigationRef}>
        <GlobalProvider>
            <StackNavigation />
        </GlobalProvider>
      </NavigationContainer>
    </>
  );
};

export default App;