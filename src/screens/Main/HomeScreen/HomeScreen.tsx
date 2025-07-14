import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
  TextInput,
  Dimensions,
  PanResponder,
  Animated,
} from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { ThemeContext } from "../../../constants/Themes";
import styles from "./HomeScreen.style";
import ProfileWithSearchBarComponents from "@/src/components/HomePageComponent/ProfileWithSearchBarComponents";
import { Feather } from "@expo/vector-icons";
import PostShareComponent from "@/src/components/HomePageComponent/PostShareComponent";
import MediaGrid from "@/src/components/MediaGrid/MediaGrid";
import * as ImagePicker from "expo-image-picker";
// import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import { Video, ResizeMode } from 'expo-av';
import { Picker } from '@react-native-picker/picker';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
// Define the type for an asset, extending ImagePickerAsset
interface SelectedAsset extends ImagePicker.ImagePickerAsset {
  type?: "image" | "video";
}

interface ZipFile {
  uri: string;
  name: string;
  size: number;
  mimeType: string;
}

// Post item interface for feed/posts
interface PostItem {
  id: number;
  avatar_image: string;
  description: string;
  username: string;
  timeduration: string;
  image: string[];
  video: string[];
  zipFiles: ZipFile[];
  isLiked: boolean;
  totalLike: number;
  totalComments: number;
}

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useContext(ThemeContext);
  const [profileInput, setProfileInput] = useState('');
  const [postData, setPostData] = useState<PostItem[]>([]);
  const [selectedAssets, setSelectedAssets] = useState<SelectedAsset[]>([]);
  const [zipFiles, setZipFiles] = useState<ZipFile[]>([]);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownValue, setDropdownValue] = useState<string | null>(null);
  // For draggable title text
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const initialTitleX = useRef(new Animated.Value(screenWidth / 2 - 80)).current; // 80 is half of assumed text width
  const initialTitleY = useRef(new Animated.Value(screenHeight - 300)).current; // Near bottom
  const pan = useRef(new Animated.ValueXY({ x: screenWidth / 2 - 80, y: screenHeight - 300 })).current;
  
  useEffect(() => {
    // Reset position when modal opens or closes
    if (videoModalVisible) {
      pan.setValue({ x: screenWidth / 2 - 80, y: screenHeight - 300 });
    }
  }, [videoModalVisible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({ x: (pan.x as any)._value, y: (pan.y as any)._value });
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: pan.x, dy: pan.y },
      ], { useNativeDriver: false }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  //Image and Video Picker
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 9, // Allow up to 9 items for 3x3 grid
    });

    if (!result.canceled) {
      // Map the assets to include type information
      const assetsWithType: SelectedAsset[] = result.assets.map((asset) => ({
        ...asset,
        type: asset.type === "video" ? "video" : "image",
      }));
      setSelectedAssets(assetsWithType);
      console.log(assetsWithType);
    }
  };

  //Remove Asset
  const handleRemoveAsset = (asset: SelectedAsset) => {
    setSelectedAssets((prevAssets) =>
      prevAssets.filter((item) => item.uri !== asset.uri)
    );
  };

  //Zip File Picker
  const pickZipFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/zip",
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const newZipFile: ZipFile = {
          uri: result.assets[0].uri,
          name: result.assets[0].name,
          size: result.assets[0].size || 0,
          mimeType: result.assets[0].mimeType || "application/zip",
        };
        setZipFiles((prev) => [...prev, newZipFile]);
        console.log("Selected ZIP file:", newZipFile);
      }
    } catch (error) {
      console.error("Error picking ZIP file:", error);
    }
  };

  //Remove zip file
  const removeZipFile = (uri: string) => {
    setZipFiles((prev) => prev.filter((file) => file.uri !== uri));
  };

  // const fetchData = async () => {
  //   axios
  //     .get("https://dummyjson.com/products")
  //     .then((response) => {
  //       console.log(response.data);
  //       setData(response.data?.products);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    // <ScrollView keyboardShouldPersistTaps="handled">
    <>
      <View style={[styles.container, theme.background]}>
        <View style={[theme.card, theme.shadow, { marginTop: 10 }]}>
          <View
            style={[
              {
                width: "100%",
                height: 100,
                flexDirection: "row",
                paddingHorizontal: 20,
              },
            ]}
          >
            <ProfileWithSearchBarComponents value={profileInput} onChangeText={setProfileInput} />
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 50,
              paddingVertical: 10,
            }}
          >
            <TouchableOpacity onPress={pickImage}>
              <Feather name="image" size={20} color={theme.iconColor.color} />
            </TouchableOpacity>
            <TouchableOpacity onPress={pickZipFile}>
              <Feather
                name="file-text"
                size={20}
                color={theme.iconColor.color}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => {
              let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsMultipleSelection: false,
                quality: 1,
              });
              if (!result.canceled && result.assets && result.assets[0]) {
                setVideoUri(result.assets[0].uri);
                setVideoModalVisible(true);
              }
            }}>
              <Feather name="video" size={20} color={theme.iconColor.color} />
            </TouchableOpacity>
            <Feather name="paperclip" size={20} color={theme.iconColor.color} />
            <Feather name="lock" size={20} color={theme.iconColor.color} />
          </View>

          {/* Display images and videos */}
          <MediaGrid
            assets={selectedAssets}
            onRemoveAsset={handleRemoveAsset}
            maxItems={9}
            columns={3}
            spacing={8}
            padding={20}
          />

          {/* Display ZIP files */}
          {zipFiles.length > 0 && (
            <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
              {zipFiles.map((file, index) => (
                <View
                  key={file.uri}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: theme.card.backgroundColor,
                    padding: 10,
                    marginVertical: 5,
                    borderRadius: 8,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[{ color: theme.text.color }]}
                      numberOfLines={1}
                    >
                      {file.name}
                    </Text>
                    <Text style={[{ color: theme.text.color, fontSize: 12 }]}>
                      {(file.size / 1024).toFixed(2)} KB
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => removeZipFile(file.uri)}
                    style={styles.removeButton}
                  >
                    <Feather name="x" size={14} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 20,
              paddingHorizontal: 20,
              paddingBottom: 20,
            }}
          >
            <TouchableOpacity
              style={[styles.publishButton, theme.button, { borderRadius: 20, opacity: profileInput.trim() ? 1 : 0.5 }]}
              onPress={() => {
                // Example: push a new post to postData
                const newPost: PostItem = {
                  id: postData.length + 1,
                  avatar_image: 'https://placehold.co/60x60', // Placeholder
                  description: profileInput,
                  username: 'username', // Placeholder
                  timeduration: new Date().toLocaleTimeString(), // Example time
                  image: selectedAssets.filter(a => a.type === 'image').map(a => a.uri),
                  video: selectedAssets.filter(a => a.type === 'video').map(a => a.uri),
                  zipFiles: zipFiles,
                  isLiked: true,
                  totalLike:10,
                  totalComments: 100,
                };
                setPostData(prev => [newPost, ...prev]);
                setProfileInput('');
                console.log("selectedAssets",selectedAssets);
                setSelectedAssets([]);
                setZipFiles([]);
              }}
              disabled={!profileInput.trim()}
            >
              <Text style={styles.publishButtonText}>Publish</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={postData}
          renderItem={({ item }) => (
            <View style={[theme.card, theme.shadow, { marginTop: 10 }]}>
              <PostShareComponent post={item} />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
        />
      </View>

      {/* Video Modal */}
      <Modal
        visible={videoModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setVideoModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.85)' }}>
          {/* Close Button */}
          <TouchableOpacity onPress={() => { setVideoModalVisible(false); setVideoUri(null); setVideoTitle(''); setShowTitleInput(false); }} style={{ position: 'absolute', top: 40, left: 20, backgroundColor: 'red', borderRadius: 16, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
            <Feather name="x" size={28} color="#fff" />
          </TouchableOpacity>
          {/* Video Preview - fills the screen */}
          {videoUri && (
            <View style={{ flex: 1, width: '100%' }}>
              <Video
                source={{ uri: videoUri }}
                style={{ flex: 1, width: '100%' }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                shouldPlay
              />
              {/* Draggable Title Text Overlay */}
              {videoTitle ? (
                <Animated.View
                  {...panResponder.panHandlers}
                  style={{
                    position: 'absolute',
                    left: pan.x,
                    top: pan.y,
                    zIndex: 20,
                  }}
                >
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 22,
                      fontWeight: 'bold',
                      textShadowColor: 'rgba(0,0,0,0.7)',
                      textShadowOffset: { width: 1, height: 1 },
                      textShadowRadius: 4,
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      borderRadius: 8,
                    }}
                  >
                    {videoTitle}
                  </Text>
                </Animated.View>
              ) : null}
            </View>
          )}
          {/* Small text icon button for setting title */}
          <TouchableOpacity
            style={{ position: 'absolute', top: 40, right: 30, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 16, width: 36, height: 36, justifyContent: 'center', alignItems: 'center', zIndex: 20 }}
            onPress={() => setShowTitleInput(true)}
          >
            <Feather name="type" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ position: 'absolute', top: 86, right: 30, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 16, width: 36, height: 36, justifyContent: 'center', alignItems: 'center', zIndex: 20 }}
            onPress={() => setShowDropdown(true)}
          >
            <MaterialCommunityIcons name="form-dropdown" size={24} color="#fff" />
          </TouchableOpacity>
          {/* Minimal input overlay for title */}
          {showTitleInput && (
            <View style={{ position: 'absolute', bottom: 100, left: 0, right: 0, alignItems: 'center', zIndex: 30 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(30,30,30,0.95)', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, minWidth: 220 }}>
                <TextInput
                  value={videoTitle}
                  onChangeText={setVideoTitle}
                  placeholder="Add a title..."
                  placeholderTextColor="#aaa"
                  style={{ color: '#fff', fontSize: 16, flex: 1, minWidth: 120, padding: 0, margin: 0, backgroundColor: 'transparent' }}
                  maxLength={100}
                  autoFocus
                />
                <TouchableOpacity onPress={() => setShowTitleInput(false)} style={{ marginLeft: 8 }}>
                  <Feather name="check" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          {/* Next Button at the bottom of the video modal */}
          <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center', zIndex: 100 }} pointerEvents="box-none">
            <TouchableOpacity
              style={{ backgroundColor:theme.button.backgroundColor, borderRadius: 24, paddingHorizontal: 40, paddingVertical: 14, margin: 24, elevation: 2 }}
              onPress={() => {
                // Print videoUri, videoTitle, pan.x, pan.y, and dropdownValue
                console.log('Video URI:', videoUri);
                console.log('Video Title:', videoTitle);
                console.log('Pan X:', (pan.x as any)._value);
                console.log('Pan Y:', (pan.y as any)._value);
                console.log('Dropdown Value:', dropdownValue);
                setTimeout(() => {
                  setVideoModalVisible(false);
                }, 200);
              }}
            >
              <Text style={[theme.text,{color:theme.button.color,fontWeight:'bold'}]}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>        
      </Modal>
      {/* Dropdown Modal */}
      <Modal
        visible={showDropdown}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDropdown(false)}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' }}
          activeOpacity={1}
          onPressOut={() => setShowDropdown(false)}
        >
          <View style={{ position: 'absolute', top: 130, right: 30, backgroundColor: '#222', borderRadius: 10, paddingVertical: 8, width: 160, zIndex: 100 }}>
            <TouchableOpacity
              style={{ padding: 12 }}
              onPress={() => { setDropdownValue('Option 1'); setShowDropdown(false); }}
            >
              <Text style={{ color: '#fff', fontSize: 16 }}>Available For Subscriber</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 12 }}
              onPress={() => { setDropdownValue('Option 2'); setShowDropdown(false); }}
            >
              <Text style={{ color: '#fff', fontSize: 16 }}>Available For Everyone</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      </>
    // </ScrollView>
  );
};

export default HomeScreen;
