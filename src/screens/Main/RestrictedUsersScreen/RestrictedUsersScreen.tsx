import { ThemeContext } from '@/src/constants/Themes';
import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import styles from './RestrictedUsersScreen.style';
const RestrictedUsersScreen = () => {
  const theme = useContext(ThemeContext);
  return (
    <View style={[styles.container, theme.background]}>
      <Text style={[styles.title, theme.text]}>Restricted users</Text>
      <Text style={[styles.sectionTitle, theme.mute_text]}>
      Users you have restricted
      </Text>
      <View style={[{justifyContent:'center',display:'flex',height:'50%'},theme.shadow,theme.card]}>
      <Text style={[styles.title, theme.text]}>No results have been found</Text>
      </View>
      </View>
  )
}

export default RestrictedUsersScreen