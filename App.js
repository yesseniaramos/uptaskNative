import 'react-native-gesture-handler';
import React from 'react';
import {Root} from 'native-base';
import {Text, StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import Login from './views/Login';
import CrearCuenta from './views/CrearCuenta';
import Proyectos from './views/Proyectos';
import NuevoProyecto from './views/NuevoProyecto';
import Proyecto from './views/Proyecto';

const App = () => {
  return (
    <>
      <Root>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: 'Inicial Sesión',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CrearCuenta"
              component={CrearCuenta}
              options={{
                title: 'Inicial Sesión',
                headerStyle: {
                  backgroundColor: '#28303B',
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="Proyectos"
              component={Proyectos}
              options={{
                headerTitleAlign: 'center',
                title: 'Proyectos',
                headerStyle: {
                  backgroundColor: '#28303B',
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="NuevoProyecto"
              component={NuevoProyecto}
              options={{
                headerTitleAlign: 'center',
                title: 'Nuevo Proyecto',
                headerStyle: {
                  backgroundColor: '#28303B',
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="Proyecto"
              component={Proyecto}
              options={({route}) => ({
                headerTitleAlign: 'center',
                title: route.params.nombre,
                headerStyle: {
                  backgroundColor: '#28303B',
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
