import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/userAuthSlice';
import { ThemeContext } from '../constants/Themes';
import { RootState } from '../redux/store';
import { performLogoutWithAPI, performLogout } from '../utils/logoutUtils';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ROUTES } from '../constants/routes';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const CustomDrawerContent = (props: any) => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userAuth.user);
  const token = useSelector((state: RootState) => state.userAuth.token);

  // Custom drawer item component that closes drawer on navigation
  const CustomDrawerItem = ({ item, ...rest }: any) => {
    const handlePress = () => {
      props.navigation.closeDrawer();
      if (item.onPress) {
        item.onPress();
      }
    };

    const isFocused = props.state && props.state.routeNames && props.state.routeNames[props.state.index] === item.routeName;
    const activeStyle = isFocused
      ? { backgroundColor: theme.activeMenuBackgroundColor.color, borderRadius: 5 }
      : {};

    return (
      <TouchableOpacity
        style={[styles.drawerItem, activeStyle, rest.style]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        {item.icon && (
          <View style={styles.iconContainer}>
            {item.icon({ color: rest.color, size: 22 })}
          </View>
        )}
        <Text style={[styles.drawerItemText, { color: rest.color }]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  // Logout button handler
  const handleLogout = async () => {
    try {
      if (token && user?.id) {
        // Use the comprehensive logout utility
        await performLogoutWithAPI(token, user.id, apiUrl);
        console.log('Logout completed successfully');
        
        // Close drawer after successful logout
        props.navigation.closeDrawer();
      } else {
        console.warn('No token or user ID available for logout');
        // Fallback to local logout if no token/user ID
        await performLogout();
        props.navigation.closeDrawer();
      }
    } catch (error: any) {
      console.error('Logout error:', error);
      
      // Even if there's an error, ensure local logout happens
      try {
        await performLogout();
        props.navigation.closeDrawer();
      } catch (fallbackError) {
        console.error('Fallback logout also failed:', fallbackError);
      }
    }
  };

  return (
    <SafeAreaView style={[styles.container, theme.background]}>
      <DrawerContentScrollView {...props} style={[styles.scrollView, theme.background]}>  
        {/* Home (standalone) */}
        <View style={[styles.card, theme.card, theme.shadow]}>
          <CustomDrawerItem
            item={{
              label: 'Home',
              icon: ({ color, size }: { color: string; size: number }) => (
                <Ionicons name="home-outline" size={size} color={color} />
              ),
              onPress: () => props.navigation.navigate(ROUTES.HOME),
              routeName: ROUTES.HOME,
            }}
            color={theme.text.color}
            {...props}
          />
        </View>
        {/* Card 1: Profile & Edit Profile */}
        <View style={[styles.card, theme.card, theme.shadow]}>
          <CustomDrawerItem
            item={{
              label: 'Profile',
              icon: ({ color, size }: { color: string; size: number }) => (
                <Ionicons name="person-outline" size={size} color={color} />
              ),
              onPress: () => props.navigation.navigate(ROUTES.PROFILE),
              routeName: ROUTES.PROFILE,
            }}
            color={theme.text.color}
            {...props}
          />
          <CustomDrawerItem
            item={{
              label: 'Edit Profile',
              icon: ({ color, size }: { color: string; size: number }) => (
                <Ionicons name="create-outline" size={size} color={color} />
              ),
              onPress: () => props.navigation.navigate(ROUTES.EDIT_PROFILE),
              routeName: ROUTES.EDIT_PROFILE,
            }}
            color={theme.text.color}
            {...props}
          />
        </View>
        {/* Card 2: Subscription,Subscription Price,My Subscribers,My Subscription */}
        <View style={[styles.card, theme.card, theme.shadow]}>
          <Text style={[theme.mute_text,{fontSize:12,fontWeight:'600',marginBottom:5}]}>SUBSCRIPTION</Text>
          <CustomDrawerItem
            item={{
              label: 'Subscription price',
              icon: ({ color, size }: { color: string; size: number }) => (
                <Ionicons name="pricetag" size={size} color={color} />
              ),
              onPress: () => props.navigation.navigate(ROUTES.SUBSCRIPTION_PRICE),
              routeName: ROUTES.SUBSCRIPTION_PRICE,
            }}
            color={theme.text.color}
            {...props}
          />
          <CustomDrawerItem
            item={{
              label: 'My subscribers',
              icon: ({ color, size }: { color: string; size: number }) => (
                <FontAwesome6 name="users" size={size} color={color} />
              ),
              onPress: () => props.navigation.navigate(ROUTES.MY_SUBSCRIBERS),
              routeName: ROUTES.MY_SUBSCRIBERS,
            }}
            color={theme.text.color}
            {...props}
          />
          <CustomDrawerItem
            item={{
              label: 'My Subscriptions',
              icon: ({ color, size }: { color: string; size: number }) => (
                <FontAwesome6 name="user-check" size={size} color={color} />
              ),
              onPress: () => props.navigation.navigate(ROUTES.MY_SUBSCRIPTION),
              routeName: ROUTES.MY_SUBSCRIPTION,
            }}
            color={theme.text.color}
            {...props}
          />
        </View>
        {/* Card 3: Privacy and Security, Password, Block Countries, Restricted Users */}
        <View style={[styles.card, theme.card, theme.shadow]}>
          <Text style={[theme.mute_text,{fontSize:12,fontWeight:'600',marginBottom:5}]}>PRIVACY AND SECURITY</Text>
          <CustomDrawerItem
            item={{
              label: 'Privacy and Security',
              icon: ({ color, size }: { color: string; size: number }) => (
                <Ionicons name="shield-checkmark-outline" size={size} color={color} />
              ),
              onPress: () => props.navigation.navigate(ROUTES.PRIVACY_AND_SECURITY),
              routeName: ROUTES.PRIVACY_AND_SECURITY,
            }}
            color={theme.text.color}
            {...props}
          />
          <CustomDrawerItem
            item={{
              label: 'Password',
              icon: ({ color, size }: { color: string; size: number }) => (
                <Ionicons name="key-outline" size={size} color={color} />
              ),
              onPress: () => props.navigation.navigate(ROUTES.PASSWORD),
              routeName: ROUTES.PASSWORD,
            }}
            color={theme.text.color}
            {...props}
          />
          <CustomDrawerItem
            item={{
              label: 'Block Countries',
              icon: ({ color, size }: { color: string; size: number }) => (
                <Ionicons name="earth-outline" size={size} color={color} />
              ),
              onPress: () => props.navigation.navigate(ROUTES.BLOCK_COUNTRIES),
              routeName: ROUTES.BLOCK_COUNTRIES,
            }}
            color={theme.text.color}
            {...props}
          />
          <CustomDrawerItem
            item={{
              label: 'Restricted Users',
              icon: ({ color, size }: { color: string; size: number }) => (
                <MaterialCommunityIcons name="account-cancel-outline" size={size} color={color} />
              ),
              onPress: () => props.navigation.navigate(ROUTES.RESTRICTED_USERS),
              routeName: ROUTES.RESTRICTED_USERS,
            }}
            color={theme.text.color}
            {...props}
          />
        </View>
      </DrawerContentScrollView>
      {/* Logout Button at Bottom */}
      <View style={[styles.logoutSection, theme.card, theme.shadow]}>
        <TouchableOpacity
          style={[styles.logoutButton, theme.button]}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Ionicons name="log-out-outline" size={24} color={theme.button.color as string} />
          <Text style={[styles.logoutText, { color: theme.button.color as string }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  userProfileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    margin: 16,
    borderRadius: 12,
  },
  userProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    opacity: 0.7,
  },
  userStatus: {
    fontSize: 12,
    opacity: 0.6,
    fontStyle: 'italic',
    marginTop: 2,
  },
  drawerItems: {
    flex: 1,
  },
  drawerItemContainer: {
    marginVertical: 4,
    borderRadius: 8,
  },
  drawerItem: {
    flexDirection: 'row',
    borderRadius: 8,
    marginBottom: 10, // Add vertical gap between items
    padding:5
  },
  iconContainer: {
    marginRight: 12,
    width: 24,
    alignItems: 'center',
  },
  drawerItemText: {
    fontSize: 15,
    fontWeight: '400',
  },
  logoutSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingBottom:40
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  privacyCard: {
    padding:10,
    marginTop:10
  },
  privacyHeading: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 10,
  },
  card: {
   
    marginVertical: 10,
    padding:10,
  },
});

export default CustomDrawerContent; 