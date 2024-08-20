import {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';

import {styles} from './styles';
import api from '../../service/api';
import {SearchItem} from '../../components/SearchItem';

type SearchScreenRouteProp = RouteProp<{params: {name: string}}, 'params'>;

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: number;
}

export function Search() {
  const navigation = useNavigation();
  const route = useRoute<SearchScreenRouteProp>();

  const [movie, setMovie] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function getSearchMovie() {
      try {
        const response = await api.get('/search/movie', {
          params: {
            query: route?.params?.name,
            api_key: process.env.API_KEY,
            language: 'pt_BR',
            page: 1,
          },
        });

        if (isActive) {
          setMovie(response.data.results);
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    }

    if (isActive) {
      getSearchMovie();
    }

    return () => {
      isActive = false;
    };
  }, [route?.params?.name]);

  const navigateDetailsPage = (item: Movie) => {
    navigation.navigate('Detail', {id: item.id});
  };

  if (loading) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movie}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <SearchItem
            data={item}
            navigatePage={() => navigateDetailsPage(item)}
          />
        )}
      />
    </View>
  );
}
