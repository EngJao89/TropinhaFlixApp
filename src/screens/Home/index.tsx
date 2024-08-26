import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {styles} from './styles';

import api, {key} from '../../service/api';
import {Movie} from '../../@types/movie';
import {RootStackParamList} from '../../routes/index';
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
  const [loading, setLoading] = useState<boolean>(true);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    let isActive = true;
    const ac = new AbortController();

    async function getMovies() {
      try {
        const [nowData, popularData, topData] = await Promise.all([
          api.get('/movie/now_playing', {
            params: {
              api_key: key,
              language: 'pt_BR',
              page: 1,
            },
            signal: ac.signal,
          }),
          api.get('/movie/popular', {
            params: {
              api_key: key,
              language: 'pt_BR',
              page: 1,
            },
            signal: ac.signal,
          }),
          api.get('/movie/top_rated', {
            params: {
              api_key: key,
              language: 'pt_BR',
              page: 1,
            },
            signal: ac.signal,
          }),
        ]);

        if (isActive) {
          const nowList = getListMovies(15, nowData.data.results);
          const popularList = getListMovies(10, popularData.data.results);
          const topList = getListMovies(5, topData.data.results);

          setBannerMovie(
            nowData.data.results[randomBanner(nowData.data.results)],
          );

          setNowMovies(nowList);
          setPopularMovies(popularList);
          setTopMovies(topList);
          setLoading(false);
        }
      } catch (error) {
        if (isActive) {
          console.error('Failed to fetch movie data:', error);
          setLoading(false);
        }
      }
    }

    getMovies();

    return () => {
      isActive = false;
      ac.abort();
    };
  }, []);

  function navigateDetailsPage(item: Movie) {
    navigation.navigate('detail', {id: item.id});
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Tropinha Flix" />

      <View style={styles.searchContainer}>
        <Input
          placeholder="Ex Godfather"
          value={input}
          onChangeText={text => setInput(text)}
        />
      </View>

      <ScrollView>
        <Text style={styles.title}>Em Cartaz</Text>

        {bannerMovie && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigateDetailsPage(bannerMovie)}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original/${bannerMovie.poster_path}`,
              }}
              style={styles.banner}
            />
          </TouchableOpacity>
        )}

        <View style={styles.sliderMovie}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={nowMovies}
            renderItem={({item}) => (
              <SliderItem
                data={item}
                navigatePage={() => navigateDetailsPage(item)}
              />
            )}
            keyExtractor={item => String(item.id)}
          />
        </View>

        <Text style={styles.title}>Populares</Text>

        <View style={styles.sliderMovie}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={popularMovies}
            renderItem={({item}) => (
              <SliderItem
                data={item}
                navigatePage={() => navigateDetailsPage(item)}
              />
            )}
            keyExtractor={item => String(item.id)}
          />
        </View>

        <Text style={styles.title}>Mais Votados</Text>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={({item}) => (
            <SliderItem
              data={item}
              navigatePage={() => navigateDetailsPage(item)}
            />
          )}
          keyExtractor={item => String(item.id)}
        />
      </ScrollView>
    </View>
  );
}
