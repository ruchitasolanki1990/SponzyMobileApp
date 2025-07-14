import { ThemeContext } from '@/src/constants/Themes';
import React, { useContext } from 'react'
import { Text, View } from 'react-native';
import styles from './WalletScreen.style';
const WalletScreen = () => {
  const theme = useContext(ThemeContext);
  return (
    <View style={[styles.container, theme.background]}>
      <Text style={[styles.title, theme.text]}>Wallet</Text>
      <Text style={[styles.sectionTitle, theme.mute_text]}>
     Add funds to your wallet to use for subscription, tips, and more
      </Text>
     
      </View>
  )
}

export default WalletScreen