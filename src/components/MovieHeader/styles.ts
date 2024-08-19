import {theme} from '../../styles/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 32,
  },
  icon: {
    height: 70,
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    color: theme.colors.white,
    fontSize: theme.fonts.XL,
    fontWeight: 'bold',
    marginLeft: 12,
  },
});
