import {Text, TouchableOpacity, View} from 'react-native';
import {Star, Trash} from 'phosphor-react-native';
import {styles} from './styles';

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  [key: string]: any; // Permite outras propriedades se necessário
}

interface FavoriteItemProps {
  data: Movie;
  deleteMovie: (id: number) => void;
  navigatePage: (movie: Movie) => void;
}

export function FavoriteItem({
  data,
  deleteMovie,
  navigatePage,
}: FavoriteItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>

      <View style={styles.rateContainer}>
        <Star size={12} color="#E7A74e" />
        <Text style={styles.rate}>{data.vote_average}/10</Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.detailButton}
          onPress={() => navigatePage(data)}>
          <Text style={styles.title}>Ver Detalhes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteMovie(data.id)}>
          <Trash size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
