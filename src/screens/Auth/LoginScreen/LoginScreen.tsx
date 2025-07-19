import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/slices/userAuthSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import GradientBackground from "../../../components/GradientBackground";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../../constants/routes";
import styles from "./LoginScreen.style";
import { ThemeContext } from "../../../constants/Themes";
import * as Device from 'expo-device';
import axios from 'axios';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countryCode, setCountryCode] = useState('IN');
  const [userIP, setUserIP] = useState('103.240.76.204');
  const [deviceId, setDeviceId] = useState('1234');
  const [userDetails,setUserDetails]= useState([])
  const [touched, setTouched] = useState({
    usernameOrEmail: false,
    password: false,
  });

  // Validation
  const errors = {
    usernameOrEmail:
      !usernameOrEmail ||
      (usernameOrEmail.indexOf("@") > -1
        ? !emailRegex.test(usernameOrEmail)
        : usernameOrEmail.length < 2)
        ? "Enter a valid email or username."
        : "",
    password:
      password.length < 5 ? "Password must be at least 5 characters" : "",
  };

  const isFormValid = !errors.usernameOrEmail && !errors.password;

  const fetchCountryCode = async () => {
    try {
      // Fetch IP and geolocation data
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      setCountryCode(data.country_code || 'IN');
      setUserIP(data.ip || '103.240.76.204');
      console.log('Country Code:', data.country_code || 'IN');
      console.log('IP:', data.ip);
    } catch (error) {
      console.error('Error fetching country code:', error);
      console.log('Error', 'Could not retrieve country code');
    }
  };

  // const getDeviceInfo = async () => {
  //   try {
  //     const info = {
  //       brand: Device.brand, // e.g., "Apple" or "Samsung"
  //       modelName: Device.modelName, // e.g., "iPhone 13" or "Galaxy S21"
  //       manufacturer: Device.manufacturer, // e.g., "Apple Inc."
  //       deviceName: Device.deviceName, // User-assigned device name
  //       osName: Device.osName, // e.g., "iOS" or "Android"
  //       osVersion: Device.osVersion, // e.g., "15.0" or "12"
  //       platformApiLevel: Device.platformApiLevel, // Android API level (Android only)
  //       isDevice: Device.isDevice, // true if physical device, false if emulator
  //       totalMemory: Device.totalMemory, // Total memory in bytes
  //     };
  //     console.log('Device Info:', info);
  //   } catch (error) {
  //     console.error('Error fetching device info:', error);
  //   }
  // };

  useEffect(() => {
    fetchCountryCode();
   // getDeviceInfo();
  }, []);

  const handleLogin = async () => {
    if (isFormValid) {
      try {
        setLoading(true);
        setError("");

        // Prepare login data with required parameters
        const loginData = {
          username_email: usernameOrEmail,
          password: password,
          modalName: Device.modelName,
          deviceName: Device.brand,
          osName: Device.osName,
          osVersion: Device.osVersion,
          ip: userIP,
          country: countryCode,
          device_id: deviceId
        };

        console.log('Login Data:', loginData);
        
        // Make API call to login endpoint
        const response = await axios.post(`${apiUrl}/login`, loginData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Login Response:', response.data);

        // Handle successful response
        if (response.data.success) {
          const apiResponse = {
            token: response.data.data.access_token,
            user: {
              id: response.data.data.user?.id,
              name: response.data.data.user?.name,
              email: response.data.data.user?.email,
              username: response.data.data.user?.username,
              avatar_image: response.data.data.user?.avatar_image,
              cover_image: response.data.data.user?.cover_image,
              status: response.data.data.user?.status,
              profession: response.data.data.user?.profession,
              language: response.data.data.user?.language,
              birthday: response.data.data.user?.birthday,
              gender: response.data.data.user?.gender,
              website: response.data.data.user?.website,
              category: response.data.data.user?.category,
              story: response.data.data.user?.story,
              bio: response.data.data.user?.bio,
              location: response.data.data.user?.location,
              phone: response.data.data.user?.phone,
              company: response.data.data.user?.company,
              country: response.data.data.user?.country,
              city: response.data.data.user?.city,
              address: response.data.data.user?.address,
              postalCode: response.data.data.user?.postal_code,
              facebookLink: response.data.data.user?.facebook_link,
              twitterLink: response.data.data.user?.twitter_link,
              instagramLink: response.data.data.user?.instagram_link,
              youtubeLink: response.data.data.user?.youtube_link,
              pinterestLink: response.data.data.user?.pinterest_link,
              githubLink: response.data.data.user?.github_link,
              snapchatLink: response.data.data.user?.snapchat_link,
              telegramLink: response.data.data.user?.telegram_link,
              twitchLink: response.data.data.user?.twitch_link,
              discordLink: response.data.data.user?.discord_link,
              vkLink: response.data.data.user?.vk_link,
              redditLink: response.data.data.user?.reddit_link,
              spotifyLink: response.data.data.user?.spotify_link,
              threadsLink: response.data.data.user?.threads_link,
              kickLink: response.data.data.user?.kick_link,
            }
          };
          
          setUserDetails(response.data.data.user);
          
          // Dispatch success action
          dispatch(loginSuccess(apiResponse));
        } else {
          const errorMessage = response?.data?.errors || 
          'Login failed. Please try again.';
          setError(errorMessage);
        }
        
      } catch (error: any) {
    
        const errorMessage = error.response?.data?.errors || 
                           'Login failed. Please try again.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSocialLogin = (provider: string) => {
    alert(`Login with ${provider} (not implemented)`);
  };

  return (
    <GradientBackground colors={["#1976d2", "#00C6FB", "#FFFFFF"]}>
      <KeyboardAvoidingView
      //  keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 100} behavior={Platform.OS === 'ios' ? 'padding' :'height'} style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.centerContainer]}>
            <View
              style={[styles.card, theme.card, theme.shadow, theme.background]}
            >
              <Text style={[styles.title, theme.text]}>Sign In</Text>

              {/* Error Message */}
              {error && (
                <View style={styles.errorContainer}>
                  <Text style={[styles.errorText, theme.text]}>{error}</Text>
                </View>
              )}

              {/* Username or Email */}
              <TextInput
                style={[
                  styles.input,
                  theme.text,
                  theme.card,
                  errors.usernameOrEmail &&
                    touched.usernameOrEmail &&
                    styles.inputError,
                  {
                    borderColor:
                      errors.usernameOrEmail && touched.usernameOrEmail
                        ? "red"
                        : theme.border.borderColor,
                  },
                ]}
                placeholder="Username or Email"
                placeholderTextColor={String(theme.text.color) + "99"}
                value={usernameOrEmail}
                onChangeText={setUsernameOrEmail}
                autoCapitalize="none"
                onBlur={() =>
                  setTouched((t) => ({ ...t, usernameOrEmail: true }))
                }
                editable={!loading}
              />
              {errors.usernameOrEmail && touched.usernameOrEmail && (
                <Text style={styles.error}>{errors.usernameOrEmail}</Text>
              )}

              {/* Password */}
              <View style={styles.passwordRow}>
                <TextInput
                  style={[
                    styles.input,
                    { flex: 1 },
                    theme.text,
                    theme.card,
                    errors.password && touched.password && styles.inputError,
                    {
                      borderColor:
                        errors.usernameOrEmail && touched.usernameOrEmail
                          ? "red"
                          : theme.border.borderColor,
                    },
                  ]}
                  //  style={[styles.input,  errors.password && touched.password && styles.inputError]}
                  placeholder="Password"
                  placeholderTextColor={String(theme.text.color) + "99"}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                  editable={!loading}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword((s) => !s)}
                  style={styles.eyeIcon}
                  disabled={loading}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={22}
                    color={theme.text.color as string}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && touched.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              {/* Remember Me Checkbox */}
              <Pressable
                style={styles.checkboxRow}
                onPress={() => setRememberMe((r) => !r)}
                disabled={loading}
              >
                <View
                  style={[
                    styles.checkbox,
                    {
                      backgroundColor: rememberMe
                        ? theme.button.backgroundColor
                        : "transparent",borderColor:theme.iconColor.color
                    },
                  ]}
                >
                  {rememberMe && (
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  )}
                </View>
                <Text style={[styles.checkboxLabel, theme.text]}>
                  Remember Me
                </Text>
              </Pressable>

              {/* Login Button */}
              <TouchableOpacity
                style={[
                  styles.loginButton,theme.button,
                  (!isFormValid || loading) && styles.disabledButton,
                ]}
                onPress={handleLogin}
                disabled={!isFormValid || loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color={theme.button.color as string} />
                ) : (
                  <Text style={[theme.text, { color: theme.button.color, fontWeight: 'bold' }]}>Log In</Text>
                )}
              </TouchableOpacity>

              {/* Social Login Buttons */}
              <View style={styles.socialRow}>
                <TouchableOpacity
                  style={[
                    styles.socialButton,
                    theme.card,
                    { borderColor:theme.iconColor.color },
                  ]}
                  onPress={() => handleSocialLogin("Google")}
                  disabled={loading}
                >
                  <FontAwesome
                    name="google"
                    size={20}
                    color={theme.iconColor.color}
                    style={{ marginRight: 8 }}
                  />
                  <Text style={[theme.text]}>Login with Google</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.SIGNUP as never)}
                style={styles.signupLink}
              >
                <Text style={[theme.text, styles.signupText]}>
                  Don't have an account?{" "}
                  <Text style={{ color: theme.primaryColor.color, fontWeight: 'bold' }}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>
            {/* Signup Link */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
};

export default LoginScreen;
