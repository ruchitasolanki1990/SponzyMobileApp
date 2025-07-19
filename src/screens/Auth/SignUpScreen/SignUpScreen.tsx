// SignUpScreen.tsx
// This file implements the sign-up page for the Sponzy project, including validation, theming, and navigation to the login page.

import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeContext } from '../../../constants/Themes';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import GradientBackground from '../../../components/GradientBackground';
import { signupStart, signupSuccess, signupFailure, resetSignupState } from '../../../redux/slices/signupSlice';
import { signupSuccess as authSignupSuccess } from '../../../redux/slices/userAuthSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import styles from './SignUpScreen.style';
import * as Device from 'expo-device';
import axios from 'axios';

interface SignUpScreenProps {}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignUpScreen: React.FC<SignUpScreenProps> = () => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  console.log("apiUrl", apiUrl);
  
  const { loading, success, error } = useSelector((state: RootState) => state.signup);
  console.log("error",error)
  const { isAuthenticated } = useSelector((state: RootState) => state.userAuth);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [touched, setTouched] = useState({ fullName: false, email: false, password: false, terms: false });
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState('IN');
  const [userIP, setUserIP] = useState('103.240.76.204');

  // Validation
  const errors = {
    fullName:
      !fullName
        ? 'Full name is required'
        : fullName.length > 100
          ? 'Full name must be at most 100 characters'
          : !/^[a-zA-Z\s]+$/.test(fullName)
            ? 'Full name can only contain letters and spaces'
            : '',
    email: !emailRegex.test(email) ? 'Invalid email format' : '',
    password: password.length < 6 ? 'Password must be at least 6 characters' : '',
    terms: !agreeTerms ? 'You must agree to the terms' : '',
  };

  const isFormValid = !errors.fullName && !errors.email && !errors.password && agreeTerms;

  const fetchCountryCode = async () => {
    try {
      // Fetch IP and geolocation data
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      setCountryCode(data.country_code || 'IN');
      setUserIP(data.ip || '103.240.76.204');
      console.log('Country Code:', data.country_code || 'IN');
      console.log('ip:', data.ip);
    } catch (error) {
      console.error('Error fetching country code:', error);
      console.log('Error', 'Could not retrieve country code');
    }
  };

  const getDeviceInfo = async () => {
    try {
      const info = {
        brand: Device.brand, // e.g., "Apple" or "Samsung"
        modelName: Device.modelName, // e.g., "iPhone 13" or "Galaxy S21"
        manufacturer: Device.manufacturer, // e.g., "Apple Inc."
        deviceName: Device.deviceName, // User-assigned device name
        osName: Device.osName, // e.g., "iOS" or "Android"
        osVersion: Device.osVersion, // e.g., "15.0" or "12"
        platformApiLevel: Device.platformApiLevel, // Android API level (Android only)
        isDevice: Device.isDevice, // true if physical device, false if emulator
        totalMemory: Device.totalMemory, // Total memory in bytes
      };
      console.log('Device Info:', info);
    } catch (error) {
      console.error('Error fetching device info:', error);
    }
  };

  useEffect(() => {
    fetchCountryCode();
    getDeviceInfo();
  }, []);

  // Handle successful signup and navigation
  useEffect(() => {
    if (success && isAuthenticated) {
      // Reset signup state after successful registration
      dispatch(resetSignupState());
      // Navigation will be handled automatically by the AppNavigator based on isAuthenticated state
    }
  }, [success, isAuthenticated, dispatch]);

  const handleSignUp = async () => {
    if (isFormValid) {
      try {
        // Dispatch signup start action
        dispatch(signupStart({ fullName, email, password }));
        
        // Prepare signup data with required parameters
        const signupData = {
          name: fullName,
          email: email,
          password: password,
          agree_gdpr: agreeTerms ? "1" : "0",
          lang: "en",
          country: countryCode,
          ip: userIP
        };

        console.log('Signup Data:', signupData);

        // Make API call to signup endpoint
        const response = await axios.post(`${apiUrl}/register`, signupData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Signup Response:', response.data);

        // Handle successful response
        if (response.data.success) {
          const apiResponse = {
            token: response.data.token || response.data.access_token,
            user: {
              id: response.data.user?.id || response.data.user_id,
              name: response.data.user?.name || fullName,
              email: response.data.user?.email || email,
              username: response.data.user?.username,
              avatar_image: response.data.user?.avatar_image,
              cover_image: response.data.user?.cover_image,
              status: response.data.user?.status,
              profession: response.data.user?.profession,
              language: response.data.user?.language,
              birthday: response.data.user?.birthday,
              gender: response.data.user?.gender,
              website: response.data.user?.website,
              category: response.data.user?.category,
              story: response.data.user?.story,
              bio: response.data.user?.bio,
              location: response.data.user?.location,
              phone: response.data.user?.phone,
              company: response.data.user?.company,
              country: response.data.user?.country,
              city: response.data.user?.city,
              address: response.data.user?.address,
              postalCode: response.data.user?.postal_code,
              facebookLink: response.data.user?.facebook_link,
              twitterLink: response.data.user?.twitter_link,
              instagramLink: response.data.user?.instagram_link,
              youtubeLink: response.data.user?.youtube_link,
              pinterestLink: response.data.user?.pinterest_link,
              githubLink: response.data.user?.github_link,
              snapchatLink: response.data.user?.snapchat_link,
              telegramLink: response.data.user?.telegram_link,
              twitchLink: response.data.user?.twitch_link,
              discordLink: response.data.user?.discord_link,
              vkLink: response.data.user?.vk_link,
              redditLink: response.data.user?.reddit_link,
              spotifyLink: response.data.user?.spotify_link,
              threadsLink: response.data.user?.threads_link,
              kickLink: response.data.user?.kick_link,
            }
          };
          
          // Dispatch success actions
          dispatch(signupSuccess(apiResponse));
          dispatch(authSignupSuccess(apiResponse));
        }
        //  else {
        //   console.log(response)
        //   throw new Error(response.data.errors.email || 'Signup failed');
        // }
        
      } catch (error: any) {
        console.error('Signup Error:', error);
        const errorMessage = error.response?.data?.errors || 'Signup failed...';
        dispatch(signupFailure(errorMessage));
      }
    }
  };

  const handleSocialLogin = (provider: string) => {
    alert(`Sign up with ${provider} (not implemented)`);
  };

  return (
    <GradientBackground colors={["#1976d2", "#00C6FB", "#FFFFFF"]}>
      <KeyboardAvoidingView
       keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 100} 
      // behavior={Platform.OS === 'ios' ? 'padding' :'height'} style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={[styles.card, theme.card, theme.shadow,theme.background]} >
            <Text style={[styles.title, theme.text]}>Sign up</Text>

            {/* Error Message */}
            {error && (
              <View style={styles.errorContainer}>
                <Text style={[styles.errorText, theme.text]}>{error}</Text>
              </View>
            )}

            {/* Full Name */}
            <TextInput
              style={[styles.input, theme.text, theme.card, { borderColor: errors.fullName && touched.fullName ? 'red' : theme.border.borderColor }]}
              placeholder="Full Name"
              placeholderTextColor={String(theme.text.color) + '99'}
              value={fullName}
              maxLength={100}
              keyboardType="default"
              onChangeText={text => {
                // Only allow letters and spaces, remove numbers and special chars
                const filtered = text.replace(/[^a-zA-Z\s]/g, '');
                setFullName(filtered);
              }}
              onBlur={() => setTouched(t => ({ ...t, fullName: true }))}
              editable={!loading}
            />
            {errors.fullName && touched.fullName && <Text style={styles.error}>{errors.fullName}</Text>}

            {/* Email */}
            <TextInput
              style={[styles.input, theme.text, theme.card, { borderColor: errors.email && touched.email ? 'red' : theme.border.borderColor }]}
              placeholder="Email"
              placeholderTextColor={String(theme.text.color) + '99'}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              onBlur={() => setTouched(t => ({ ...t, email: true }))}
              editable={!loading}
            />
            {errors.email && touched.email && <Text style={styles.error}>{errors.email}</Text>}

            {/* Password */}
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.input, theme.text, theme.card, { flex: 1, borderColor: errors.password && touched.password ? 'red' : theme.border.borderColor }]}
                placeholder="Password"
                placeholderTextColor={String(theme.text.color) + '99'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                onBlur={() => setTouched(t => ({ ...t, password: true }))}
                editable={!loading}
              />
              <TouchableOpacity onPress={() => setShowPassword(s => !s)} style={styles.eyeIcon} disabled={loading}>
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color={theme.text.color as string} />
              </TouchableOpacity>
            </View>
            {errors.password && touched.password && <Text style={styles.error}>{errors.password}</Text>}

            {/* Terms Checkbox */}
            <Pressable
              style={styles.checkboxRow}
              onPress={() => {
                if (!loading) {
                  setAgreeTerms(a => !a);
                  setTouched(t => ({ ...t, terms: true }));
                }
              }}
              disabled={loading}
            >
              <View style={[styles.checkbox, { backgroundColor: agreeTerms ? theme.button.backgroundColor : 'transparent',borderColor:theme.iconColor.color }]}> 
                {agreeTerms && <Ionicons name="checkmark" size={16} color={theme.button.color as string} />}
              </View>
              <Text style={[styles.checkboxLabel, theme.text]}>I agree to the Terms and Conditions</Text>
            </Pressable>
            {errors.terms && touched.terms && <Text style={styles.error}>{errors.terms}</Text>}

            {/* Social Login Buttons */}
            <View style={styles.socialRow}>
              <TouchableOpacity
                style={[styles.socialButton, theme.card, { borderColor: theme.iconColor.color }]}
                onPress={() => handleSocialLogin('Google')}
                disabled={loading}
              >
                <FontAwesome name="google" size={20} color={theme.iconColor.color} style={{ marginRight: 8 }} />
                <Text style={[theme.text]}>Sign up with Google</Text>
              </TouchableOpacity>
            
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={[styles.signupButton, theme.button, (!isFormValid || loading) && styles.disabledButton]}
              onPress={handleSignUp}
              disabled={!isFormValid || loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color={theme.button.color as string} />
              ) : (
                <Text style={[theme.text, { color: theme.button.color, fontWeight: 'bold' }]}>Sign Up</Text>
              )}
            </TouchableOpacity>

            {/* Link to Login */}
            <TouchableOpacity onPress={() => navigation.navigate('Login' as never)} style={styles.loginLink} disabled={loading}>
              <Text style={[theme.text, styles.loginText]}>Already have an account? <Text style={{ color: theme.primaryColor.color, fontWeight: 'bold' }}>Log In</Text></Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
};

export default SignUpScreen; 