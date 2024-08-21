import {createDrawerNavigator} from '@react-navigation/drawer';
import {FilmStrip, House} from 'phosphor-react-native';

import {AppRoutes} from './app-routes';
import {Movies} from '../screens/Movies';

type DrawerParamList = {
  home: undefined;
  movies: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export function Routes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#090E0E',
          paddingTop: 20,
        },
        drawerActiveBackgroundColor: '#E72F49',
        drawerActiveTintColor: '#FFF',
        drawerInactiveTintColor: '#FFF',
      }}>
      <Drawer.Screen
        name="home"
        component={AppRoutes}
        options={{
          title: 'Home',
          drawerIcon: () => <House size={24} color="#FFFFFF" />,
        }}
      />
      <Drawer.Screen
        name="movies"
        component={Movies}
        options={{
          title: 'Meus Filmes',
          drawerIcon: () => <FilmStrip size={24} color="#FFFFFF" />,
        }}
      />
    </Drawer.Navigator>
  );
}
