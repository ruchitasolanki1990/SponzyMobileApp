import { ThemeContext } from '@/src/constants/Themes';
import React, { useContext } from 'react'
import { View,Text } from 'react-native';
import styles from './MySubscriptions.style';
const MySubscriptions = () => {
  const theme = useContext(ThemeContext);
  return (
    <View style={[styles.container, theme.background]}>
      <Text style={[styles.title, theme.text]}>My Subscriptions</Text>
      <Text style={[styles.sectionTitle, theme.mute_text]}>
      Users you have subscribed to your content
      </Text>
      <View style={[{justifyContent:'center',display:'flex',height:'50%'},theme.shadow,theme.card]}>
      <Text style={[styles.title, theme.text]}>You have not subscribed to any user <h5 style={{textDecoration:'underline'}}>Explore Creators</h5></Text>
      </View>
      </View>
  )
}

export default MySubscriptions