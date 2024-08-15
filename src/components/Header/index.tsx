import {Text, View} from 'react-native';
import {FinnTheHuman} from 'phosphor-react-native';

import {theme} from '../../styles/theme';
import {styles} from './styles';

export function Header() {
  return (
    <View style={styles.container}>
      <FinnTheHuman color={theme.colors.white} size={24} />
      <Text style={styles.title}>Cine Prime</Text>
    </View>
  );
}
