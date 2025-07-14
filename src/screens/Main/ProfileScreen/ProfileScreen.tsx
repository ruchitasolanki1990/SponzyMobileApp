import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootState } from '../../../redux/store';
import { ThemeContext } from '../../../constants/Themes';
import { ROUTES } from '../../../constants/routes';

const ProfileScreen = () => {
  const user = useSelector((state: RootState) => state.userAuth.user);
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();

  const handleEditProfile = () => {
    navigation.navigate(ROUTES.EDIT_PROFILE as never);
  };

  const handlePress = () => {
    // Example action for the themed button
    alert('Profile action!');
  };

  return (
    <ScrollView style={[styles.container, theme.background]} contentContainerStyle={styles.scrollContent}>
      <Text style={[styles.title, theme.text]}>Profile Screen</Text>
      
      {user && (
        <>
          {/* Profile Header with Avatar and Cover Image */}
          <View style={[styles.profileHeader, theme.card, theme.shadow]}>
            {user.cover_image && (
              <Image
                source={{ uri: user.cover_image }}
                style={styles.coverImage}
                resizeMode="cover"
              />
            )}
            <View style={styles.avatarContainer}>
              <Image
                source={user.avatar_image ? { uri: user.avatar_image } : require("../../../../assets/img/userprofile.png")}
                style={styles.avatarImage}
              />
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, theme.text]}>{user.name}</Text>
              {user.username && (
                <Text style={[styles.profileUsername, theme.text]}>@{user.username}</Text>
              )}
              {user.status && (
                <Text style={[styles.profileStatus, theme.text]}>{user.status}</Text>
              )}
            </View>
          </View>
          
          {/* Profile Information Section */}
          <View style={[styles.sectionContainer, theme.card, theme.shadow]}>
            <Text style={[styles.sectionTitle, theme.text]}>Profile Information</Text>
            
            <View style={styles.infoRow}>
              <Text style={[styles.label, theme.text]}>Name:</Text>
              <Text style={[styles.value, theme.text]}>{user.name}</Text>
            </View>
            
            {user.username && (
              <View style={styles.infoRow}>
                <Text style={[styles.label, theme.text]}>Username:</Text>
                <Text style={[styles.value, theme.text]}>{user.username}</Text>
              </View>
            )}
            
            {user.email && (
              <View style={styles.infoRow}>
                <Text style={[styles.label, theme.text]}>Email:</Text>
                <Text style={[styles.value, theme.text]}>{user.email}</Text>
              </View>
            )}
            
            {user.profession && (
              <View style={styles.infoRow}>
                <Text style={[styles.label, theme.text]}>Profession:</Text>
                <Text style={[styles.value, theme.text]}>{user.profession}</Text>
              </View>
            )}
            
            {user.language && (
              <View style={styles.infoRow}>
                <Text style={[styles.label, theme.text]}>Language:</Text>
                <Text style={[styles.value, theme.text]}>{user.language}</Text>
              </View>
            )}
            
            {user.birthday && (
              <View style={styles.infoRow}>
                <Text style={[styles.label, theme.text]}>Birthday:</Text>
                <Text style={[styles.value, theme.text]}>{user.birthday}</Text>
              </View>
            )}
            
            {user.gender && (
              <View style={styles.infoRow}>
                <Text style={[styles.label, theme.text]}>Gender:</Text>
                <Text style={[styles.value, theme.text]}>{user.gender}</Text>
              </View>
            )}
            
            {user.website && (
              <View style={styles.infoRow}>
                <Text style={[styles.label, theme.text]}>Website:</Text>
                <Text style={[styles.value, theme.text, styles.linkText]}>{user.website}</Text>
              </View>
            )}
            
            {user.category && (
              <View style={styles.infoRow}>
                <Text style={[styles.label, theme.text]}>Category:</Text>
                <Text style={[styles.value, theme.text]}>{user.category}</Text>
              </View>
            )}
            
            {user.bio && (
              <View style={styles.infoRow}>
                <Text style={[styles.label, theme.text]}>Bio:</Text>
                <Text style={[styles.value, theme.text, styles.bioText]}>{user.bio}</Text>
              </View>
            )}
            
            {user.location && (
              <View style={styles.infoRow}>
                <Text style={[styles.label, theme.text]}>Location:</Text>
                <Text style={[styles.value, theme.text]}>{user.location}</Text>
              </View>
            )}
            
            {user.website && (
              <View style={styles.infoRow}>
                <Text style={[styles.label, theme.text]}>Website:</Text>
                <Text style={[styles.value, theme.text, styles.linkText]}>{user.website}</Text>
              </View>
            )}
            
            {user.phone && (
              <View style={styles.infoRow}>
                <Text style={[styles.label, theme.text]}>Phone:</Text>
                <Text style={[styles.value, theme.text]}>{user.phone}</Text>
              </View>
            )}
          </View>

          {/* Billing Information Section */}
          {(user.company || user.country || user.city || user.address || user.postalCode) && (
            <View style={[styles.sectionContainer, theme.card, theme.shadow]}>
              <Text style={[styles.sectionTitle, theme.text]}>Billing Information</Text>
              
              {user.company && (
                <View style={styles.infoRow}>
                  <Text style={[styles.label, theme.text]}>Company:</Text>
                  <Text style={[styles.value, theme.text]}>{user.company}</Text>
                </View>
              )}
              
              {user.country && (
                <View style={styles.infoRow}>
                  <Text style={[styles.label, theme.text]}>Country:</Text>
                  <Text style={[styles.value, theme.text]}>{user.country}</Text>
                </View>
              )}
              
              {user.city && (
                <View style={styles.infoRow}>
                  <Text style={[styles.label, theme.text]}>City:</Text>
                  <Text style={[styles.value, theme.text]}>{user.city}</Text>
                </View>
              )}
              
              {user.address && (
                <View style={styles.infoRow}>
                  <Text style={[styles.label, theme.text]}>Address:</Text>
                  <Text style={[styles.value, theme.text, styles.addressText]}>{user.address}</Text>
                </View>
              )}
              
              {user.postalCode && (
                <View style={styles.infoRow}>
                  <Text style={[styles.label, theme.text]}>Postal Code:</Text>
                  <Text style={[styles.value, theme.text]}>{user.postalCode}</Text>
                </View>
              )}
            </View>
          )}
        </>
      )}
      
      <TouchableOpacity 
        style={[styles.editButton, theme.button]} 
        onPress={handleEditProfile}
      >
        <Ionicons name="create-outline" size={20} color={theme.button.color as string} />
        <Text style={[styles.editButtonText, { color: theme.button.color as string }]}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, theme.button]} onPress={handlePress}>
        <Text style={[theme.text, { color: theme.button.color, fontWeight: 'bold' }]}>Profile Action</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileHeader: {
    position: 'relative',
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  coverImage: {
    width: '100%',
    height: 150,
  },
  avatarContainer: {
    position: 'absolute',
    bottom: 10,
    left: 20,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileInfo: {
    padding: 20,
    paddingTop: 50,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileUsername: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 4,
  },
  profileStatus: {
    fontSize: 14,
    fontStyle: 'italic',
    opacity: 0.6,
  },
  sectionContainer: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    width: 100,
    marginRight: 10,
  },
  value: {
    fontSize: 16,
    flex: 1,
  },
  bioText: {
    fontStyle: 'italic',
  },
  linkText: {
    color: '#007AFF',
  },
  addressText: {
    flex: 1,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
  },
});

export default ProfileScreen; 