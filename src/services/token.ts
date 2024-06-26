import {fetchAuthSession} from 'aws-amplify/auth';
import {storage} from '../../App';

export const currentSession = async () => {
  try {
    const {idToken} = (await fetchAuthSession()).tokens ?? {};
    if (idToken) {
      storage.set('ID_TOKEN', idToken.toString());
    }
  } catch (error) {
    console.log('get error', error);
  }
};

export const refreshCurrentSession = async () => {
  try {
    const {tokens} = await fetchAuthSession({forceRefresh: true});

    if (tokens?.idToken) {
      storage.set('ID_TOKEN', tokens?.idToken.toString());
    }
  } catch (err) {
    console.log(err);
  }
};
