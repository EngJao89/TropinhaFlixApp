import {createNativeStackNavigator} from '@react-navigation/native-stack';

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

export function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="detail" component={Detail} />
      <Stack.Screen name="movies" component={Movies} />
      <Stack.Screen name="search" component={Search} />
    </Stack.Navigator>
  );
}
