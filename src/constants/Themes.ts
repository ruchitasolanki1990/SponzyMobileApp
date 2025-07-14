// Themes.ts
// This file provides global theming configuration for the Sponzy project.
// It defines light and dark themes and exports a ThemeContext for global access.

import React from 'react';
import { ColorValue, TextStyle, ViewStyle } from 'react-native';

export interface Theme {
  background: ViewStyle;
  card: ViewStyle;
  text: TextStyle;
  mute_text: TextStyle;
  button: ViewStyle & { color: ColorValue };
  iconColor: ViewStyle & { color: ColorValue };
  border: ViewStyle;
  shadow: ViewStyle;
  primaryColor: ViewStyle & { color: ColorValue };
  activeMenuBackgroundColor:ViewStyle & { color: ColorValue };
}

export const lightTheme: Theme = {
  background: {
    backgroundColor: '#FFFFFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#222222',
    fontFamily: 'Barlow_400Regular',
  },
  mute_text: {
    color: '#8898aa',
  },
  button: {
    backgroundColor: '#450ea7',
    color: '#FFFFFF',
    borderRadius: 8,
  },
  iconColor: {
    color: '#450ea7',
  },
  border: {
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryColor: {
    color: '#450ea7',
  },
  activeMenuBackgroundColor:{
    color:'#f6f6f6'
  }
};

export const darkTheme: Theme = {
  background: {
    backgroundColor: '#212123',
  },
  card: {
    backgroundColor: '#303030',
  },
  text: {
    color: '#F5F6FA',
    fontFamily: 'Barlow_400Regular',
  },
  mute_text: {
    color: '#8898aa',
  },
  button: {
    backgroundColor: '#450ea7',
    color: '#FFFFFF',
    borderRadius: 8,
  },
  iconColor: {
    color: '#FFFFFF',
  },
  border: {
    borderColor: '#23262F',
    borderWidth: 1,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryColor: {
    color: '#FFFFFF',
  },
  activeMenuBackgroundColor:{
    color:'#450ea7'
  }
};

export const ThemeContext = React.createContext<Theme>(lightTheme); 