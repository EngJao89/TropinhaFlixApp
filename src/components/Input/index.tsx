import {useState} from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import {MagnifyingGlass} from 'phosphor-react-native';
import {useNavigation} from '@react-navigation/native';

import {styles} from './styles';
import {theme} from '../../styles/theme';

type Props = TextInputProps & {
  isLoading?: boolean;
};

export function Input({isLoading = false, ...rest}: Props) {
  const [input, setInput] = useState<string>('');
  const navigation = useNavigation();

  function handleSearchMovie() {
    if (input === '') return;

    navigation.navigate('search', {name: input});
    setInput('');
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor={theme.colors.gray_200}
        {...rest}
      />

      {isLoading && <ActivityIndicator color={theme.colors.blue_light} />}

      <TouchableOpacity style={styles.searchButton} onPress={handleSearchMovie}>
        <MagnifyingGlass color={theme.colors.white} size={16} />
      </TouchableOpacity>
    </View>
  );
}
