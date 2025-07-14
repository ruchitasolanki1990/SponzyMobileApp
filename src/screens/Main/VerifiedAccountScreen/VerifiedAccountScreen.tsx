import { ThemeContext } from '@/src/constants/Themes';
import React, { useContext } from 'react'
import { Text, View } from 'react-native';
import styles from './VerfiedAccount.style';
const VerifiedAccountScreen = () => {
  const theme = useContext(ThemeContext);
  return (
    <View style={[styles.container, theme.background]}>
      <Text style={[styles.title, theme.text]}>Verify Account</Text>
      <Text style={[styles.sectionTitle, theme.mute_text]}>
     Verified account!
      </Text>
      <View style={[{justifyContent:'center',display:'flex',backgroundColor:'#00a65a',borderColor:"#00a65a",padding:10}]}>
      <Text style={[styles.title]}>Your account is verified!</Text>
      </View>
      </View>
  )
}

export default VerifiedAccountScreen