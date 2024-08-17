import {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {styles} from './styles';

import api from '../../service/api';
import {Movie} from '../../@types/movie';
import {getListMovies, randomBanner} from '../../utils/movies';

import {Header} from '../../components/Header';
import {Input} from '../../components/Input';
import {SliderItem} from '../../components/SliderItem';

export function Home() {
  const [nowMovies, setNowMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [bannerMovie, setBannerMovie] = useState<Movie | null>(null);
  const [input, setInput] = useState<string>('');

  const navigation = useNavigation();

  useEffect(() => {
    let isActive = true;
    const ac = new AbortController();

    async function getMovies() {
      const [nowData, popularData, topData] = await Promise.all([
        api.get('/movie/now_playing', {
          params: {
            api_key: process.env.API_KEY,
            language: 'pt_BR',
            page: 1,
          },
        }),
        api.get('/movie/popular', {
          params: {
            api_key: process.env.API_KEY,
            language: 'pt_BR',
            page: 1,
          },
        }),
        api.get('/movie/top_rated', {
          params: {
            api_key: process.env.API_KEY,
            language: 'pt_BR',
            page: 1,
          },
        }),
      ]);

      if (isActive) {
        const nowList = getListMovies(10, nowData.data.results);
        const popularList = getListMovies(5, popularData.data.results);
        const topList = getListMovies(5, topData.data.results);

        setBannerMovie(
          nowData.data.results[randomBanner(nowData.data.results)],
        );

        setNowMovies(nowList);
        setPopularMovies(popularList);
        setTopMovies(topList);
      }
    }

    getMovies();

    return () => {
      isActive = false;
      ac.abort();
    };
  }, []);

  function navigateDetailsPage(): void {
    throw new Error('Function not implemented.');
  }

  // function navigateDetailsPage(item: Movie) {
  //   navigation.navigate('Detail', {id: item.id});
  // }

  // function handleSearchMovie() {
  //   if (input === '') return;

  //   navigation.navigate('Search', { name: input });
  //   setInput('');
  // }

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.searchContainer}>
        <Input
          placeholder="Ex Godfather"
          value={input}
          onChangeText={(text) => setInput(text)}
        />
      </View>

      <View style={styles.sliderMovie}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={({ item }) => (
            <SliderItem
              data={item}
              navigatePage={() => navigateDetailsPage()}
            />
          )}
          keyExtractor={item => String(item.id)}
        />
      </View>
    </View>
  );
}
