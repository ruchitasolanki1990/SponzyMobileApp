import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootState } from '../../../redux/store';
import { ThemeContext } from '../../../constants/Themes';
import { ROUTES } from '../../../constants/routes';
import styles from './ProfileScreen.style';
const ProfileScreen = () => {
  const user = useSelector((state: RootState) => state.userAuth.user);
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();

  // Get screen height for cover image
  const screenHeight = Dimensions.get('window').height;
  const coverHeight = screenHeight * 0.6;

  const handleEditProfile = () => {
    navigation.navigate(ROUTES.EDIT_PROFILE as never);
  };

  const handlePress = () => {
    // Example action for the themed button
    alert('Profile action!');
  };

  return (
    <ScrollView style={[styles.container, theme.background]} contentContainerStyle={styles.scrollContent}>
      <View style={[styles.profileHeader]}> 
        <Image
          source={{ uri: user?.cover_image || 'https://via.placeholder.com/600x400' }}
          style={[styles.coverImage, { height: coverHeight }]}
          resizeMode="cover"
        />
        <View style={styles.avatarCenterContainer}>
          <Image
            source={{ uri: user?.avatar_image || 'https://via.placeholder.com/150' }}
            style={styles.avatarImage}
          />
        </View>
      </View>
      {/* ...rest of your profile info... */}
    </ScrollView>
  );
};
export default ProfileScreen; 