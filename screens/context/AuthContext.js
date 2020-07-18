import React, { useReducer, useState } from 'react';
import { AsyncStorage } from 'react-native';
import AuthApi from '../api/Auth';
import { navigate } from '../history';
import * as Google from 'expo-google-app-auth';
const IOS_CLIENT_ID =
  '873390630376-14e27ha0156ol5tr1ukcp199ufi36dfk.apps.googleusercontent.com';
const ANDROID_CLIENT_ID =
  '873390630376-lsr55clto77nu3n6ov26lfe1l9lillv3.apps.googleusercontent.com';

// -- context to access all data
export const Context = React.createContext();

// -- reducer to process actions
const stateReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessages: action.payload };
    case 'sign_up':
      return { errorMessages: '', token: action.payload };
    case 'sign_in':
      return { token: action.payload, errorMessage: '' };
    case 'clear_error':
      return { errorMessages: '' };
    case 'sign_out':
      return { token: null, errorMessage: '' };
    default:
      return state;
  }
};
//-- provider from the context system
export const AuthProvider = (props) => {
  //-- state varable
  const [state, dispatch] = useReducer(stateReducer, {
    token: null,
    errorMessages: '',
  });
  const [bio, setBio] = useState('');
  /* --validators--- */
  // - email validator
  const emailValidator = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).toLowerCase());
  };
  // - password validator
  const minLengthValidator = (value) => {
    return value.length >= 6;
  };

  // automatic signin
  const tryLocalSign = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      dispatch({
        type: 'sign_in',
        payload: token,
      });
      navigate('mains');
    } else {
      navigate('logins');
    }
  };

  /*------------ Actions --------- */

  // -- getprofile
  const getUserProfile=async()=>{
    try {
      const accessToken = await AsyncStorage.getItem('token');
      const emailToken = await AsyncStorage.getItem(accessToken);
      const res = await AuthApi.post('/getuserprofile',{emailToken});
      const { email,mobile,name,username} = res.data.user;
      setBio({email,mobile,name,username,storageEmail:emailToken})
    } catch (error) {
      dispatch({
        type: 'add_error',
        payload: 'unable to get user profile',
      });
    }
  }

  // -- signin
  const signin = async (email, password) => {
    email = email.toLowerCase();
    try {
      const response = await AuthApi.post('/signintoapp', {
        email,
        password,
      });
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem(response.data.token, email);
      dispatch({
        type: 'sign_in',
        payload: response.data.token,
      });
      setBio({email})
      navigate('mains');
    } catch (error) {
      if(JSON.stringify(error).includes(402)){
        dispatch({
          type: 'add_error',
          payload: 'most provide email and password',
        });
      } else if(JSON.stringify(error).includes(403)){
        dispatch({
          type: 'add_error',
          payload: 'email is not registered',
        });
      } else{
        dispatch({
          type: 'add_error',
          payload: 'Unable to Sign in',
        });
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        navigate('signups', result.user.email); //after Google login redirect to Profile
        const accessToken = await AsyncStorage.setItem('token', result.accessToken);
        await AsyncStorage.setItem(accessToken, result.user.email);
        dispatch({
          type: 'sign_up',
          payload: result.accessToken,
        });
        setBio({ email: result.user.email, name: result.user.givenName });
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      dispatch({
        type: 'add_error',
        payload: 'Unable to Sign in',
      });
    }
  };

  /* -- sign up */
  const signup = async (
    name,
    email,
    username,
    password,
    mobile
  ) => {
    email = email.toLowerCase();
    username = username.toLowerCase();
    if (!minLengthValidator(password)) {
      dispatch({
        type: 'add_error',
        payload: 'Incorrect Email Entry/Password too short',
      });
      return;
    }
    try {
      const res = await AuthApi.post('/newusersignup', {
        name,
        email,
        username,
        password,
        mobile,
      });
      //await AsyncStorage.setItem('token',res.data.token);
      dispatch({
        type: 'sign_up',
        payload: res.data.token,
      });
      navigate('logins');
    } catch (error) {
      if(JSON.stringify(error).includes('401')){
         dispatch({
          type: 'add_error',
          payload: 'email has been registered',
        });
      } else if(JSON.stringify(error).includes('402')){
         dispatch({
          type: 'add_error',
          payload: 'username has been registered',
        });
      } else if(JSON.stringify(error).includes('403')){
         dispatch({
          type: 'add_error',
          payload: 'mobile number has been registered',
        });
      } else{
        dispatch({
          type: 'add_error',
          payload: 'unable to create new user',
        });
      }
       
    }
  };

  /* sign out */
  const signout = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({
      type: 'sign_out',
    });
    navigate('logins');
  };

  /* clear error */
  const clearErrorMessage = () => {
    dispatch({
      type: 'clear_error',
    });
  };

  return (
    <Context.Provider
      value={{
        data: state,
        bio,
        signInWithGoogle,
        signup,
        signin,
        signout,
        clearErrorMessage,
        tryLocalSign,
        getUserProfile
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
