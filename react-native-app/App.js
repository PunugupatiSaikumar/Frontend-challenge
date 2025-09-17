import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import CourtListScreen from './screens/CourtListScreen';
import CourtDetailScreen from './screens/CourtDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="CourtList"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2E7D32',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="CourtList" 
            component={CourtListScreen}
            options={{ 
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="CourtDetail" 
            component={CourtDetailScreen}
            options={{ 
              title: 'Court Details',
              headerTitleAlign: 'center'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
