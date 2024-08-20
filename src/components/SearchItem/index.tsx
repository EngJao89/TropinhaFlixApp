import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {Star} from 'phosphor-react-native';

import {styles} from './styles';

interface SearchItemProps {
  data: {
    poster_path?: string;
    release_date?: string;
    title?: string;
    vote_average?: number;
  };
  navigatePage: (data: any) => void;
}

export function SearchItem({data, navigatePage}: SearchItemProps) {
  const detailMovie = () => {
    if (data.release_date === '') {
      Alert.alert('Filme ainda sem data');
      return;
    }
    navigatePage(data);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={detailMovie}
      style={styles.container}>
      {data?.poster_path ? (
        <Image
          resizeMethod="resize"
          source={{
            uri: `https://image.tmdb.org/t/p/original/${data?.poster_path}`,
          }}
          style={styles.banner}
        />
      ) : (
        <Image
          resizeMethod="resize"
          source={require('../../assets/image 1.png')}
          style={styles.banner}
        />
      )}

      <Text style={styles.title}>{data?.title}</Text>

      <View style={styles.rateContainer}>
        <Star size={12} color="#E7A74e" />
        <Text style={styles.rate}>{data?.vote_average}/10</Text>
      </View>
    </TouchableOpacity>
  );
}
