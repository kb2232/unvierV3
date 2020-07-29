import React, { useReducer, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import * as Facebook from 'expo-facebook';
import * as firebase from 'firebase';
import AuthApi, { FacebookAPI } from '../api/Auth';
import { navigate } from '../history';
import * as Google from 'expo-google-app-auth';
const IOS_CLIENT_ID =
  '873390630376-14e27ha0156ol5tr1ukcp199ufi36dfk.apps.googleusercontent.com';

// -- context to access all data
export const Context = React.createContext();

// -- reducer to process actions
const stateReducer = (state, action) => {
  switch (action.type) {
    case 'get_User':
      return { ...state, isLoggedIn: action.payload };
    case 'add_error':
      return { ...state, errorMessages: action.payload };
    case 'sign_up':
      return { errorMessages: '', token: action.payload };
    case 'sign_in':
      return { token: action.payload, errorMessage: '' };
    case 'clear_error':
      return { errorMessages: '' };
    case 'sign_out':
      return { ...state, isLoggedIn: false, token: null, errorMessage: '' };
    default:
      return state;
  }
};
//-- provider from the context system
export const AuthProvider = (props) => {
  //-- state varable
  const [state, dispatch] = useReducer(stateReducer, {
    isLoggedIn: false,
    token: null,
    errorMessages: '',
  });
  useEffect(() => {
    // Initialize Firebase
    firebase.initializeApp({
      apiKey: 'AIzaSyACGu0wnob6ITREptiOL_ZbwDtTphgiU6s',
      authDomain: 'unvieronelife.firebaseapp.com',
      databaseURL: 'https://unvieronelife.firebaseio.com',
      projectId: 'unvieronelife',
      storageBucket: 'unvieronelife.appspot.com',
      messagingSenderId: '736150402588',
      appId: '1:736150402588:web:d770fc01fa10c0138bd1d9',
      measurementId: 'G-QX36PF3KB4',
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) dispatch({ type: 'get_User', payload: !state.isLoggedIn });
      else dispatch({ type: 'get_User', payload: false });
    });
  }, []);

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
      navigate('cancel');
    }
  };

  /*---------------------- Actions --------------------- */

  // -- getprofile
  const getUserProfile = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('token');
      const emailToken = await AsyncStorage.getItem(accessToken);
      const res = await AuthApi.post('/getuserprofile', { emailToken });
      const { email, mobile, name, username, biography } = res.data.user;
      setBio({
        email,
        mobile,
        name,
        username,
        storageEmail: emailToken,
        biography,
      });
    } catch (error) {
      dispatch({
        type: 'add_error',
        payload: 'please log back in',
      });
    }
  };

  // -----sign up with facebook
  const fblogIn = async () => {
    try {
      await Facebook.initializeAsync(FacebookAPI);
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?fields=id,name,email,birthday&access_token=${token}`
        );
        const { name, id, email } = await response.json();
        await AsyncStorage.setItem('token', id);
        await AsyncStorage.setItem(id, email);
        dispatch({
          type: 'sign_in',
          payload: id,
        });
        setBio({ email: email, name: name });
        navigate('mains');
      } else {
        dispatch({
          type: 'add_error',
          payload: 'window closed',
        });
      }
    } catch ({ message }) {
      console.log(message);
      dispatch({
        type: 'add_error',
        payload: 'Unable to authenticate with facebook',
      });
    }
  };

  // ----sign up with google
  const signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        await AsyncStorage.setItem('token', result.accessToken);
        await AsyncStorage.setItem(result.accessToken, result.user.email);
        dispatch({
          type: 'sign_in',
          payload: result.accessToken,
        });
        setBio({
          email: result.user.email,
          name: result.user.givenName,
        });
        navigate('mains', result.user.email); //after Google login redirect to Profile
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: 'add_error',
        payload: 'Unable to Sign in',
      });
    }
  };

  // -- signin with email password
  const signin = (email, password) => {
    email = email.toLowerCase();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        await AsyncStorage.setItem('token', password);
        dispatch({ type: 'sign_in', payload: password });
        setBio({ email });
        navigate('mains');
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: 'add_error',
          payload: 'please check email/password',
        });
      });
  };
  //----------forget password link
  const forgetPasswordLink = (email) => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then((res) => {
        dispatch({
          type: 'add_error',
          payload: 'email sent to reset password',
        });
        navigate('logins');
      })
      .catch((err) => {
        dispatch({
          type: 'add_error',
          payload: 'email not in our system',
        });
      });
  };

  /* -- registration */
  const signup = async (name, email, username, password) => {
    email = email.toLowerCase();
    username = username.toLowerCase();
    if (!minLengthValidator(password) || !emailValidator(email)) {
      dispatch({
        type: 'add_error',
        payload: 'Incorrect Email Entry/Password too short',
      });
      return;
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (res) => {
          console.log({ res });
          await AsyncStorage.setItem('token', password);
          dispatch({
            type: 'sign_up',
            payload: password,
          });
          navigate('logins');
        })
        .catch((err) => {
          console.log({ err });
          dispatch({
            type: 'add_error',
            payload: 'account already created',
          });
        });
      // try {
      // 	const res = await AuthApi.post('/newusersignup', {
      // 		name,
      // 		email,
      // 		username,
      // 		password,
      // 		mobile,
      // 		biography,
      // 	});
      // 	await AsyncStorage.setItem('token',res.data.token);
      // 	dispatch({
      // 		type: 'sign_up',
      // 		payload: res.data.token,
      // 	});
      // 	navigate('logins');
      // } catch (error) {
      // 	if (JSON.stringify(error).includes('401')) {
      // 		dispatch({
      // 			type: 'add_error',
      // 			payload: 'email has been registered',
      // 		});
      // 	} else if (JSON.stringify(error).includes('402')) {
      // 		dispatch({
      // 			type: 'add_error',
      // 			payload: 'username has been registered',
      // 		});
      // 	} else if (JSON.stringify(error).includes('403')) {
      // 		dispatch({
      // 			type: 'add_error',
      // 			payload: 'mobile number has been registered',
      // 		});
      // 	} else {
      // 		dispatch({
      // 			type: 'add_error',
      // 			payload: 'unable to create new user',
      // 		});
      // 	}
      // }
    }
  };

  /* sign out */
  const signout = async () => {
    await AsyncStorage.removeItem('token');
    firebase.auth().signOut();
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
        getUserProfile,
        fblogIn,
        forgetPasswordLink,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
