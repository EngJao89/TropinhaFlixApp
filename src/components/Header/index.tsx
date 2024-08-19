import {Text, View} from 'react-native';
import {FilmSlate} from 'phosphor-react-native';

import {theme} from '../../styles/theme';
import {styles} from './styles';

export function Header() {
  return (
    <View style={styles.container}>
      <FilmSlate color={theme.colors.white} size={24} />
      <Text style={styles.title}>Tropinha Flix</Text>
    </View>
  );
}
