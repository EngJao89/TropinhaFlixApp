import {useState, useEffect} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Modal,
  View,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';

import {
  ArrowLeft,
  Bookmark,
  Bookmarks,
  BoxArrowUp,
  Star,
} from 'phosphor-react-native';

import {useNavigation, useRoute} from '@react-navigation/native';

import {Genres} from '../../components/Genres';
import {ModalLink} from '../../components/ModalLink';

import api, {key} from '../../service/api';
import {styles} from './style';

import {Movie} from '../../@types/movie';

import {saveMovie, hasMovie, deleteMovie} from '../../utils/storage';

export function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const [movie, setMovie] = useState<Partial<Movie>>({});
  const [openLink, setOpenLink] = useState(false);
  const [favoritedMovie, setFavoritedMovie] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function getMovie() {
      if (!route.params?.id) return;

      try {
        const response = await api.get(`/movie/${route.params?.id}`, {
          params: {
            api_key: key,
            language: 'pt-BR',
          },
        });

        if (isActive) {
          setMovie(response.data);

          const isFavorite = await hasMovie(response.data);
          setFavoritedMovie(isFavorite);
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (isActive) {
      getMovie();
    }

    return () => {
      isActive = false;
    };
  }, [route.params?.id]);

  async function handlefavoriteMovie(movie: Partial<Movie>) {
    if (
      movie.id &&
      movie.title &&
      movie.poster_path &&
      movie.overview &&
      movie.release_date &&
      movie.vote_average !== undefined
    ) {
      if (favoritedMovie) {
        await deleteMovie(movie.id);
        setFavoritedMovie(false);
        Alert.alert('Filme removido da sua lista');
      } else {
        await saveMovie('@cineprime', movie as Movie);
        setFavoritedMovie(true);
        Alert.alert('Filme salvo na sua lista!');
      }
    } else {
      console.error('O objeto do filme não está completo');
      return;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={styles.headerButton}>
          <ArrowLeft size={28} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlefavoriteMovie(movie as Movie)}
          style={styles.headerButton}>
          {favoritedMovie ? (
            <Bookmarks size={28} color="#FFF" />
          ) : (
            <Bookmark size={28} color="#FFF" />
          )}
        </TouchableOpacity>
      </View>

      <Image
        resizeMethod="resize"
        source={{
          uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
        }}
        style={styles.banner}
      />

      <TouchableOpacity
        onPress={() => setOpenLink(true)}
        style={styles.buttonLink}>
        <BoxArrowUp size={24} color="#FFF" />
      </TouchableOpacity>

      <Text numberOfLines={2} style={styles.title}>
        {movie.title}
      </Text>

      <View style={styles.contentArea}>
        <Star size={12} color="#E7A74e" />
        <Text style={styles.rate}>{movie.vote_average}/10</Text>
      </View>

      <FlatList
        style={styles.listGenres}
        data={movie?.genres || []}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => <Genres data={item} />}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Descrição</Text>
        <Text style={styles.description}>{movie?.overview}</Text>
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={openLink}>
        <ModalLink
          link={movie?.homepage || ''}
          title={movie?.title || ''}
          closeModal={() => setOpenLink(false)}
        />
      </Modal>
    </View>
  );
}
