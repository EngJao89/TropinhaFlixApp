import {theme} from '../../styles/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 16,
    width: 140,
    height: 140,
  },
  bannerItem: {
    width: '100%',
    height: 170,
    borderRadius: 8,
  },
  title: {
    color: theme.colors.white,
    fontSize: theme.fonts.SM,
    paddingTop: 8,
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rate: {
    paddingLeft: 4,
    color: theme.colors.white,
    fontSize: theme.fonts.XS,
  },
});
