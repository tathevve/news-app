import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {styles} from './styles';

const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the News App</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default LoadingScreen;
