import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { RootState } from "../redux/store";
import { ROUTES } from "../constants/routes";
import { ThemeContext, lightTheme, darkTheme } from "../constants/Themes";
import CustomDrawerContent from "../components/CustomDrawerContent";

// Screens
import LoginScreen from "../screens/Auth/LoginScreen/LoginScreen";
import HomeScreen from "../screens/Main/HomeScreen/HomeScreen";
import ProfileScreen from "../screens/Main/ProfileScreen/ProfileScreen";
import EditProfileScreen from "../screens/Main/EditProfileScreen/EditProfileScreen";
import ExploreScreen from "../screens/Main/ExploreScreen/ExploreScreen";
import ReelsScreen from "../screens/Main/ReelsScreen/ReelsScreen";
import MessageScreen from "../screens/Main/MessageScreen/MessageScreen";
import NotificationScreen from "../screens/Main/NotificationScreen/NotificationScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen/SignUpScreen";
import PrivacyAndSecurityScreen from '../screens/Main/PrivacyAndSecurityScreen/PrivacyAndSecurityScreen';
import PasswordScreen from '../screens/Main/PasswordScreen/PasswordScreen';
import BlockCountriesScreen from "../screens/Main/BlockCountriesScreen/BlockCountriesScreen";
import RestrictedUsersScreen from "../screens/Main/RestrictedUsersScreen/RestrictedUsersScreen";
import SubscriptionPriceScreen from "../screens/Main/SubscriptionPriceScreen/SubscriptionPriceScreen";
import MySubscribersScreen from "../screens/Main/MySubscribersScreen/MySubscribersScreen";
import MySubscriptions from "../screens/Main/MySubscriptions/MySubscriptions";
// Add these imports if the components exist or use placeholders if not implemented yet

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Theme toggle context
const ThemeToggleContext = React.createContext({
  toggleTheme: () => {},
  isDark: false,
});

const ThemeToggleButton = () => {
  const { toggleTheme, isDark } = useContext(ThemeToggleContext);
  return (
    <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 16 }}>
      <Ionicons
        name={isDark ? "sunny" : "moon"}
        size={24}
        color={isDark ? "#FFD600" : "#222"}
      />
    </TouchableOpacity>
  );
};

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={ROUTES.SIGNUP} component={SignUpScreen} />
    <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
  </Stack.Navigator>
);

const MainTabs = () => {
  const theme = useContext(ThemeContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "help";

          if (route.name === ROUTES.HOME) {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === ROUTES.EXPLORE) {
            iconName = focused ? "compass" : "compass-outline";
          } else if (route.name === ROUTES.REELS) {
            iconName = focused ? "film" : "film-outline";
          } else if (route.name === ROUTES.MESSAGE) {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
          } else if (route.name === ROUTES.NOTIFICATION) {
            iconName = focused ? "notifications" : "notifications-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={theme.iconColor.color}
            />
          );
        },
        tabBarActiveTintColor: String(theme.iconColor.color),
        tabBarInactiveTintColor: String(theme.text.color) + "99",
        tabBarStyle: {
          backgroundColor: theme.card.backgroundColor,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Tab.Screen name={ROUTES.EXPLORE} component={ExploreScreen} />
      <Tab.Screen name={ROUTES.REELS} component={ReelsScreen} />
      <Tab.Screen name={ROUTES.MESSAGE} component={MessageScreen} />
      <Tab.Screen name={ROUTES.NOTIFICATION} component={NotificationScreen} />
    </Tab.Navigator>
  );
};

const MainDrawer = () => {
  const theme = useContext(ThemeContext);
  return (
    <Drawer.Navigator
      initialRouteName={ROUTES.SUBSCRIPTION_PRICE}
      screenOptions={{
        headerRight: () => <ThemeToggleButton />,
        
      }}
      // Crucial: Use your custom drawer content here
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name={ROUTES.HOME}
        component={MainTabs}
        options={{
          headerStyle: {
            backgroundColor: theme.card.backgroundColor, // Light Blue header for Home
          },
          headerTintColor: String(theme.iconColor.color), // Text color for the header title and back button
        }}
      />
      <Drawer.Screen
        name={ROUTES.PROFILE}
        component={ProfileScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.card.backgroundColor, // Light Blue header for Home
          },
          headerTintColor: String(theme.iconColor.color), // Text color for the header title and back button
        }}
      />
      <Drawer.Screen 
        name={ROUTES.EDIT_PROFILE} 
        component={EditProfileScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.card.backgroundColor, // Light Blue header for Home
          },
          headerTintColor: String(theme.iconColor.color), // Text color for the header title and back button
          headerShown: true, // Hide header since EditProfileScreen has its own
        }}
      />
       <Drawer.Screen 
        name={ROUTES.SUBSCRIPTION_PRICE}
        component={SubscriptionPriceScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.card.backgroundColor, // Light Blue header for Home
          },
          headerTintColor: String(theme.iconColor.color), // Text color for the header title and back button
          headerShown: true
        }}
      />
       <Drawer.Screen 
        name={ROUTES.MY_SUBSCRIBERS}
        component={MySubscribersScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.card.backgroundColor, // Light Blue header for Home
          },
          headerTintColor: String(theme.iconColor.color), // Text color for the header title and back button
          headerShown: true
        }}
      />
      <Drawer.Screen 
        name={ROUTES.MY_SUBSCRIPTION}
        component={MySubscriptions}
        options={{
          headerStyle: {
            backgroundColor: theme.card.backgroundColor, // Light Blue header for Home
          },
          headerTintColor: String(theme.iconColor.color), // Text color for the header title and back button
          headerShown: true
        }}
      />
      <Drawer.Screen 
        name={ROUTES.PRIVACY_AND_SECURITY}
        component={PrivacyAndSecurityScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.card.backgroundColor, // Light Blue header for Home
          },
          headerTintColor: String(theme.iconColor.color), // Text color for the header title and back button
          headerShown: true
        }}
      />
      <Drawer.Screen 
        name={ROUTES.PASSWORD}
        component={PasswordScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.card.backgroundColor, // Light Blue header for Home
          },
          headerTintColor: String(theme.iconColor.color), // Text color for the header title and back button
          headerShown: true,
        }}
      />
      <Drawer.Screen 
        name={ROUTES.BLOCK_COUNTRIES}
        component={BlockCountriesScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.card.backgroundColor, // Light Blue header for Home
          },
          headerTintColor: String(theme.iconColor.color), // Text color for the header title and back button
          headerShown: true,
        }}
      />
      <Drawer.Screen 
        name={ROUTES.RESTRICTED_USERS}
        component={RestrictedUsersScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.card.backgroundColor, // Light Blue header for Home
          },
          headerTintColor: String(theme.iconColor.color), // Text color for the header title and back button
          headerShown: true,
        }}
      />
    </Drawer.Navigator>
  );
};

const AppNavigator = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.userAuth);
  const themeContext = useContext(ThemeContext);
  const [isDark, setIsDark] = React.useState(
    themeContext.background.backgroundColor ===
      darkTheme.background.backgroundColor
  );
  const [theme, setTheme] = React.useState(isDark ? darkTheme : lightTheme);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    setTheme((prev) => (prev === darkTheme ? lightTheme : darkTheme));
  };

  React.useEffect(() => {
    setTheme(isDark ? darkTheme : lightTheme);
  }, [isDark]);

  return (
    <ThemeToggleContext.Provider value={{ toggleTheme, isDark }}>
      <ThemeContext.Provider value={theme}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
              <Stack.Screen name={ROUTES.MAIN_DRAWER} component={MainDrawer} />
            ) : (
              <Stack.Screen name={ROUTES.AUTH_STACK} component={AuthStack} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeContext.Provider>
    </ThemeToggleContext.Provider>
  );
};

export default AppNavigator;
