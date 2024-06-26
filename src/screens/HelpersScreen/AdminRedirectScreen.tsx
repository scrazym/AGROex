import {useAuthenticator} from '@aws-amplify/ui-react-native';
import {useCallback} from 'react';
import {Alert, Image, Linking, View} from 'react-native';

import {AppText, ButtonStyled} from '../../components';
import {textColorStyles} from '../../components/AppText/styles';
import {adminRedirectStyle} from './styles/AdminRedirectStyle';

export const AdminredirectScreen = () => {
  const {signOut} = useAuthenticator(context => [context.user]);

  const url = 'http://localhost:3000/login';
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);
  return (
    <View style={adminRedirectStyle.wrapper}>
      <View>
        <AppText
          variant="label18_400"
          style={[{textAlign: 'center'}, textColorStyles['#38999B']]}>
          To access the admin role and manage the website, please visit the web
          version and log in with your credentials. From there, you'll be able
          to make any necessary updates and changes to the site. Thank you for
          your attention to this matter.
        </AppText>
      </View>
      <Image
        style={adminRedirectStyle.image}
        source={{
          uri: 'https://tenor.com/ru/view/bubududu-panda-gif-21332145.gif',
        }}
      />
      <View style={adminRedirectStyle.btn}>
        <ButtonStyled
          title="Go to web version"
          icon="confirm"
          onPress={() => handlePress()}
        />
      </View>
      <View style={adminRedirectStyle.btn}>
        <ButtonStyled
          title="Log out"
          icon="arrowBack"
          style="transparent"
          onPress={() => signOut()}
        />
      </View>
    </View>
  );
};
