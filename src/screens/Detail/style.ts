import {theme} from '../../styles/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray_900,
  },
  header: {
    zIndex: 99,
    position: 'absolute',
    top: 35,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
  },
  headerButton: {
    width: 46,
    height: 48,
    backgroundColor: theme.colors.gray_700,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    width: '100%',
    height: 350,
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
  },
  buttonLink: {
    backgroundColor: theme.colors.secondary_400,
    width: 63,
    height: 63,
    borderRadius: 35,
    position: 'absolute',
    top: 300,
    right: 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
});
