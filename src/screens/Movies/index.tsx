import {useEffect, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';

import {deleteMovie, getMoviesSave} from '../../utils/storage';
import {styles} from './styles';
import {FavoriteItem} from '../../components/FavoriteItem';
import {Header} from '../../components/Header';

interface Movie {
  id: number;
  title: string;
  [key: string]: any;
}

export function Movies() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    let isActive = true;

    async function getFavoriteMovies() {
      const result = await getMoviesSave('@cineprime');
      if (isActive) {
        setMovies(result);
      }
    }

    if (isActive) {
      getFavoriteMovies();
    }

    return () => {
      isActive = false;
    };
  }, [isFocused]);

  async function handleDelete(id: number) {
    const result = await deleteMovie(id);
    setMovies(result);
  }

  function navigationDetailsPage(item: Movie) {
    navigation.navigate('Detail', {id: item.id});
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Meus Filmes" />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={movies}
        keyExtractor={item => String(item.id)}
        renderItem={ ({ item }) => (
          <FavoriteItem
            data={item}
            deleteMovie={handleDelete}
            navigatePage={() => navigationDetailsPage(item)}
          />
        )}
      />
    </SafeAreaView>
  );
}
