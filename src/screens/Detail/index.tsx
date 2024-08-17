import {useState, useEffect} from 'react';
import {
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
} from 'phosphor-react-native';

import {useNavigation, useRoute} from '@react-navigation/native';

import Genres from '../../components/Genres';
import ModalLink from '../../components/ModalLink';

import api from '../../service/api';
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
      try {
        const response = await api.get(`/movie/${route.params?.id}`, {
          params: {
            api_key: process.env.API_KEY,
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

  async function handlefavoriteMovie(movie: Movie) {
    if (favoritedMovie) {
      await deleteMovie(movie.id);
      setFavoritedMovie(false);
      alert('Filme removido da sua lista');
    } else {
      await saveMovie('@cineprime', movie);
      setFavoritedMovie(true);
      alert('Filme salvo na sua lista!');
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
        <Text style={styles.rate}>{movie.vote_average}/10</Text>
      </View>

      <FlatList
        style={styles.listGenres}
        data={movie?.genre_ids || []}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Genres data={item} />}
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
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}

