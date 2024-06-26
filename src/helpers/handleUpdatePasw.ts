import {updatePassword, type UpdatePasswordInput} from 'aws-amplify/auth';
import {Alert} from 'react-native';

export async function handleUpdatePassword({
  oldPassword,
  newPassword,
}: UpdatePasswordInput) {
  try {
    await updatePassword({oldPassword, newPassword});
    Alert.alert('Password changed successfully');
  } catch (err: any) {
    Alert.alert(err.message || err.errorMessage);
  }
}
