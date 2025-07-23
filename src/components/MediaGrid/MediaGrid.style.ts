import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  assetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  assetItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    position: 'relative', // For remove button positioning
    borderWidth: 1,
    borderColor: '#f1f3f4',
  },
  mediaContainer: {
    flex: 1,
    position: 'relative',
  },
  mediaPreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: '#f8f9fa',
  },
  videoContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  videoOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assetInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  assetName: {
    textAlign: 'center',
    marginBottom: 2,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding:5,
  },
  assetFileName:{
    fontSize: 14,
    fontWeight: '700',
    color:'white'
  },
  assetFileSize:{
    fontSize: 11,
    fontWeight: '600',
    color:'white',
    textTransform:'uppercase'
  },
  assetFileType:{
    position: 'absolute',
    top: 6,
    left: 6,
    padding: 4,
    backgroundColor:'#0006',
    borderRadius: 4,
    zIndex: 2
  },
  uploadSuccessButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'green',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  uploadFailButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'red',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default styles; 