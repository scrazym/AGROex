import {
  confirmUserAttribute,
  type ConfirmUserAttributeInput,
} from 'aws-amplify/auth';
import {Alert} from 'react-native';

export async function handleConfirmUserAttribute({
  userAttributeKey,
  confirmationCode,
}: ConfirmUserAttributeInput) {
  try {
    await confirmUserAttribute({userAttributeKey, confirmationCode});
  } catch (err: any) {
    Alert.alert(err.message || err.errorMessage);
  }
  Alert.alert('Email changed successfully');
}
