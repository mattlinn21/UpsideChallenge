import React, {useEffect, useRef, useState} from 'react';

import {Buffer} from 'buffer';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Price} from './components/Price';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    width: '100%',
    height: '100%',
  };

  const [networkStatusStr, setNetworkStatusStr] = useState('Connecting...');
  const [bookPrices, setBookPrices] = useState({});
  const bookPriceRef = useRef(bookPrices);

  useEffect(() => {
    bookPriceRef.current = bookPrices;
  }, [bookPrices]);

  useEffect(() => {
    const url = 'wss://kxf3vqpfbj.execute-api.us-west-2.amazonaws.com/beta';
    const username = 'upsideatsbeta@gmail.com';
    const userpwd = 'testUpside.123';
    const base64EncodedStr = Buffer.from(`${username}:${userpwd}`).toString(
      'base64',
    );

    const ws = new WebSocket(url, '', {
      headers: {
        ['Authorization']: `Basic ${base64EncodedStr}`,
      },
    });

    ws.onopen = () => {
      setNetworkStatusStr('Connected. Loading data...');
    };

    ws.onerror = e => {
      setNetworkStatusStr('Check Network Connection');
      console.error('error', e.message);
    };

    ws.onmessage = e => {
      if (e.data) {
        setNetworkStatusStr('');
        const wsResponse = JSON.parse(e.data);
        if (wsResponse) {
          const newBookPrices = JSON.parse(
            JSON.stringify(bookPriceRef.current),
          );
          for (const key of Object.keys(wsResponse.bookPrices)) {
            newBookPrices[key] = wsResponse.bookPrices[key];
          }
          setBookPrices(newBookPrices);
        }
      }
    };
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {networkStatusStr !== '' ? (
          <Text style={styles.alertLabel}>{networkStatusStr}</Text>
        ) : null}
        <View style={styles.marketContainer}>
          {Object.keys(bookPrices).map(key => {
            return <Price key={key} label={key} bookPrice={bookPrices[key]} />;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  alertLabel: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 20,
  },
  marketContainer: {
    height: '100%',
  },
});

export default App;
