import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    flex: { flex: 1 },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 32,
      paddingHorizontal: 16,
    },
    card: {
      width: '100%',
      maxWidth: 600,
      borderRadius: 16,
      padding: 24,
      marginTop: 32,
      marginBottom: 32,
      alignItems: 'stretch',
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      marginBottom: 24,
      textAlign: 'center',
      color: '#1E2A3A',
      fontFamily: 'Barlow_700Bold',
    },
    input: {
      borderWidth: 1,
      borderRadius: 5,
      padding: 12,
      marginBottom: 8,
      fontSize: 15,
    },
    error: {
      color: 'red',
      fontSize: 13,
      marginBottom: 8,
      marginLeft: 2,
    },
    errorContainer: {
      backgroundColor: 'rgba(255, 0, 0, 0.1)',
      borderColor: 'red',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginBottom: 16,
    },
    errorText: {
      color: 'red',
      fontSize: 14,
      textAlign: 'center',
    },
    passwordRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    eyeIcon: {
      marginLeft: 8,
      padding: 4,
    },
    checkboxRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
    },
    checkbox: {
      width: 22,
      height: 22,
      borderWidth: 1.5,
      borderRadius: 6,
      marginRight: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkboxLabel: {
      fontSize: 15,
    },
    socialRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
    },
    socialButton: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1.5,
      borderRadius:5,
      paddingVertical: 10,
      paddingHorizontal: 18,
      marginHorizontal: 4,
      flex: 1,
      justifyContent: 'center',
    },
    signupButton: {
      marginTop: 8,
      borderRadius: 5,
      paddingVertical: 14,
      alignItems: 'center',
    },
    disabledButton: {
      opacity: 0.5,
    },
    loginLink: {
      marginTop: 18,
      alignItems: 'center',
    },
    loginText: {
      fontSize: 15,
    },
  });
export default styles;