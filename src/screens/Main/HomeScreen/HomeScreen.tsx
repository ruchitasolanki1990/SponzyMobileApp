import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Dimensions,
  PanResponder,
  Animated,
} from "react-native";
import {  useSelector } from "react-redux";
import {  RootState } from "../../../redux/store";
import { ThemeContext } from "../../../constants/Themes";
import styles from "./HomeScreen.style";
import ProfileWithSearchBarComponents from "@/src/components/HomePageComponent/ProfileWithSearchBarComponents";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import PostShareComponent from "@/src/components/HomePageComponent/PostShareComponent";
import MediaGrid from "@/src/components/MediaGrid/MediaGrid";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Video, ResizeMode } from "expo-av";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "axios";
import * as Progress from "react-native-progress";
import Toast from "react-native-toast-message";
import EmojiPicker from "rn-emoji-keyboard";
import { useFocusEffect } from "@react-navigation/native";

// Define the type for an asset, extending ImagePickerAsset
interface SelectedAsset extends ImagePicker.ImagePickerAsset {
  type?: "image" | "video";
}
// Define the type of Postal Code
interface ZipFile {
  uri: string;
  name: string;
  size: number;
  mimeType: string;
}

interface Comment {
  // Define comment structure if available
  // For now, assuming it's an empty array
}

interface Creator {
  id: number;
  name: string;
  username: string;
  avatar: string;
  cover: string;
  verified_id: 'yes' | 'no';
  plan: string;
  free_subscription: 'yes' | 'no';
  hide_name: 'yes' | 'no';
  allow_comments: number;
}

interface Media {
  // Define media structure based on the actual media object content
  // Add specific properties when media structure is provided
  [key: string]: any;
}

interface Post {
  comments: Comment[];
  creator: Creator;
  date: string;
  description: string;
  fixed_post: '0' | '1';
  id: number;
  likes: any[]; // Replace 'any' with specific like structure if available
  likes_extras: number;
  locked: 'yes' | 'no';
  media: Media[];
  price: string;
  scheduled_date: string;
  status: 'active' | string; // Add other possible status values if known
  title: string | null;
  video_views: number;
}


const HomeScreen = () => {
  const theme = useContext(ThemeContext);
  const [desc, setDesc] = useState("");
  const [postData, setPostData] = useState<Post[]>([]);
  const [selectedAssets, setSelectedAssets] = useState<SelectedAsset[]>([]);
  const [zipFiles, setZipFiles] = useState<ZipFile[]>([]);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownValue, setDropdownValue] = useState<string | null>(null);
  const [settings, setSettings] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  // For draggable title text
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const pan = useRef(
    new Animated.ValueXY({ x: screenWidth / 2 - 80, y: screenHeight - 300 })
  ).current;
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const token = useSelector((state: RootState) => state.userAuth.token);
  const [uploadProgress, setUploadProgress] = useState({});
  const [showLargeFileModal, setShowLargeFileModal] = useState(false);
  const [largeFileMessage, setLargeFileMessage] = useState("");
  const [price, setPrice] = useState("");
  const [priceVisible, setPriceVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [titleVisible, setTitleVisible] = useState(false);
  const [lock, setLock] = useState(true);
  const [originalZip, setOriginalZip] = useState({});
  const [showVideoOnTheWay, setShowVideoOnTheWay] = useState(false);
  const [videoMessage, setVideoMessage] = useState("");
  const [publicationMessageShow, setPublicationMessageShow] = useState(false);
  const [uploadedMessage, setUploadedMessage] = useState([]);
  const priceRef = useRef(null);
  const titleRef = useRef(null);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [metaForPost,setMetaForPost]= useState([])
  const [lastRecordIndex,setLastRecordIndex]= useState()

  //Handle Emoji and show in Description
  const handleEmojiSelect = (emojiObject) => {
    setSelectedEmoji(emojiObject.emoji);
    setIsOpen(false); // Close picker after selection
    let desctext = desc.concat(emojiObject.emoji);
    setDesc(desctext);
  };

  // Fetch Home Settings
  const fetchSettingsForHome = async () => {
    try {
      const response = await axios.get(`${apiUrl}/settings/get/home`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setSettings(response.data.data);
      }
    } catch (error) {
      console.log("Error", "Failed to load categories");
    }
  };

  // Fetch Post For Home Settings
  const fetchPostForHome = async () => {
    try {
      const response = await axios.get(`${apiUrl}/home`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setPostData(response.data.data)
        setMetaForPost(response.data?.meta)
        setLastRecordIndex(response.data?.meta?.to)
        
      }
    } catch (error) {
      console.log("Error", "Failed to load categories");
    }
  };

    // Fetch Post For Home Settings
    const fetchPostForHomeUpdate = async () => {
    console.log("postdata length",postData.length)
      try {
        const response = await axios.get(`${apiUrl}/user/updates?skip=${postData.length}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          let newPosts=response.data.data
        
         setLastRecordIndex(response.data?.meta?.to)
          setPostData((prevPosts) => ([...prevPosts, ...newPosts]));
         
        }else{
          console.log(response.data)
        }
      } catch (error) {
        console.log("Error", "Failed to load categories");
      }
    };
  //Reel Visible
  useEffect(() => {
    // Reset position when modal opens or closes
    if (videoModalVisible) {
      pan.setValue({ x: screenWidth / 2 - 80, y: screenHeight - 300 });
    }
  }, [videoModalVisible]);

  //ToastSuccess Show
  const showToasForSuccess = (title: string) => {
    Toast.show({
      type: "success",
      text1: "Sponzy",
      text2: title,
    });
  };

  //ToastFailer Show
  const showToasForFailur = (title: string) => {
    Toast.show({
      type: "error",
      text1: "Sponzy",
      text2: title,
    });
  };

  //Fetch Home Settings
  useEffect(() => {
    fetchSettingsForHome();
    fetchPostForHome()
  }, []);

 // useFocusEffect to fetch or process data when the screen is focused
 useFocusEffect(
  React.useCallback(() => {
    fetchPostForHome();

    // Optional cleanup function (runs when screen loses focus)
    return () => {
      console.log('Screen is unfocused, cleaning up...');
      // Perform cleanup (e.g., cancel requests, clear timers)
    };
  }, []) // Empty dependency array means it runs on focus/unfocus
);

  //Title Move Reel
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({ x: (pan.x as any)._value, y: (pan.y as any)._value });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
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
      selectionLimit: settings?.maximum_files_post, // Allow up to 9 items for 3x3 grid
    });
    if (!result.canceled) {
      // Map the assets to include type information
      const assetsWithType: SelectedAsset[] = result.assets.map((asset) => ({
        ...asset,
        type: asset.type === "video" ? "video" : "image",
      }));
      //setSelectedAssets(assetsWithType);
      validateImageBySizeType(assetsWithType);
    }
  };

  // Valiadtion Image Video size and extension
  const validateImageBySizeType = (assetsWithType) => {
    let allowedExtensions;
    // Map extensions to MIME types for validation
    if (settings?.video_encoding == "off") {
      // Map extensions to MIME types for validation
      allowedExtensions = [
        "png",
        "jpeg",
        "jpg",
        "gif",
        "ief",
        "mp4",
        "mkv",
        "mp3",
      ];
    } else {
      // Allowed extensions
      allowedExtensions = [
        "png",
        "jpeg",
        "jpg",
        "gif",
        "ief",
        "mp4",
        "mov",
        "3gpp",
        "mpeg",
        "mkv",
        "wmv",
        "avi",
        "flv",
        "mp3",
      ];
    }
    const validImages = [];
    const inValidMedia = [];
    for (const asset of assetsWithType) {
      const uri = asset.uri;
      const fileName = asset.fileName || uri.split("/").pop();
      const extension = fileName.split(".").pop().toLowerCase();
      // Check file extension and MIME type
      if (!allowedExtensions.includes(extension)) {
        setLargeFileMessage(
          `${fileName} has an invalid extension. Allowed: ${allowedExtensions.join(
            ", "
          )}.`
        );
        inValidMedia.push(asset);
        setShowLargeFileModal(true);
        continue;
      }

      const maxSize = parseMaxFileSizeToBytes(settings?.file_size_allowed);
      if (asset.fileSize > maxSize) {
        console.log(
          `${fileName} is too large (${asset.fileSize}). Maximum size is ${maxSize}.`
        );
        setLargeFileMessage(
          `${fileName} is too large (${(asset.fileSize / (1024 * 1024)).toFixed(
            2
          )} MB). Maximum size is (${(maxSize / (1024 * 1024)).toFixed(2)} MB).`
        );
        inValidMedia.push(asset);
        setShowLargeFileModal(true);
        continue;
      }
      validImages.push(asset);
    }
    if (validImages.length > 0) uploadImage(validImages);
  };

  //KB/MB/GB convert to bytes
  const parseMaxFileSizeToBytes = (sizeInput) => {
    const match = sizeInput.match(/^(\d*\.?\d+)\s*(KB|MB|GB)$/i);
    if (!match) {
      throw new Error('Invalid maxFileSize format. Use format like "200MB".');
    }
    const value = parseFloat(match[1]);
    const unit = match[2].toUpperCase();

    switch (unit) {
      case "KB":
        return value * 1024;
      case "MB":
        return value * 1024 * 1024;
      case "GB":
        return value * 1024 * 1024 * 1024;
      default:
        throw new Error("Unsupported unit. Use KB, MB, or GB.");
    }
  };

  //Image video upload
  const uploadImage = async (selectedImageOrDoc) => {
    setIsUploading(true);
    setUploadProgress(0);
    try {
      const formData = new FormData();
      // mutiple file upload using one api
      selectedImageOrDoc.forEach((file, index) => {
        let name =
          file.mimeType === "application/x-zip-compressed"
            ? file.name
            : file.fileName;


        formData.append(
          "files[]",
          // file.file
          {
            uri: file.uri, // e.g., from image picker
            type: file.mimeType,
            name: name,
          }
        );
      });

      const response = await axios.post(`${apiUrl}/upload/media`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.loaded / progressEvent.total;
          setUploadProgress(progress);
        },
      });
      // Adjust the mapping based on your API response structure
      if (response.data.success) {
          setSelectedAssets(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  //Remove Image/Video
  const handleRemoveAsset = (asset: SelectedAsset) => {
      deleteImage(asset?.name);
  };

  // Delete Image/Video API
  const deleteImage = async (medianame: string) => {
    try {
      const response = await axios.post(
        `${apiUrl}/delete/media`,
        { file: medianame },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        Toast.show({
          type: "success",
          text1: response.data?.message,
        });
        setSelectedAssets((prevAssets) =>
          prevAssets.filter((item) => item.name !== medianame)
        );
      }
      // setSelectedAssets((prevAssets) =>
      //   prevAssets.filter((item) => item.uri !== asset.uri)
      // );
    } catch (error) {
      console.error("Delete error:", error);
      return false;
    }
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
        // setOriginalZip(result.assets[0].file);
      }
    } catch (error) {
      console.error("Error picking ZIP file:", error);
    }
  };

  //Remove zip file
  const removeZipFile = (uri: string) => {
    setZipFiles((prev) => prev.filter((file) => file.uri !== uri));
  };

  // handle Price with Number only
  const handlePriceChange = (text) => {
    // Allows only digits
    if (/^\d*$/.test(text)) {
      setPrice(text);
    }
  };

  //Share Post
  const sharePost = async () => {
    try {
      const names = selectedAssets.map((item) => ({ file: item.name }));
      // Prepare FormData
      const formData = new FormData();
      // Append normal data
      formData.append("description", desc); // Example normal data
      formData.append("title", title); // Example normal data
      formData.append("locked", lock === true ? "yes" : "");
      formData.append("price", price);
      formData.append("fileuploader-list-photo", JSON.stringify(names));

      // // Append file
      if (zipFiles.length > 0) {
        formData.append("zip", {
          uri: zipFiles[0].uri,
          name: zipFiles[0].name,
          type: zipFiles[0].mimeType || "application/zip", // Ensure correct MIME type
        });
      }

      // Make API call to login endpoint
      const response = await axios.post(`${apiUrl}/updates`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data?.success === true) {
        if (response.data?.pending === true) {
          setUploadedMessage(response.data?.message);
          if (response.data?.encode === true) {
            setShowVideoOnTheWay(true);
          } else {
            setPublicationMessageShow(true);
          }
          setDesc("");
          setSelectedAssets([]);
          setZipFiles([]);
          setOriginalZip([]);
          setPriceVisible(false);
          setPrice("");
          setTitleVisible(false);
          setTitle("");

          setLock(true);
        } else {
          setDesc("");
          setSelectedAssets([]);
          setZipFiles([]);
          setOriginalZip([]);
          setPriceVisible(false);
          setPrice("");
          setTitleVisible(false);
          setTitle("");
          setLock(true);
        }
      } else {
        let title = response.data.errors;
        showToasForFailur(title);
      }
    } catch (error) {
      console.log("eroro", error);
    }
  };

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
            <ProfileWithSearchBarComponents
              value={desc}
              onChangeText={setDesc}
            />
          </View>
          {priceVisible && (
            <View
              style={[
                styles.inputContainer,
                theme.card,
                { borderColor: theme.border.borderColor },
              ]}
            >
              <Feather
                name="dollar-sign"
                size={20}
                color="#888b8f"
                style={styles.inputIcon}
              />
              <TextInput
                ref={priceRef}
                style={[styles.inputWithIcon, theme.text, theme.card]}
                placeholder="Price"
                placeholderTextColor={String(theme.text.color) + "99"}
                value={price}
                keyboardType="numeric"
                onChangeText={handlePriceChange}
                editable
              />
              {price && !/^\d+$/.test(price) && (
                <Text style={{ color: "red" }}>Please enter only digits.</Text>
              )}
              <View></View>
            </View>
          )}
          {titleVisible && (
            <View
              style={[
                styles.inputContainer,
                theme.card,
                { borderColor: theme.border.borderColor, marginVertical: 10 },
              ]}
            >
              <MaterialCommunityIcons
                name="format-font"
                size={20}
                color="#888b8f"
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.inputWithIcon, theme.text, theme.card]}
                placeholder="Title"
                ref={titleRef}
                placeholderTextColor={String(theme.text.color) + "99"}
                value={title}
                onChangeText={setTitle}
                editable
              />
              <View></View>
            </View>
          )}
          <View>
            {/* Progress Bar for Uploading */}
            {isUploading && (
              <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                {/* <Text style={[theme.text, { marginBottom: 5 }]}>
                  Uploading: {Math.round(uploadProgress * 100)}%
                </Text> */}
                <Progress.Bar
                  progress={uploadProgress}
                  width={null}
                  height={8}
                  color={theme.primaryColor.color}
                  unfilledColor="#ccc"
                  borderWidth={0}
                  borderRadius={4}
                />
              </View>
            )}

            {/* Display images and videos */}
            <View style={{ marginVertical: 10 }}>
              <MediaGrid
                assets={selectedAssets}
                onRemoveAsset={handleRemoveAsset}
                maxItems={9}
                columns={3}
                spacing={8}
                padding={20}
              />
            </View>

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
            <TouchableOpacity style={{ padding: 5 }} onPress={pickImage}>
              <Feather name="image" size={20} color={theme.iconColor.color} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 5 }} onPress={pickZipFile}>
              <Feather
                name="file-text"
                size={20}
                color={theme.iconColor.color}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => {
                if (priceRef.current) {
                  priceRef.current.focus();
                }
                setPriceVisible(!priceVisible);
              }}
            >
              <AntDesign name="tago" size={20} color={theme.iconColor.color} />
            </TouchableOpacity>
            {lock ? (
              <TouchableOpacity
                onPress={() => {
                  setLock(!lock);
                }}
                style={{ padding: 5 }}
              >
                <Feather name="lock" size={20} color={theme.iconColor.color} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{ padding: 5 }}
                onPress={() => {
                  setLock(!lock);
                }}
              >
                <Feather
                  name="unlock"
                  size={20}
                  color={theme.iconColor.color}
                />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => {
                if (titleRef.current) {
                  titleRef.current.focus();
                }
                setTitleVisible(!titleVisible);
              }}
              style={{ padding: 5 }}
            >
              <MaterialCommunityIcons
                name="format-font"
                size={20}
                color={theme.iconColor.color}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={async () => {
                let result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                  allowsMultipleSelection: false,
                  quality: 1,
                });
                if (!result.canceled && result.assets && result.assets[0]) {
                  setVideoUri(result.assets[0].uri);
                  setVideoModalVisible(true);
                }
              }}
            >
              <Feather name="video" size={20} color={theme.iconColor.color} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => setIsOpen(true)}
            >
              <MaterialIcons
                name="insert-emoticon"
                size={20}
                color={theme.iconColor.color}
              />
            </TouchableOpacity>
            <EmojiPicker
              open={isOpen}
              onClose={() => setIsOpen(false)}
              onEmojiSelected={handleEmojiSelect}
              enableSearchBar // Optional: adds search functionality
              categoryPosition="top" // Optional: customize category tabs position
            />
          </View>
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
              style={[
                styles.publishButton,
                theme.button,
                { borderRadius: 20, opacity: desc ? 1 : 0.5 },
              ]}
              onPress={() => {
                sharePost();
                // Example: push a new post to postData
                // const newPost: PostItem = {
                //   id: postData.length + 1,
                //   avatar_image: "https://placehold.co/60x60", // Placeholder
                //   description: profileInput,
                //   username: "username", // Placeholder
                //   timeduration: new Date().toLocaleTimeString(), // Example time
                //   image: selectedAssets
                //     .filter((a) => a.type === "image")
                //     .map((a) => a.uri),
                //   video: selectedAssets
                //     .filter((a) => a.type === "video")
                //     .map((a) => a.uri),
                //   zipFiles: zipFiles,
                //   isLiked: true,
                //   totalLike: 10,
                //   totalComments: 100,
                // };
                // setPostData((prev) => [newPost, ...prev]);
                // console.log("selectedasset", selectedAssets);
                // console.log("zip file", zipFiles);
                // if (selectedAssets.length > 0) {
                //   uploadImage(selectedAssets);
                // }
                // if (zipFiles.length > 0) {
                //   uploadImage(zipFiles);
                // }

                // setProfileInput("");
                // setSelectedAssets([]);
                // setZipFiles([]);
              }}
              // disabled={!desc.trim()}
            >
              <Text style={styles.publishButtonText}>Publish</Text>
            </TouchableOpacity>
          </View>
        </View>
        {publicationMessageShow && (
          <View
            style={{
              backgroundColor: "#7889e8",
              padding: 10,
              marginHorizontal: 20,
            }}
          >
            <Text style={[styles.subTitle, { color: "white" }]}>
              {uploadedMessage?.text}
              {uploadedMessage?.link_text}
            </Text>
          </View>
        )}
        <FlatList
          data={postData}
          renderItem={({ item }) => (
            <View style={[theme.card, theme.shadow, { marginTop: 10 }]}>
              <PostShareComponent post={item} />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={()=> fetchPostForHomeUpdate()}
           onEndReachedThreshold={0.5}
        />
      </View>

      {/* Large File Size Modal */}
      <Modal
        visible={showLargeFileModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLargeFileModal(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: theme.card.backgroundColor,
              borderRadius: 10,
              padding: 20,
              width: "80%",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setShowLargeFileModal(false);
                setLargeFileMessage("");
              }}
              style={{
                padding: 20,
                // backgroundColor: "red",
                borderRadius: 25,
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderColor: "red",
                borderStyle: "solid",
                borderWidth: 1,
              }}
            >
              <Feather name="x" size={20} color="red" />
            </TouchableOpacity>
            <Text style={styles.oops}>Oops...</Text>
            <Text style={styles.largeFileName}>{largeFileMessage}</Text>
            <TouchableOpacity
              onPress={() => {
                setShowLargeFileModal(false);
                setLargeFileMessage("");
              }}
              style={{
                backgroundColor: theme.button.backgroundColor,
                borderRadius: 20,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
            >
              <Text
                style={[
                  theme.text,
                  { color: theme.button.color, fontWeight: "bold" },
                ]}
              >
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Video on the way */}
      <Modal
        visible={showVideoOnTheWay}
        transparent
        animationType="fade"
        onRequestClose={() => setShowVideoOnTheWay(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: theme.card.backgroundColor,
              borderRadius: 10,
              padding: 20,
              width: "80%",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setShowVideoOnTheWay(false);
              }}
              style={{
                padding: 20,
                // backgroundColor: "red",
                borderRadius: 25,
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderColor: "red",
                borderStyle: "solid",
                borderWidth: 1,
              }}
            >
              <Feather name="x" size={20} color="red" />
            </TouchableOpacity>
            <Text style={styles.oops}>{uploadedMessage?.title}</Text>
            <Text style={styles.largeFileName}>{uploadedMessage?.text}</Text>
            <TouchableOpacity
              onPress={() => {
                setShowVideoOnTheWay(false);
                setVideoMessage("");
              }}
              style={{
                backgroundColor: theme.button.backgroundColor,
                borderRadius: 20,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
            >
              <Text
                style={[
                  theme.text,
                  { color: theme.button.color, fontWeight: "bold" },
                ]}
              >
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Video Modal */}
      <Modal
        visible={videoModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setVideoModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.85)" }}>
          {/* Close Button */}
          <TouchableOpacity
            onPress={() => {
              setVideoModalVisible(false);
              setVideoUri(null);
              setVideoTitle("");
              setShowTitleInput(false);
            }}
            style={{
              position: "absolute",
              top: 40,
              left: 20,
              backgroundColor: "red",
              borderRadius: 16,
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
            }}
          >
            <Feather name="x" size={28} color="#fff" />
          </TouchableOpacity>
          {/* Video Preview - fills the screen */}
          {videoUri && (
            <View style={{ flex: 1, width: "100%" }}>
              <Video
                source={{ uri: videoUri }}
                style={{ flex: 1, width: "100%" }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                shouldPlay
              />
              {/* Draggable Title Text Overlay */}
              {videoTitle ? (
                <Animated.View
                  {...panResponder.panHandlers}
                  style={{
                    position: "absolute",
                    left: pan.x,
                    top: pan.y,
                    zIndex: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 22,
                      fontWeight: "bold",
                      textShadowColor: "rgba(0,0,0,0.7)",
                      textShadowOffset: { width: 1, height: 1 },
                      textShadowRadius: 4,
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      backgroundColor: "rgba(0,0,0,0.2)",
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
            style={{
              position: "absolute",
              top: 40,
              right: 30,
              backgroundColor: "rgba(0,0,0,0.6)",
              borderRadius: 16,
              width: 36,
              height: 36,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 20,
            }}
            onPress={() => setShowTitleInput(true)}
          >
            <Feather name="type" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 86,
              right: 30,
              backgroundColor: "rgba(0,0,0,0.6)",
              borderRadius: 16,
              width: 36,
              height: 36,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 20,
            }}
            onPress={() => setShowDropdown(true)}
          >
            <MaterialCommunityIcons
              name="form-dropdown"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
          {/* Minimal input overlay for title */}
          {showTitleInput && (
            <View
              style={{
                position: "absolute",
                bottom: 100,
                left: 0,
                right: 0,
                alignItems: "center",
                zIndex: 30,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "rgba(30,30,30,0.95)",
                  borderRadius: 20,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  minWidth: 220,
                }}
              >
                <TextInput
                  value={videoTitle}
                  onChangeText={setVideoTitle}
                  placeholder="Add a title..."
                  placeholderTextColor="#aaa"
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    flex: 1,
                    minWidth: 120,
                    padding: 0,
                    margin: 0,
                    backgroundColor: "transparent",
                  }}
                  maxLength={100}
                  autoFocus
                />
                <TouchableOpacity
                  onPress={() => setShowTitleInput(false)}
                  style={{ marginLeft: 8 }}
                >
                  <Feather name="check" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          {/* Next Button at the bottom of the video modal */}
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: "center",
              zIndex: 100,
            }}
            pointerEvents="box-none"
          >
            <TouchableOpacity
              style={{
                backgroundColor: theme.button.backgroundColor,
                borderRadius: 24,
                paddingHorizontal: 40,
                paddingVertical: 14,
                margin: 24,
                elevation: 2,
              }}
              onPress={() => {
                // Print videoUri, videoTitle, pan.x, pan.y, and dropdownValue
                // console.log("Video URI:", videoUri);
                // console.log("Video Title:", videoTitle);
                // console.log("Pan X:", (pan.x as any)._value);
                // console.log("Pan Y:", (pan.y as any)._value);
                // console.log("Dropdown Value:", dropdownValue);
                setTimeout(() => {
                  setVideoModalVisible(false);
                }, 200);
              }}
            >
              <Text
                style={[
                  theme.text,
                  { color: theme.button.color, fontWeight: "bold" },
                ]}
              >
                Next
              </Text>
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
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}
          activeOpacity={1}
          onPressOut={() => setShowDropdown(false)}
        >
          <View
            style={{
              position: "absolute",
              top: 130,
              right: 30,
              backgroundColor: "#222",
              borderRadius: 10,
              paddingVertical: 8,
              width: 160,
              zIndex: 100,
            }}
          >
            <TouchableOpacity
              style={{ padding: 12 }}
              onPress={() => {
                setDropdownValue("Option 1");
                setShowDropdown(false);
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>
                Available For Subscriber
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 12 }}
              onPress={() => {
                setDropdownValue("Option 2");
                setShowDropdown(false);
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>
                Available For Everyone
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
    // </ScrollView>
  );
};

export default HomeScreen;
