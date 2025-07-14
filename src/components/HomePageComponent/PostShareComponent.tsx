import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Linking,
  Dimensions,
} from "react-native";
import React, { useContext, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "@/src/constants/Themes";
import { RootState } from "@/src/redux/store";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
// Remove import of GestureRecognizer
// import GestureRecognizer from 'react-native-swipe-gestures';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
// Remove Swiper import
// import Swiper from 'react-native-swiper';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');
const PostShareComponent = (props: any) => {
  const { post } = props;
  const theme = useContext(ThemeContext);
  const user = useSelector((state: RootState) => state.userAuth.user);
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [videoViewerVisible, setVideoViewerVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [fullScreenIndex, setFullScreenIndex] = useState<number | null>(null);
  const [fullScreenVisible, setFullScreenVisible] = useState(false);
  const videoModalRef = useRef<Video>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const primaryColor = theme.primaryColor?.color || "#1976d2";
  const allMedia = [...(post.image || []), ...(post.video || [])];
  const [imageIndex, setImageIndex] = useState<number>(0);

  // Reanimated shared value for swipe
  const translateX = useSharedValue(0);

  // Animated style for image
  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // Play/pause handler for modal video
  const handleToggleVideoPlay = async () => {
    if (videoModalRef.current) {
      const status = await videoModalRef.current.getStatusAsync();
      if (status.isLoaded) {
        if (status.isPlaying) {
          await videoModalRef.current.pauseAsync();
          setIsVideoPlaying(false);
        } else {
          await videoModalRef.current.playAsync();
          setIsVideoPlaying(true);
        }
      }
    }
  };

  // Add state for play/pause in full-screen video
  const [isFullScreenVideoPlaying, setIsFullScreenVideoPlaying] = useState(true);
  const fullScreenVideoRef = useRef<Video>(null);

  // Function to toggle play/pause and control the video
  const toggleFullScreenVideoPlay = async () => {
    if (fullScreenVideoRef.current) {
      const status = await fullScreenVideoRef.current.getStatusAsync();
      if (status.isLoaded) {
        if (status.isPlaying) {
          await fullScreenVideoRef.current.pauseAsync();
          setIsFullScreenVideoPlaying(false);
        } else {
          await fullScreenVideoRef.current.playAsync();
          setIsFullScreenVideoPlaying(true);
        }
      }
    }
  };

  // Remove swipeConfig
  // const swipeConfig = {
  //   velocityThreshold: 0.3,
  //   directionalOffsetThreshold: 80,
  // };

  return (
    <>
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
        <View
          style={{
            width: "25%",
            height: 100,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            source={user?.avatar_image ? { uri: user.avatar_image } : require("../../../assets/img/userprofile.png")}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
        </View>
        <View style={{ width: "55%", height: 100, marginTop: 15 }}>
          <Text
            style={[theme.primaryColor, { fontSize: 18, fontWeight: "bold" }]}
          >
            {user?.name || "User"}
            <Text
              style={[theme.mute_text, { fontSize: 12, fontWeight: "normal" }]}
            >
              @{user?.username || "user"}
            </Text>
          </Text>
          <Text
            style={[
              theme.mute_text,
              { fontSize: 12, fontWeight: "normal", marginTop: 5 },
            ]}
          >
            {new Date().toLocaleTimeString()}
            <Feather name="lock" size={12} color={theme.mute_text.color} />
          </Text>
        </View>
        <View
          style={{
            width: "20%",
            height: 100,
            alignItems: "flex-end",
          }}
        >
          <Ionicons
            name="ellipsis-horizontal-sharp"
            size={24}
            color={theme.iconColor.color}
          />
        </View>
      </View>
      <View
        style={[
          {
            width: "100%",
            flexDirection: "row",
            paddingVertical: 10,
          },
        ]}
      >
        <Text
          style={[
            theme.mute_text,
            { fontSize: 16, fontWeight: "normal", paddingHorizontal: 20 },
          ]}
        >
          {post.description}
        </Text>
      </View>
      {/* Display images and videos below the description */}
      {(post.image?.length > 0 || post.video?.length > 0) && (
        <View
          style={{ width: "100%", paddingVertical: 8, alignItems: "center" }}
        >
          {/* Single image: full width */}
          {post.image?.length === 1 && post.video?.length === 0 && (
            <TouchableOpacity
              key={post.image[0]}
              onPress={() => {
                setCurrentImage(post.image[0]);
                setFullScreenIndex(0);
                setFullScreenVisible(true);
              }}
              activeOpacity={0.8}
              style={[
                { width: "100%", aspectRatio: 1, marginBottom: 10 },
                theme.shadow,
              ]}
            >
              <Image
                source={{ uri: post.image[0] }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
          {/* Single video: full width */}
          {post.video?.length === 1 && (!post.image || post.image.length === 0) && (
            <TouchableOpacity
              key={post.video[0]}
              onPress={() => {
                setCurrentVideo(post.video[0]);
                setFullScreenIndex(0);
                setFullScreenVisible(true);
              }}
              activeOpacity={0.8}
              style={[
                { width: "100%", aspectRatio: 1, marginBottom: 10, backgroundColor: "#000", overflow: "hidden", justifyContent: "center", alignItems: "center" },
                theme.shadow,
              ]}
            >
              <Video
                ref={videoModalRef}
                source={{ uri: post.video[0] }}
                style={{ width: "100%", height: "100%" }}
                useNativeControls={false}
                resizeMode={ResizeMode.COVER}
                shouldPlay={isVideoPlaying}
                isLooping={false}
              />
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Feather name="play" size={40} color="#fff" />
              </View>
            </TouchableOpacity>
          )}
          {/* Two-column grid for other cases */}
          {[...(post.image || []), ...(post.video || [])].length !== 1 &&
            [...(post.image || []), ...(post.video || [])].length !== 3 &&
            [...(post.image || []), ...(post.video || [])].length !== 4 &&
            [...(post.image || []), ...(post.video || [])].length !== 5 &&
            [...(post.image || []), ...(post.video || [])].length <= 5 &&
            [...(post.image || []), ...(post.video || [])].length > 0 && (
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {[...(post.image || []), ...(post.video || [])].map(
                  (uri: string, idx: number) => {
                    const isImage = idx < (post.image?.length || 0);
                    return isImage ? (
                      <TouchableOpacity
                        key={uri + idx}
                        onPress={() => {
                          setCurrentImage(uri);
                          setFullScreenIndex(idx);
                          setFullScreenVisible(true);
                        }}
                        activeOpacity={0.8}
                        style={[
                          {
                            width: "49.5%",
                            aspectRatio: 1,
                            marginBottom: 10,
                            backgroundColor: "#eee",
                          },
                          theme.shadow,
                        ]}
                      >
                        <Image
                          source={{ uri }}
                          style={{ width: "100%", height: "100%" }}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        key={uri + idx}
                        onPress={() => {
                          setCurrentVideo(uri);
                          setFullScreenIndex(idx);
                          setFullScreenVisible(true);
                        }}
                        activeOpacity={0.8}
                        style={[
                          {
                            width: "49.5%",
                            aspectRatio: 1,
                            marginBottom: 10,
                            backgroundColor: "#000",
                            overflow: "hidden",
                            justifyContent: "center",
                            alignItems: "center",
                          },
                          theme.shadow,
                        ]}
                      >
                        <Video
                          ref={fullScreenVideoRef}
                          source={{ uri }}
                          style={{ width: "100%", height: "100%" }}
                          useNativeControls={false}
                          resizeMode={ResizeMode.CONTAIN}
                          shouldPlay={isFullScreenVideoPlaying}
                          isLooping={false}
                        />
                        <View
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <TouchableOpacity
                            onPress={toggleFullScreenVideoPlay}
                            style={{ position: "absolute", alignSelf: "center", top: "50%", marginTop: -32, zIndex: 20, backgroundColor: "rgba(0,0,0,0.4)", borderRadius: 32, width: 64, height: 64, justifyContent: "center", alignItems: "center" }}
                            activeOpacity={0.7}
                          >
                            <Feather name={isFullScreenVideoPlaying ? 'pause' : 'play'} size={40} color="#fff" />
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                )}
              </View>
            )}
          {/* Custom layout for exactly 3 media items */}
          {[...(post.image || []), ...(post.video || [])].length === 3 && (
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                height: 260,
                gap: 5,
              }}
            >
              {/* Left column: first media */}
              <View style={{ flex: 11 }}>
                {(() => {
                  const uri = [...(post.image || []), ...(post.video || [])][0];
                  const isImage = 0 < (post.image?.length || 0);
                  return isImage ? (
                    <TouchableOpacity
                      key={uri + "0"}
                      onPress={() => {
                        setCurrentImage(uri);
                        setFullScreenIndex(0);
                        setFullScreenVisible(true);
                      }}
                      activeOpacity={0.8}
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#eee",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        source={{ uri }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      key={uri + "0"}
                      onPress={() => {
                        setCurrentVideo(uri);
                        setFullScreenIndex(0);
                        setFullScreenVisible(true);
                      }}
                      activeOpacity={0.8}
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#000",
                        overflow: "hidden",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Video
                        ref={fullScreenVideoRef}
                        source={{ uri }}
                        style={{ width: "100%", height: "100%" }}
                        useNativeControls={false}
                        resizeMode={ResizeMode.CONTAIN}
                        shouldPlay={isFullScreenVideoPlaying}
                        isLooping={false}
                      />
                      <View
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={toggleFullScreenVideoPlay}
                          style={{ position: "absolute", alignSelf: "center", top: "50%", marginTop: -32, zIndex: 20, backgroundColor: "rgba(0,0,0,0.4)", borderRadius: 32, width: 64, height: 64, justifyContent: "center", alignItems: "center" }}
                          activeOpacity={0.7}
                        >
                          <Feather name={isFullScreenVideoPlaying ? 'pause' : 'play'} size={40} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  );
                })()}
              </View>
              {/* Right column: two stacked media */}
              <View style={{ flex: 9, justifyContent: "space-between" }}>
                {[1, 2].map((i) => {
                  const uri = [...(post.image || []), ...(post.video || [])][i];
                  const isImage = i < (post.image?.length || 0);
                  return isImage ? (
                    <TouchableOpacity
                      key={uri + i}
                      onPress={() => {
                        setCurrentImage(uri);
                        setFullScreenIndex(i);
                        setFullScreenVisible(true);
                      }}
                      activeOpacity={0.8}
                      style={[{
                        width: "100%",
                        height: 128,
                        backgroundColor: "#eee",
                        overflow: "hidden",
                        marginBottom: i === 1 ? 5 : 0,
                      },theme.shadow]}
                    >
                      <Image
                        source={{ uri }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      key={uri + i}
                      onPress={() => {
                        setCurrentVideo(uri);
                        setFullScreenIndex(i);
                        setFullScreenVisible(true);
                      }}
                      activeOpacity={0.8}
                      style={[{
                        width: "100%",
                        height: 128,
                        backgroundColor: "#000",
                        overflow: "hidden",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: i === 1 ? 5 : 0,
                      },theme.shadow]}
                    >
                      <Video
                        ref={fullScreenVideoRef}
                        source={{ uri }}
                        style={{ width: "100%", height: "100%" }}
                        useNativeControls={false}
                        resizeMode={ResizeMode.CONTAIN}
                        shouldPlay={isFullScreenVideoPlaying}
                        isLooping={false}
                      />
                      <View
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={toggleFullScreenVideoPlay}
                          style={{ position: "absolute", alignSelf: "center", top: "50%", marginTop: -32, zIndex: 20, backgroundColor: "rgba(0,0,0,0.4)", borderRadius: 32, width: 64, height: 64, justifyContent: "center", alignItems: "center" }}
                          activeOpacity={0.7}
                        >
                          <Feather name={isFullScreenVideoPlaying ? 'pause' : 'play'} size={40} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
          {/* Custom layout for exactly 4 media items */}
          {[...(post.image || []), ...(post.video || [])].length === 4 && (
            <View style={{ width: "100%", alignItems: "center" }}>
              {/* First row: one media, full width */}
              <View style={{ width: "100%", aspectRatio: 3, marginBottom: 3 }}>
                {(() => {
                  const uri = [...(post.image || []), ...(post.video || [])][0];
                  const isImage = 0 < (post.image?.length || 0);
                  return isImage ? (
                    <TouchableOpacity
                      key={uri + "0"}
                      onPress={() => {
                        setCurrentImage(uri);
                        setFullScreenIndex(0);
                        setFullScreenVisible(true);
                      }}
                      activeOpacity={0.8}
                      style={[{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#eee",
                        overflow: "hidden",
                      },theme.shadow]}
                    >
                      <Image
                        source={{ uri }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      key={uri + "0"}
                      onPress={() => {
                        setCurrentVideo(uri);
                        setFullScreenIndex(0);
                        setFullScreenVisible(true);
                      }}
                      activeOpacity={0.8}
                      style={[{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#000",
                        overflow: "hidden",
                        justifyContent: "center",
                        alignItems: "center",
                      },theme.shadow]}
                    >
                      <Video
                        ref={fullScreenVideoRef}
                        source={{ uri }}
                        style={{ width: "100%", height: "100%" }}
                        useNativeControls={false}
                        resizeMode={ResizeMode.CONTAIN}
                        shouldPlay={isFullScreenVideoPlaying}
                        isLooping={false}
                      />
                      <View
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={toggleFullScreenVideoPlay}
                          style={{ position: "absolute", alignSelf: "center", top: "50%", marginTop: -32, zIndex: 20, backgroundColor: "rgba(0,0,0,0.4)", borderRadius: 32, width: 64, height: 64, justifyContent: "center", alignItems: "center" }}
                          activeOpacity={0.7}
                        >
                          <Feather name={isFullScreenVideoPlaying ? 'pause' : 'play'} size={40} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  );
                })()}
              </View>
              {/* Second row: three media, equal columns */}
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {[1, 2, 3].map((i) => {
                  const uri = [...(post.image || []), ...(post.video || [])][i];
                  const isImage = i < (post.image?.length || 0);
                  return isImage ? (
                    <TouchableOpacity
                      key={uri + i}
                      onPress={() => {
                        setCurrentImage(uri);
                        setFullScreenIndex(i);
                        setFullScreenVisible(true);
                      }}
                      activeOpacity={0.8}
                      style={[{
                        width: "32.5%",
                        aspectRatio: 1,
                        backgroundColor: "#eee",
                        overflow: "hidden",
                      },theme.shadow]}
                    >
                      <Image
                        source={{ uri }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      key={uri + i}
                      onPress={() => {
                        setCurrentVideo(uri);
                        setFullScreenIndex(i);
                        setFullScreenVisible(true);
                      }}
                      activeOpacity={0.8}
                      style={[{
                        width: "32.5%",
                        aspectRatio: 1,
                        backgroundColor: "#000",
                        overflow: "hidden",
                        justifyContent: "center",
                        alignItems: "center",
                      },theme.shadow]}
                    >
                      <Video
                        ref={fullScreenVideoRef}
                        source={{ uri }}
                        style={{ width: "100%", height: "100%" }}
                        useNativeControls={false}
                        resizeMode={ResizeMode.CONTAIN}
                        shouldPlay={isFullScreenVideoPlaying}
                        isLooping={false}
                      />
                      <View
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={toggleFullScreenVideoPlay}
                          style={{ position: "absolute", alignSelf: "center", top: "50%", marginTop: -32, zIndex: 20, backgroundColor: "rgba(0,0,0,0.4)", borderRadius: 32, width: 64, height: 64, justifyContent: "center", alignItems: "center" }}
                          activeOpacity={0.7}
                        >
                          <Feather name={isFullScreenVideoPlaying ? 'pause' : 'play'} size={40} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
          {/* Custom layout for exactly 5 media items */}
          {[...(post.image || []), ...(post.video || [])].length === 5 && (
            <View style={{ width: "100%", alignItems: "center" }}>
              {/* First row: two media, equal columns */}
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 3,
                }}
              >
                {[0, 1].map((i) => {
                  const uri = [...(post.image || []), ...(post.video || [])][i];
                  const isImage = i < (post.image?.length || 0);
                  return isImage ? (
                    <TouchableOpacity
                      key={uri + i}
                      onPress={() => {
                        setCurrentImage(uri);
                        setFullScreenIndex(i);
                        setFullScreenVisible(true);
                      }}
                      activeOpacity={0.8}
                      style={[{
                        width: "49.5%",
                        aspectRatio: 1,
                        backgroundColor: "#eee",
                        overflow: "hidden",
                      },theme.shadow]}
                    >
                      <Image
                        source={{ uri }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      key={uri + i}
                      onPress={() => {
                        setCurrentVideo(uri);
                        setFullScreenIndex(i);
                        setFullScreenVisible(true);
                      }}
                      activeOpacity={0.8}
                      style={[{
                        width: "49.5%",
                        aspectRatio: 1,
                        backgroundColor: "#000",
                        overflow: "hidden",
                        justifyContent: "center",
                        alignItems: "center",
                      },theme.shadow]}
                    >
                      <Video
                        ref={fullScreenVideoRef}
                        source={{ uri }}
                        style={{ width: "100%", height: "100%" }}
                        useNativeControls={false}
                        resizeMode={ResizeMode.CONTAIN}
                        shouldPlay={isFullScreenVideoPlaying}
                        isLooping={false}
                      />
                      <View
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={toggleFullScreenVideoPlay}
                          style={{ position: "absolute", alignSelf: "center", top: "50%", marginTop: -32, zIndex: 20, backgroundColor: "rgba(0,0,0,0.4)", borderRadius: 32, width: 64, height: 64, justifyContent: "center", alignItems: "center" }}
                          activeOpacity={0.7}
                        >
                          <Feather name={isFullScreenVideoPlaying ? 'pause' : 'play'} size={40} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {/* Second row: three media, equal columns */}
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {[2, 3, 4].map((i) => {
                  const uri = [...(post.image || []), ...(post.video || [])][i];
                  const isImage = i < (post.image?.length || 0);
                  return isImage ? (
                    <TouchableOpacity
                      key={uri + i}
                      onPress={() => {
                        setCurrentImage(uri);
                        setFullScreenIndex(i);
                        setFullScreenVisible(true);
                      }}
                      activeOpacity={0.8}
                      style={[{
                        width: "32.5%",
                        aspectRatio: 1,
                        backgroundColor: "#eee",
                        overflow: "hidden",
                      },theme.shadow]}
                    >
                      <Image
                        source={{ uri }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      key={uri + i}
                      onPress={() => {
                        setCurrentVideo(uri);
                        setFullScreenIndex(i);
                        setFullScreenVisible(true);
                      }}
                      activeOpacity={0.8}
                      style={[{
                        width: "32.5%",
                        aspectRatio: 1,
                        backgroundColor: "#000",
                        overflow: "hidden",
                        justifyContent: "center",
                        alignItems: "center",
                      },theme.shadow]}
                    >
                      <Video
                        ref={fullScreenVideoRef}
                        source={{ uri }}
                        style={{ width: "100%", height: "100%" }}
                        useNativeControls={false}
                        resizeMode={ResizeMode.CONTAIN}
                        shouldPlay={isFullScreenVideoPlaying}
                        isLooping={false}
                      />
                      <View
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={toggleFullScreenVideoPlay}
                          style={{ position: "absolute", alignSelf: "center", top: "50%", marginTop: -32, zIndex: 20, backgroundColor: "rgba(0,0,0,0.4)", borderRadius: 32, width: 64, height: 64, justifyContent: "center", alignItems: "center" }}
                          activeOpacity={0.7}
                        >
                          <Feather name={isFullScreenVideoPlaying ? 'pause' : 'play'} size={40} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
          {/* Custom layout for more than 5 media items */}
          {allMedia.length > 5 && (
            <View style={{ width: "100%", alignItems: "center" }}>
              {/* First row: two media, equal columns */}
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 3,
                }}
              >
                {[0, 1].map((i) => {
                  const uri = allMedia[i];
                  const isImage = i < (post.image?.length || 0);
                  return isImage ? (
                    <TouchableOpacity
                      key={uri + i}
                      onPress={() => {
                        setFullScreenIndex(i);
                        setFullScreenVisible(true);
                      }}
                      activeOpacity={0.8}
                      style={[{
                        width: "49.5%",
                        aspectRatio: 1,
                        backgroundColor: "#eee",
                        overflow: "hidden",
                      },theme.shadow]}
                    >
                      <Image
                        source={{ uri }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      key={uri + i}
                      onPress={() => {
                        setFullScreenIndex(i);
                        setFullScreenVisible(true);
                      }}
                      activeOpacity={0.8}
                      style={[{
                        width: "49.5%",
                        aspectRatio: 1,
                        backgroundColor: "#000",
                        overflow: "hidden",
                        justifyContent: "center",
                        alignItems: "center",
                      },theme.shadow]}
                    >
                      <Video
                        ref={fullScreenVideoRef}
                        source={{ uri }}
                        style={{ width: "100%", height: "100%" }}
                        useNativeControls={false}
                        resizeMode={ResizeMode.CONTAIN}
                        shouldPlay={isFullScreenVideoPlaying}
                        isLooping={false}
                      />
                      <View
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={toggleFullScreenVideoPlay}
                          style={{ position: "absolute", alignSelf: "center", top: "50%", marginTop: -32, zIndex: 20, backgroundColor: "rgba(0,0,0,0.4)", borderRadius: 32, width: 64, height: 64, justifyContent: "center", alignItems: "center" }}
                          activeOpacity={0.7}
                        >
                          <Feather name={isFullScreenVideoPlaying ? 'pause' : 'play'} size={40} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {/* Second row: three media, equal columns, last with overlay */}
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {[2, 3, 4].map((i, idx) => {
                  const uri = allMedia[i];
                  const isImage = i < (post.image?.length || 0);
                  const isLast = idx === 2;
                  const overlay = isLast && allMedia.length > 5;
                  const content = isImage ? (
                    <Image
                      source={{ uri }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  ) : (
                    <Video
                      ref={fullScreenVideoRef}
                      source={{ uri }}
                      style={{ width: "100%", height: "100%" }}
                      useNativeControls={false}
                      resizeMode={ResizeMode.CONTAIN}
                      shouldPlay={isFullScreenVideoPlaying}
                      isLooping={false}
                    />
                  );
                  return (
                    <TouchableOpacity
                      key={uri + i}
                      onPress={() => {
                        setFullScreenIndex(i);
                        setFullScreenVisible(true);
                      }}
                      activeOpacity={0.8}
                      style={{
                        width: "32%",
                        aspectRatio: 1,
                        backgroundColor: isImage ? "#eee" : "#000",
                        overflow: "hidden",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {content}
                      {/* Overlay for 5+ */}
                      {overlay && (
                        <View
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0,0,0,0.5)",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: "#fff",
                              fontSize: 32,
                              fontWeight: "bold",
                            }}
                          >
                            5+
                          </Text>
                        </View>
                      )}
                      {/* Play icon overlay for video */}
                      {!isImage && (
                        <View
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Feather name="play" size={40} color="#fff" />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
        </View>
      )}

      {/* Zip Files (always show if present) */}
      {post.zipFiles && post.zipFiles.length > 0 && (
        <View style={{ width: "100%", marginTop: 10, padding: 10 }}>
          {post.zipFiles.map((file: any, idx: number) => (
            <TouchableOpacity
              key={file.uri + idx}
              onPress={() => Linking.openURL(file.uri)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
              activeOpacity={0.8}
            >
              {/* Icon in circle with primary color */}
              <View
                style={{
                  backgroundColor: primaryColor,
                  width: 80,
                  height: 80,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 12,
                }}
              >
                <FontAwesome name="file-zip-o" size={24} color="#fff" />
              </View>
              {/* Title on white background */}
              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  paddingVertical: 8,
                  paddingHorizontal: 14,
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ color: "#222", fontWeight: "500" }}
                  numberOfLines={1}
                >
                  {file.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <View
        style={[
          {
            width: "100%",
            flexDirection: "row",
            paddingHorizontal: 20,
          },
        ]}
      >
        <View
          style={{
            width: "40%",
            justifyContent: "space-between",
            flexDirection: "row",
            paddingVertical: 10,
          }}
        >
          {post.isLiked ? (
            <AntDesign name="heart" size={24} color="red" />
          ) : (
            <AntDesign name="hearto" size={24} color={theme.mute_text.color} />
          )}
          <Ionicons
            name="chatbubble-outline"
            size={24}
            color={theme.mute_text.color}
          />
          <Feather name="download" size={24} color={theme.mute_text.color} />
        </View>
        <View
          style={{
            width: "60%",
            justifyContent: "flex-end",
            flexDirection: "row",
            paddingVertical: 10,
          }}
        >
          <Feather name="bookmark" size={24} color={theme.mute_text.color} />
        </View>
      </View>
      <View
        style={[
          {
            width: "100%",
            flexDirection: "row",
            paddingVertical: 10,
          },
        ]}
      >
        <Text
          style={[
            theme.mute_text,
            { fontSize: 17, fontWeight: "normal", paddingHorizontal: 20 },
          ]}
        >
          {post.totalLike} likes . {post.totalComments} comments
        </Text>
      </View>
      {/* Unified Full-screen modal for all image/video previews with swipe navigation */}
      {fullScreenVisible && fullScreenIndex !== null && (
        <Modal
          visible={true}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setFullScreenVisible(false)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.95)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => setFullScreenVisible(false)}
              style={{ position: "absolute", top: 40, right: 20, zIndex: 10 }}
            >
              <Feather name="x" size={32} color="#fff" />
            </TouchableOpacity>
            {/* Previous Button */}
            {fullScreenIndex > 0 && (
              <TouchableOpacity
                onPress={() => setFullScreenIndex(fullScreenIndex - 1)}
                style={{ position: "absolute", left: 20, top: "50%", marginTop: -32, zIndex: 10, backgroundColor: "rgba(0,0,0,0.4)", borderRadius: 32, width: 64, height: 64, justifyContent: "center", alignItems: "center" }}
                activeOpacity={0.7}
              >
                <Feather name="chevron-left" size={40} color="#fff" />
              </TouchableOpacity>
            )}
            {/* Next Button */}
            {fullScreenIndex < allMedia.length - 1 && (
              <TouchableOpacity
                onPress={() => setFullScreenIndex(fullScreenIndex + 1)}
                style={{ position: "absolute", right: 20, top: "50%", marginTop: -32, zIndex: 10, backgroundColor: "rgba(0,0,0,0.4)", borderRadius: 32, width: 64, height: 64, justifyContent: "center", alignItems: "center" }}
                activeOpacity={0.7}
              >
                <Feather name="chevron-right" size={40} color="#fff" />
              </TouchableOpacity>
            )}
            {/* Media display */}
            {(() => {
              const uri = allMedia[fullScreenIndex];
              const isImage = fullScreenIndex < (post.image?.length || 0);
              if (isImage) {
                return (
                  <Image
                    source={{ uri }}
                    style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                  />
                );
              } else {
                return (
                  <View style={{ width: "100%", height: "100%" }}>
                    <Video
                      ref={fullScreenVideoRef}
                      source={{ uri }}
                      style={{ width: "100%", height: "100%" }}
                      useNativeControls={false}
                      resizeMode={ResizeMode.CONTAIN}
                      shouldPlay={isFullScreenVideoPlaying}
                      isLooping={false}
                    />
                    {/* Play/Pause Button Overlay */}
                    <TouchableOpacity
                      onPress={toggleFullScreenVideoPlay}
                      style={{ position: "absolute", alignSelf: "center", top: "50%", marginTop: -32, zIndex: 20, backgroundColor: "rgba(0,0,0,0.4)", borderRadius: 32, width: 64, height: 64, justifyContent: "center", alignItems: "center" }}
                      activeOpacity={0.7}
                    >
                      <Feather name={isFullScreenVideoPlaying ? 'pause' : 'play'} size={40} color="#fff" />
                    </TouchableOpacity>
                  </View>
                );
              }
            })()}
          </View>
        </Modal>
      )}
    </>
  );
};

export default PostShareComponent;
