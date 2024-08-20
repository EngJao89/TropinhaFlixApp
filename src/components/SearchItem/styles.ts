import {theme} from '../../styles/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 14,
  },
  banner: {
    width: '100%',
    height: 140,
    borderRadius: 8,
  },
  title: {
    color: theme.colors.white,
    fontSize: theme.fonts.MD,
    fontWeight: 'bold',
    paddingTop: 8,
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4,
  },
  rate: {
    paddingTop: 4,
    color: theme.colors.white,
    fontSize: theme.fonts.XS,
  },
});
