import {Text, TouchableOpacity} from 'react-native';
import {X} from 'phosphor-react-native';
import {styles} from './styles';
import WebView from 'react-native-webview';

interface ModalLinkProps {
  link: string;
  title: string;
  closeModal: () => void;
}

export function ModalLink({link, title, closeModal}: ModalLinkProps) {
  return (
    <>
      <TouchableOpacity style={styles.backButton} onPress={closeModal}>
        <X size={35} color="#FFF" />
        <Text style={styles.name}>{title}</Text>
      </TouchableOpacity>

      <WebView source={{uri: link}} />
    </>
  );
}
