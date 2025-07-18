import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      padding: 0, // Remove padding so cover image is flush
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
      borderRadius: 0,
      width: '100%',
    },
    coverImage: {
      width: '100%',
      height:'60%'
    },
    avatarCenterContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: -60, // Half of new avatarImage height to overlap
      alignItems: 'center',
      zIndex: 2,
    },
    avatarImage: {
      width: 130,
      height: 130,
      borderRadius: 65,
      borderWidth: 5,
      borderColor: '#fff',
      backgroundColor: '#eee',
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

  export default styles
  