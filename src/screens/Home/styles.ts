import {theme} from '../../styles/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray_900,
    flex: 1,
    paddingTop: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    marginBottom: 18,
  },
  title: {
    paddingTop: 20,
    paddingBottom: 8,
    fontSize: theme.fonts.LG,
    fontWeight: 'bold',
    color: theme.colors.white,
    paddingLeft: 14,
    paddingRight: 14,
  },
  banner: {
    height: 150,
    borderRadius: 6,
    marginHorizontal: 14,
  },
  sliderMovie: {
    height: 250,
    padding: 14,
  },
});
