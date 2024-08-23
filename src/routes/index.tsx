import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {FilmStrip, House} from 'phosphor-react-native';

import {Home} from '../screens/Home';
import {Detail} from '../screens/Detail';
import {Movies} from '../screens/Movies';
import {Search} from '../screens/Search';

export type RootStackParamList = {
  home: undefined;
  detail: {id: string};
  movies: {name: string};
  search: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="detail" component={Detail} />
      <Stack.Screen name="movies" component={Movies} />
      <Stack.Screen name="search" component={Search} />
    </Stack.Navigator>
  );
}

type DrawerParamList = {
  home: undefined;
  movies: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerRoutes() {
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

export function Routes() {
  return (
    <NavigationContainer>
      <DrawerRoutes />
    </NavigationContainer>
  );
}
