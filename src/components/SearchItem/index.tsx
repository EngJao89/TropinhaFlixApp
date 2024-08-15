import {Image, View} from 'react-native';
import {styles} from './styles';

export function SearchItem() {
  return (
    <View style={styles.container}>
      <Image
        resizeMethod="resize"
        source={require('../../assets/image 1.png')}
      />
    </View>
  );
}
