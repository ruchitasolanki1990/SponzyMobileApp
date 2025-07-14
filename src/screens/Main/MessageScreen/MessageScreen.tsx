import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../../constants/Themes';

const MessageScreen = () => {
  const theme = useContext(ThemeContext);

  const handlePress = () => {
    // Example action for the themed button
    alert('Message action!');
  };

  return (
    <View style={[styles.container, theme.background]}>
      <Text style={theme.text}>Message Screen</Text>
      <TouchableOpacity style={[styles.button, theme.button]} onPress={handlePress}>
        <Text style={[theme.text, { color: theme.button.color, fontWeight: 'bold' }]}>Message Action</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
  },
});

export default MessageScreen; 