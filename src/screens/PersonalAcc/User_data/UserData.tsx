import {faPenClip} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  deleteUser,
  fetchUserAttributes,
  updateUserAttributes,
} from 'aws-amplify/auth';
import React, {FC, useEffect, useState} from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

import {
  AppText,
  ButtonStyled,
  ConfirmEmailModal,
  ConfirmModal,
  IconManageModal,
  Loading,
  UserIcon,
} from '../../../components';
import {HeaderBack} from '../../../components/customHeaderBar/HeaderBack';
import {Colors} from '../../../constants/Colors';
import {UserDataScreenProps} from '../../../navigation/navigators/Stacks/UserStack/types';
import api from '../../../services/api';
import {UserDataStyles} from './styles';

export const UserDataScreen: FC<UserDataScreenProps> = ({navigation}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [oldName, setOldName] = useState('');
  const [oldSecondNmae, setOldSecondName] = useState('');
  const [oldEmail, setOldEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userSecondName, setUserSecondName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userIcon, setUserIcon] = useState('');
  const [isChanges, setIsChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [isChangeEmails, setIsChangeEmails] = useState(false);
  const [isConfirmEmail, setIsConfirmEmail] = useState(false);
  const [userId, setUserId] = useState('');
  const [formData, setFormData] = useState({});
  const [isChangeIcon, setIsChangeUserIcon] = useState(false);

  async function handleDeleteUser() {
    try {
      await deleteUser();
    } catch (error: unknown) {
      if (typeof error === 'string') {
        Alert.alert(error);
      } else if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  async function handleFetchUserAttributes() {
    try {
      const userAttributes = await fetchUserAttributes();
      setOldSecondName(userAttributes.family_name || '');
      setOldName(userAttributes.given_name || '');
      setOldEmail(userAttributes.email || '');
      setUserSecondName(userAttributes.family_name || '');
      setUserName(userAttributes.given_name || '');
      setUserEmail(userAttributes.email || '');
      setUserId(userAttributes.sub || '');
      const res = await api.getData(`users/${userAttributes.sub}`);
      setUserIcon(res.data.avatarUrl);
    } catch (error: unknown) {
      if (typeof error === 'string') {
        Alert.alert(error);
      } else if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  async function handleUpdateUserAttribute(
    firstName: string,
    secondName: string,
    email: string,
  ) {
    try {
      setIsLoading(true);
      const userAttributes = await fetchUserAttributes();
      const output = await updateUserAttributes({
        userAttributes: {
          given_name: firstName,
          family_name: secondName,
          email: email,
        },
      });
      isChangeIcon &&
        (await api.post(`users/${userId}/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }));
      setIsLoading(false);
      setIsChanges(false);
      !isChangeEmails
        ? Alert.alert('Changes saved successfully')
        : setIsConfirmEmail(true);
    } catch (err: any) {
      Alert.alert(err.message || err.errorMessage);
    }
  }

  const handleChangeData = (text: string, type: string) => {
    type === 'name'
      ? setUserName(text)
      : type === 'secondName'
        ? setUserSecondName(text)
        : handleMailModal(text);
  };
  const isChagesField = () => {
    oldEmail.trim() !== userEmail.trim() ||
    oldName.trim() !== userName.trim() ||
    oldSecondNmae.trim() !== userSecondName.trim()
      ? setIsChanges(true)
      : setIsChanges(false);
    oldEmail.trim() !== userEmail.trim()
      ? setIsChangeEmails(true)
      : setIsChangeEmails(false);
  };
  const NewImgFromLibrary = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result.assets) {
      setUserIcon(result.assets[0].uri || '');
      setIsChanges(true);
      setIsChangeUserIcon(true);
      const formData = new FormData();

      formData.append('file', {
        uri:
          Platform.OS === 'android'
            ? result.assets[0].uri
            : result.assets[0].uri?.replace('file://', ''),
        name: result.assets[0].fileName,
        type: result.assets[0].type,
      } as any);
      setFormData(formData);

      toggleVisible();
    }
  };
  const handleMailModal = (text: string) => {
    setUserEmail(text);
  };
  const toggleConfirmVisible = () => {
    setIsConfirmEmail(!isConfirmEmail);
  };
  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  const toggleDeleteModal = () => {
    setDeleteVisible(!deleteVisible);
  };
  const handleDeleteIcon = () => {
    setUserIcon('');
    toggleVisible();
  };
  const handleUpdateUserAttributes = () => {
    isChanges
      ? handleUpdateUserAttribute(userName, userSecondName, userEmail)
      : Alert.alert('No any changes were made');
  };

  useEffect(() => {
    isChagesField();
  }, [userName, userSecondName, userEmail]);
  useEffect(() => {
    handleFetchUserAttributes();
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <View style={UserDataStyles.mainWrapper}>
      <HeaderBack text="Personal data" onPress={() => navigation.goBack()} />
      <ScrollView>
        <View style={UserDataStyles.userInfoWrapper}>
          <View>
            <View style={UserDataStyles.userIconBgWrapper}>
              <TouchableOpacity
                onPress={toggleVisible}
                style={UserDataStyles.changeIcon}>
                <FontAwesomeIcon size={12} icon={faPenClip} />
              </TouchableOpacity>
              <UserIcon
                user={`${userName} ${userSecondName}`}
                userIcon={userIcon}
              />
            </View>
            <View style={UserDataStyles.fieldsWrapper}>
              <View>
                <TextInput
                  value={userName}
                  onChangeText={e => handleChangeData(e, 'name')}
                  style={UserDataStyles.input}
                />
                <AppText
                  variant="label12_400"
                  color={Colors.GRAY_PRIMARY}
                  style={UserDataStyles.label}>
                  First Name
                </AppText>
              </View>
              <View style={UserDataStyles.inputWrapperMt20}>
                <TextInput
                  value={userSecondName}
                  onChangeText={e => handleChangeData(e, 'secondName')}
                  style={UserDataStyles.input}
                />
                <AppText
                  variant="label12_400"
                  color={Colors.GRAY_PRIMARY}
                  style={UserDataStyles.label}>
                  Second Name
                </AppText>
              </View>
              <View style={UserDataStyles.inputWrapperMt20}>
                <TextInput
                  autoCapitalize="none"
                  value={userEmail}
                  onChangeText={e => handleChangeData(e, 'email')}
                  style={UserDataStyles.input}
                />
                <AppText
                  variant="label12_400"
                  color={Colors.GRAY_PRIMARY}
                  style={UserDataStyles.label}>
                  Email
                </AppText>
              </View>
            </View>
          </View>

          <View style={UserDataStyles.wrapperFlEnd}>
            <ButtonStyled
              onPress={() => handleUpdateUserAttributes()}
              disabled={!isChanges}
              title="Save changes"
            />
            <View style={UserDataStyles.btnWrapperMt}>
              <ButtonStyled
                style="transparent"
                onPress={toggleDeleteModal}
                title="Delete Account"
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <IconManageModal
        toggle={toggleVisible}
        pickImg={NewImgFromLibrary}
        visible={isVisible}
        deleteIcon={handleDeleteIcon}
      />
      <ConfirmModal
        visible={deleteVisible}
        toggle={toggleDeleteModal}
        deleteUser={handleDeleteUser}
      />
      <ConfirmEmailModal
        visible={isConfirmEmail}
        toggle={toggleConfirmVisible}
      />
    </View>
  );
};
