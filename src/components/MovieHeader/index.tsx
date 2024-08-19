import {Text, View} from 'react-native';
import {FilmReel} from 'phosphor-react-native';

import {theme} from '../../styles/theme';
import {styles} from './styles';

export function MovieHeader() {
  return (
    <View style={styles.container}>
      <FilmReel color={theme.colors.white} size={24} />
      <Text style={styles.title}>Tropinha Flix</Text>
    </View>
  );
}
