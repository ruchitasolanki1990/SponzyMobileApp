import React, { useContext, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import styles from './MediaGrid.style';
import { ThemeContext } from '@/src/constants/Themes';
// Define the type for an asset, extending ImagePickerAsset
interface MediaAsset extends ImagePicker.ImagePickerAsset {
  type?: 'image' | 'video';
}

interface MediaGridProps {
  assets: MediaAsset[];
  onRemoveAsset?: (asset: MediaAsset) => void;
  maxItems?: number;
  columns?: number;
  spacing?: number;
  padding?: number;
}

const MediaGrid: React.FC<MediaGridProps> = ({
  assets,
  onRemoveAsset,
  maxItems = 9,
  columns = 3,
  spacing = 8,
  padding = 20,
}) => {
  const videoRefs = useRef<{ [key: string]: Video | null }>({});
  // Get screen dimensions for responsive grid
  const { width: screenWidth } = Dimensions.get('window');
  const itemWidth = (screenWidth - (padding * 2) - (spacing * (columns - 1))) / columns;
  const itemHeight = itemWidth * 0.9; // Maintain aspect ratio
  const theme = useContext(ThemeContext);
  const handleRemoveAsset = (asset: MediaAsset) => {
    if (onRemoveAsset) {
      onRemoveAsset(asset);
    }
  };

  const renderAsset = (asset: MediaAsset, index: number) => {
    const isImage = asset?.format === 'image';
    
    const isVideo = asset?.format === 'video';

    return (
      <View key={asset.uri || index} style={[styles.assetItem, { width: itemWidth, height: itemHeight }]}>
        <View style={styles.mediaContainer}>
          <View style={styles.assetFileType}>
          <Text style={styles.assetFileSize}>{asset?.extension}</Text>
          </View>
          {isImage && (
            <Image 
              source={{ uri:asset?.pathFile }} 
              style={styles.mediaPreview}
              resizeMode="cover"
            />
          )}
          {isVideo && (
            <View style={styles.videoContainer}>
              <Video
                ref={(ref) => {
                  if (ref) {
                    videoRefs.current[asset.uri] = ref;
                  }
                }}
                style={styles.video}
                source={{ uri: asset.uri }}
                useNativeControls={false}
                resizeMode={ResizeMode.COVER}
                isLooping={false}
                shouldPlay={false}
              />
              <View style={styles.videoOverlay}>
                <Feather name="play" size={16} color="#fff" />
              </View>
            </View>
          )}
          <View  style={[styles.assetName]}>
          <Text style={styles.assetFileName} numberOfLines={1}>
            {asset?.name}
          </Text>
          <Text style={styles.assetFileSize}>{asset?.size2}</Text>
          </View>
        </View>
        
        {onRemoveAsset && ( <TouchableOpacity 
            onPress={() => handleRemoveAsset(asset)} 
            style={styles.uploadSuccessButton}
            activeOpacity={0.7}
          >
            <Feather name="check" size={14} color="#fff" />
          </TouchableOpacity>)
          }
      </View>
    );
  };

  // Limit the number of assets to display
  const displayAssets = assets.slice(0, maxItems);

  if (displayAssets.length === 0) {
    return null;
  }

  return (
    <View style={[styles.assetsGrid, { paddingHorizontal: padding, gap: spacing }]}>
      {displayAssets.map((asset, index) => renderAsset(asset, index))}
    </View>
  );
};

export default MediaGrid; 