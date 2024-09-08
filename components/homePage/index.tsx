import React, {useCallback, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import NewsList from '../newsList';
import NetInfo from '@react-native-community/netinfo';
import {useFocusEffect} from '@react-navigation/native';
import {styles} from './styles';

const HomeScreen: React.FC = () => {
  const [showOfflineMessage, setShowOfflineMessage] = useState<boolean>(false);

  const checkOfflineStatus = useCallback(async () => {
    const state = await NetInfo.fetch();
    setShowOfflineMessage(!state.isConnected);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = NetInfo.addEventListener(state => {
        setShowOfflineMessage(!state.isConnected);
      });

      checkOfflineStatus();

      return () => {
        unsubscribe();
        setShowOfflineMessage(false);
      };
    }, [checkOfflineStatus]),
  );

  return (
    <SafeAreaView style={styles.container}>
      {showOfflineMessage && (
        <Text style={styles.offlineMessage}>
          You are offline. Viewing saved content.
        </Text>
      )}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Discover</Text>
        <Text style={styles.subtitle}>News from all around the world</Text>
      </View>
      <NewsList />
    </SafeAreaView>
  );
};

export default HomeScreen;
