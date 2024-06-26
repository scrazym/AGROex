import {Platform} from 'react-native';

export const BASE_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:8080/api/v1/'
    : 'http://agroex-elb-446797069.us-east-1.elb.amazonaws.com/team2/api/v1/';
// 'http://localhost:8080/api/v1/';

//Please no need to comment this)) This needs for running different device
// IOS physycal device
// 'http://192.168.100.3:8080/api/v1/'
//Old AWS backend
// 'http://test-alb-t2-1554909414.eu-central-1.elb.amazonaws.com:8080/api/v1/';

// http://agroex-elb-446797069.us-east-1.elb.amazonaws.com/team2/api/v1/swagger-ui/index
