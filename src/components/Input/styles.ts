import {theme} from '../../styles/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 56,
    width: '100%',
    backgroundColor: theme.colors.gray_600,
    borderRadius: 8,
    paddingHorizontal: 20,
    fontSize: theme.fonts.MD,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    color: theme.colors.white,
  },
  searchButton: {
    width: '15%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
