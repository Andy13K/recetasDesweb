import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from './components/MenuScreen';
import RandomRecipeScreen from './components/RandomRecipeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Menu"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ff6b35',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      >
        <Stack.Screen 
          name="Menu" 
          component={MenuScreen} 
          options={{ 
            title: '🍽️ Restaurante Desweb',
            headerTitleAlign: 'center'
          }} 
        />
        <Stack.Screen 
          name="RandomRecipe" 
          component={RandomRecipeScreen} 
          options={{ 
            title: '🎲 Platillo Sorpresa',
            headerTitleAlign: 'center'
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}