import {Authenticator} from '@aws-amplify/ui-react-native';
import {Amplify} from 'aws-amplify';
import React from 'react';

import awsExports from '../../../aws-exports';
import {formFields} from './customFields';

Amplify.configure(awsExports);

export const AuthScreen = () => {
  return (
    <Authenticator
      formFields={formFields}
      components={{
        SignIn: Authenticator.SignIn,
      }}
    />
  );
};
