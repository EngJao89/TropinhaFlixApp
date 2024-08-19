import {theme} from '../../styles/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 14,
  },
  title: {
    color: theme.colors.white,
    fontSize: theme.fonts.LG,
    fontWeight: 'bold',
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
  },
  rate: {
    color: theme.colors.white,
    fontSize: theme.fonts.XS,
    paddingLeft: 12,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailButton: {
    width: '85%',
    height: 30,
    backgroundColor: theme.colors.red_100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  deleteButton: {
    width: '15%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
