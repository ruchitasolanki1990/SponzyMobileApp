import { Dimensions, StyleSheet } from "react-native";

// Get screen width for responsive grid layout
const { width: screenWidth } = Dimensions.get('window');
const gridSpacing = 8;
const gridPadding = 20;
const itemsPerRow = 3;
const itemWidth = (screenWidth - (gridPadding * 2) - (gridSpacing * (itemsPerRow - 1))) / itemsPerRow;
const itemHeight = itemWidth * 1.2; // Maintain aspect ratio

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
  },
  publishButton: {
    marginTop: 8,
    paddingVertical: 5,
    alignItems: "center",
    width: "100%",
    padding: 0,
  },
  publishButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  assetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: gridPadding,
    gap: gridSpacing,
    marginTop: 10,
  },
  assetItem: {
    width: itemWidth,
    height: itemHeight,
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
    fontSize: 11,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 2,
  },
  assetType: {
    fontSize: 9,
    color: '#6c757d',
    textAlign: 'center',
    fontWeight: '400',
  },
  removeButton: {
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
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  largeFileName:{
    color: '#797979',
    fontSize:16,
    textAlign:'center',
    paddingVertical:20
  },
  oops:{
    color: '#575757',
    fontSize:30,
    textAlign:'center',
    marginVertical:10
  }
});

export default styles;