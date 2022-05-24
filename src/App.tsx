import React, {useRef, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import {Header} from './components';
import {AccountProvider, ConnectionProvider} from './providers';
import {Wallet} from './screens';
import { Text } from 'react-native';

import orcaClient from './orcaClient';

export const App = () => {
  const scrollViewRef = useRef<null | ScrollView>(null);
  const [tickSpacing, setTickSpacing] = useState(null);

  useEffect(() => {
    const fetchPool = async () => {
      const poolData = (await orcaClient.getPool("HJPjoWUrhoZzkNfRpHuieeFk9WcZWjwy6PBjZ81ngndJ")).getData();
      const { tickSpacing } = poolData;
      
      setTickSpacing(tickSpacing);
    }
    
    fetchPool();
  }, [])

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Header />
      <SafeAreaView>
        {tickSpacing && <Text>tickSpacing: {`${tickSpacing}`}</Text>}
        <ScrollView
          ref={ref => (scrollViewRef.current = ref)}
          contentInsetAdjustmentBehavior="automatic">
          <AccountProvider>
            <ConnectionProvider>
              <Wallet />
            </ConnectionProvider>
          </AccountProvider>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
