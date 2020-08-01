import React, { useReducer, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import { CommonActions } from '@react-navigation/native';
import * as firebase from 'firebase';
import { FacebookAPI } from '../api/Auth';
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
      return { token: action.payload, isLoggedIn:true, errorMessage: '' };
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
      if (user){
        dispatch({ type: 'get_User', payload: !state.isLoggedIn })
        dispatch({ type: 'sign_in', payload: true })
        return;
      }
      return dispatch({ type: 'get_User', payload: false });
    });
  }, []);
/**----------ACTIONS AND ACTION CREATORS--------------------- */

// -----sign up with facebook - updated 7/31/20
const fblogIn = async (props) => {
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
      dispatch({ type: 'sign_in', payload: id })
      return props.navigation.dispatch(CommonActions.navigate({name: 'mains'}));
    } else {
      dispatch({
        type: 'add_error',
        payload: 'window closed',
      });
    }
  } catch ({ message }) {
    dispatch({
      type: 'add_error',
      payload: 'Unable to authenticate with facebook',
    });
  }
};
  // ----sign up with google - updated 7/31/20
  const signInWithGoogle = async (props) => {
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
        props.navigation.dispatch(
          CommonActions.navigate({
            name: 'mains',
            params: {email:result.user.email},
          })
        ); //after Google login redirect to Profile
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
    // -- signin with email password - updated 7/30/20
    const signin = (props,email, password) => {
      email = email.toLowerCase();
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async () => {
          await AsyncStorage.setItem('token', password);
          dispatch({ type: 'sign_in', payload: password });
          return props.navigation.dispatch(CommonActions.navigate({name: 'mains'}));
        })
        .catch((err) => {
          dispatch({
            type: 'add_error',
            payload: 'please check email/password',
          });
        });
    };
    //----------forget password link - updated 7/31/20
    const forgetPasswordLink = (props,email) => {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then((res) => {
          dispatch({
            type: 'add_error',
            payload: 'An email was sent to reset your password',
          });
          props.navigation.dispatch(
            CommonActions.navigate({
              name: 'forgetpassword'
            })
          );
        })
        .catch((err) => {
          dispatch({
            type: 'add_error',
            payload: 'email not in our system',
          });
        });
    };
  /* sign out  ---updated 7/30/20--- */
  const signout = async (props) => {
    await AsyncStorage.removeItem('token');
    firebase.auth().signOut();
    dispatch({
      type: 'sign_out',
    });
    props.navigation.dispatch(
      CommonActions.navigate({
        name: 'Logins'
      })
    );
  };

  /** Email confirmation - updated 7/31/20 */
  const EmailConfirmationProcess=(props,email)=>{
    firebase.auth().createUserWithEmailAndPassword(email,"defaultpassword")
    .then(async()=>{
      await signout(props);
      await firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then((res) => {
          dispatch({
            type: 'add_error',
            payload: 'Please check your email',
          });
          props.navigation.dispatch(
            CommonActions.navigate({
              name: 'Logins'
            })
          );
        })
        .catch((err) => {
          dispatch({
            type: 'add_error',
            payload: 'invalid email',
          });
        });
    })
    .catch((err)=>{
      console.log({errorM:err.message})
      if(err.message==="The email address is already in use by another account."){
        return dispatch({
          type: 'add_error',
          payload: 'email is already registered',
        });
      }
      return dispatch({
        type: 'add_error',
        payload: 'email was not created',
      });
    })
    const user = firebase.auth().currentUser;
    console.log(user)
  }
  /* clear error */
  const clearErrorMessage = () => {
    dispatch({
      type: 'clear_error',
    });
  };


  return (
    <Context.Provider
      value={{data:state,EmailConfirmationProcess,clearErrorMessage,fblogIn,signInWithGoogle,forgetPasswordLink,signin,signout}}
    >
      {props.children}
    </Context.Provider>
  );
}