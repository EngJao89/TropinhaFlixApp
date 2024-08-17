import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Star} from 'phosphor-react-native';

import {styles} from './styles';
import {Movie} from '../../@types/movie';

interface SliderItemProps {
  data: Movie;
  navigatePage: () => void;
}

export function SliderItem({data, navigatePage}: SliderItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={navigatePage}
      style={styles.container}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/original/${data.poster_path}`,
        }}
        style={styles.bannerItem}
      />
      <Text style={styles.title}>{data.title}</Text>

      <View style={styles.rateContainer}>
        <Star size={12} color="#E7A74e" />
        <Text style={styles.rate}>{data.vote_average}</Text>
      </View>
    </TouchableOpacity>
  );
}
