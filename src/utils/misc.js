import {AsyncStorage} from 'react-native';

export const FIREBASEURL = `https://rn-nba-app-fbf9a.firebaseio.com`;
export const APIKEY = `AIzaSyD8ptTz61XcKzKKsiVvKmVPmvgEqDcjjs8`;
export const SIGNUP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`;
export const SIGNIN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`;
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`;

export const setTokens = (values, cb) => {
  const dateNow = new Date();
  const expiration = dateNow.getTime() + 3600 * 1000;

  AsyncStorage.multiSet([
    ['@nba_app@token', values.token],
    ['@nba_app@refreshtoken', values.refToken],
    ['@nba_app@exptoken', expiration.toString()],
    ['@nba_app@uidtoken', values.uid],
  ]).then(response => {
    cb();
  });
};

export const getTokens = cb => {
  AsyncStorage.multiGet([
    '@nba_app@token',
    '@nba_app@refreshtoken',
    '@nba_app@exptoken',
    '@nba_app@uidtoken',
  ]).then(response => {
    cb(response);
  });
};

export const convertFirebase = data => {
  const newData = [];

  for (let key in data) {
    newData.push({
      ...data[key],
      id: key,
    });
  }
  return newData;
};

export const findTeamData = (itemId, teams) => {
  const value = teams.find(team => {
    return team.id === itemId;
  });

  return value;
};
