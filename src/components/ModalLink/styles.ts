import {theme} from '../../styles/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  backButton: {
    padding: 10,
    backgroundColor: theme.colors.gray_700,
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginLeft: 8,
    color: theme.colors.white,
    fontSize: theme.fonts.MD,
    fontWeight: 'bold',
  },
});
