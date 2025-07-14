import { ThemeContext } from '@/src/constants/Themes';
import React, { useContext } from 'react'
import { Text, View } from 'react-native';
import styles from './MySubscribersScreen.style';
const MySubscribersScreen = () => {
  const theme = useContext(ThemeContext);
  return (
    <View style={[styles.container, theme.background]}>
      <Text style={[styles.title, theme.text]}> My subscribers</Text>
      <Text style={[styles.sectionTitle, theme.mute_text]}>
      Users who have subscribed to you content
      </Text>
      <View style={[{justifyContent:'center',display:'flex',height:'50%'},theme.shadow,theme.card]}>
      <Text style={[styles.title, theme.text]}>You do not have any subscribers </Text>
      </View>
      </View>
  )
}

export default MySubscribersScreen