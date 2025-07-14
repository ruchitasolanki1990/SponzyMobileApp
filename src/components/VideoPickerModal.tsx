import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useContext } from 'react';
import { ThemeContext } from '@/src/constants/Themes';

interface VideoPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onNext: (videoUri: string | null, option: string) => void;
}

const VideoPickerModal: React.FC<VideoPickerModalProps> = ({ visible, onClose, onNext }) => {
  const theme = useContext(ThemeContext);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [dropdownValue, setDropdownValue] = useState('open_subscribe');

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsMultipleSelection: false,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets[0]) {
      setVideoUri(result.assets[0].uri);
    }
  };

  const handleNext = () => {
    onNext(videoUri, dropdownValue);
    setVideoUri(null);
    setDropdownValue('open_subscribe');
  };

  const handleClose = () => {
    onClose();
    setVideoUri(null);
    setDropdownValue('open_subscribe');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, theme.card, theme.shadow]}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Feather name="x" size={24} color="#fff" />
          </TouchableOpacity>

          {/* Video Preview */}
          <View style={styles.videoPreviewContainer}>
            {videoUri ? (
              <Video
                source={{ uri: videoUri }}
                style={styles.video}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                shouldPlay
              />
            ) : (
              <TouchableOpacity style={styles.pickButton} onPress={pickVideo}>
                <Feather name="video" size={32} color={theme.iconColor.color} />
                <Text style={[styles.pickText, { color: theme.text.color }]}>Pick a Video</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Dropdown */}
          <View style={styles.dropdownContainer}>
            <Text style={[styles.dropdownLabel, { color: theme.text.color }]}>Visibility:</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={dropdownValue}
                onValueChange={setDropdownValue}
                style={Platform.OS === 'ios' ? styles.pickerIOS : styles.picker}
                dropdownIconColor={theme.iconColor.color}
              >
                <Picker.Item label="Open Subscribe" value="open_subscribe" />
                <Picker.Item label="Available for All" value="available_for_all" />
              </Picker>
            </View>
          </View>

          {/* Next Button */}
          <TouchableOpacity
            style={[styles.nextButton, theme.button]}
            onPress={handleNext}
            disabled={!videoUri}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'red',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  videoPreviewContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#000',
    borderRadius: 12,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  pickButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  pickText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  dropdownContainer: {
    width: '100%',
    marginBottom: 20,
  },
  dropdownLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 44,
  },
  pickerIOS: {
    width: '100%',
    height: 120,
  },
  nextButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    opacity: 1,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default VideoPickerModal; 