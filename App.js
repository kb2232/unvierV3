import 'react-native-gesture-handler'; //must be at the top
import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthProvider, Context } from './screens/context/AuthContext';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegistrationScreen';
import ForgetPasswordScreen from './screens/Forgetpassword';
import PrivacyScreen from './screens/policy/privacypolicy';
import TermsScreen from './screens/policy/termsandcondition';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function FeedScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Feed!</Text>
		</View>
	);
}
function MessagesScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Messages!</Text>
		</View>
	);
}
function Home() {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Feed" component={FeedScreen} />
			<Tab.Screen name="Messages" component={MessagesScreen} />
		</Tab.Navigator>
	);
}

function App() {
	const {
		data: { isLoggedIn },
  } = useContext(Context);
  console.log({isLoggedIn})
	return (
		<NavigationContainer>
			<Stack.Navigator>
				{isLoggedIn ? (
					<>
						<Stack.Screen options={{ headerShown: false }} name="mains" component={ProfileScreen} />
						<Stack.Screen name="home" component={Home} />
					</>
				) : (
					<>
						<Stack.Screen options={{ headerShown: false }} name="Unvier" component={LoadingScreen} />
						<Stack.Screen options={{ headerShown: false }} name="signups" component={RegisterScreen} />
						<Stack.Screen
							options={{
								headerShown: true,
								title: '',
								headerTransparent: true,
								headerBackTitleVisible: false,
							}}
							name="Logins"
							component={LoginScreen}
						/>
						<Stack.Screen
							options={{
								headerShown: true,
								title: '',
								headerTransparent: true,
								headerBackTitleVisible: false,
							}}
							name="forgetpassword"
							component={ForgetPasswordScreen}
						/>
						<Stack.Screen options={{ headerShown: false }} name="privacypolicy" component={PrivacyScreen} />
						<Stack.Screen options={{ headerShown: false }} name="termscondition" component={TermsScreen} />
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
export default () => {
	return (
		<AuthProvider>
			<App />
		</AuthProvider>
	);
};
