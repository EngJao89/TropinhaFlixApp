import {Text, TouchableOpacity, View} from 'react-native';
import {FilmSlate} from 'phosphor-react-native';
import {useNavigation, DrawerActions} from '@react-navigation/native';

import {theme} from '../../styles/theme';
import {styles} from './styles';

type HeaderProps = {
  title: string;
};

export function Header({title}: HeaderProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={styles.drawerButton}>
        <FilmSlate color={theme.colors.white} size={24} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
