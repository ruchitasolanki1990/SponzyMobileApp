import { ThemeContext } from "@/src/constants/Themes";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import styles from "./ConversationScreen.style";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import MediaGrid from "@/src/components/MediaGrid";
// Define the type for an asset, extending ImagePickerAsset
interface SelectedAsset extends ImagePicker.ImagePickerAsset {
  type?: "image" | "video";
}
const ConversationScreen = () => {
  const theme = useContext(ThemeContext);
  const [receivePrivateMessage, setReceivePrivateMessage] = useState(false);
  const [sendWelcomeMessage, setSendWelcomeMessage] = useState(false);
  const [welcomeMessagePrice, setWelcomeMessagePrice] = useState("0.00");
  const [selectedAssets, setSelectedAssets] = useState<SelectedAsset[]>([]);
  const [messages, setMessages] = useState("");

  //Image and Video Picker
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 1, // Allow up to 9 items for 3x3 grid
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

  return (
    <KeyboardAvoidingView
     // keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 100}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.container, theme.background]}>
          <Text style={[styles.title, theme.text]}>Conversations</Text>
          <Text style={[styles.sectionTitle, theme.mute_text]}>
            Setting up your conversations
          </Text>
          {/* Receive Messages */}
          <View>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  receivePrivateMessage
                    ? styles.toggleActive
                    : styles.toggleInactive,
                ]}
                onPress={() => setReceivePrivateMessage(!receivePrivateMessage)}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    receivePrivateMessage
                      ? styles.toggleThumbActive
                      : styles.toggleThumbInactive,
                  ]}
                />
              </TouchableOpacity>
              <Text style={[styles.toggleLabel, theme.text]}>
                Receive private messages
              </Text>
            </View>
          </View>
          {/* Send Messages */}
          <View>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  sendWelcomeMessage
                    ? styles.toggleActive
                    : styles.toggleInactive,
                ]}
                onPress={() => setSendWelcomeMessage(!sendWelcomeMessage)}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    sendWelcomeMessage
                      ? styles.toggleThumbActive
                      : styles.toggleThumbInactive,
                  ]}
                />
              </TouchableOpacity>
              <Text style={[styles.toggleLabel, theme.text]}>
                Send welcome message to new subscribers
              </Text>
            </View>
          </View>
          {/* Welcome Message Price */}
          <View>
            <Text style={[styles.blockTitle, theme.text]}>
              Welcome message price (Optional)
            </Text>
            <View
              style={[
                styles.inputContainer,
                theme.card,
                { borderColor: theme.border.borderColor },
              ]}
            >
              <Feather
                name="dollar-sign"
                size={24}
                color="#888b8f"
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.inputWithIcon, theme.text, theme.card]}
                placeholder="Price"
                placeholderTextColor={String(theme.text.color) + "99"}
                value={welcomeMessagePrice}
                onChangeText={setWelcomeMessagePrice}
              />
              <View></View>
            </View>
          </View>
          <Text style={[styles.cardTitle, theme.mute_text, { marginTop: 10 }]}>
            * Minimum $5 - Maximum $100
          </Text>
          <View>
            <Text style={[styles.blockTitle, theme.text]}>
              Add a file (Optional)
            </Text>
            <View style={{ backgroundColor: "#7889e8", padding: 10 }}>
              <Text style={[styles.subTitle, { color: "white" }]}>
                Important:If you add a video,activate the function of sending a
                welcome message when the video is encoded.
              </Text>
            </View>
          </View>
          <View style={[styles.uploadContainer]}>
            <Text style={[{ fontSize: 18, fontWeight: 600 }, theme.mute_text]}>
              Choose file upload
            </Text>
            <View>
              <TouchableOpacity
                style={[styles.saveButton, theme.button, { borderRadius: 20 }]}
                onPress={pickImage}
              >
                <Text style={styles.saveButtonText}>Browse file</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Display images and videos */}
          <View>
            <MediaGrid
              assets={selectedAssets}
              onRemoveAsset={handleRemoveAsset}
              maxItems={9}
              columns={3}
              spacing={8}
              padding={20}
            />
          </View>
          <View>
            <Text style={[styles.blockTitle, theme.text]}>
              Welcome message to new subscriber
            </Text>
            <TextInput
              style={[
                styles.textarea,
                theme.text,
                theme.card,
                theme.border
              ]}
              // placeholder="Share your story with us (max 500 characters)"
              // placeholderTextColor={String(theme.text.color) + "99"}
              value={messages}
              onChangeText={setMessages}
              multiline
              numberOfLines={4}
              maxLength={500}
            />
          </View>
          {/* Save Button at Bottom */}
          <View>
            <TouchableOpacity
              style={[
                styles.saveButton,
                theme.button,
                {
                  borderRadius: 20,
                  //  opacity: password.trim() && oldPassword.trim() ? 1 : 0.5,
                },
              ]}
              onPress={() => {}}
              // disabled={!password.trim() && !oldPassword.trim()}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ConversationScreen;
