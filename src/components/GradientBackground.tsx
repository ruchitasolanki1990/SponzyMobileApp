import React, { ReactNode } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientBackgroundProps {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
  colors?: readonly [string, string, string];
}

/**
 * GradientBackground
 * A reusable background component for Login and Signup screens.
 * Uses a modern blue-to-white gradient and allows content overlay.
 * Accepts a dynamic colors prop for custom gradients.
 */
const GradientBackground: React.FC<GradientBackgroundProps> = ({ children, style, colors }) => {
  const gradientColors: readonly [string, string, string] = colors || ["#1E90FF", "#87CEFA", "#FFFFFF"];
  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.gradient, style]}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});

export default GradientBackground; 