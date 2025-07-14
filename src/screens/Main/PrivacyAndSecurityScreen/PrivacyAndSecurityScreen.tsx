import { ThemeContext } from "@/src/constants/Themes";
import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./PrivacyAndSecurityScreen.style";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
const PrivacyAndSecurityScreen = () => {
  const theme = useContext(ThemeContext);
  const [hideProfile, setHideProfile] = useState(false);
  const [hideLastSeen, setHideLastSeen] = useState(false);
  const [activeStatus, setActiveStatus] = useState(false);
  const [hideNumberOfSubscribers, setHideNumberOfSubscribers] = useState(false);
  const [hideMyCountry, setHideMyCountry] = useState(false);
  const [showMyBirthday, setshowMyBirthday] = useState(false);
  const [allowForUnregistedPeople, setAllowForUnregistedPeople] =
    useState(false);
  const [allowComments, setAllowComments] = useState(false);
  const [twoStepAuthentication, setTwoStepAuthentication] = useState(false);
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 100}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.container, theme.background]}>
          <Text style={[styles.title, theme.text]}>Privacy And Security</Text>
          <Text style={[styles.sectionTitle, theme.mute_text]}>
            set your privacy
          </Text>
          <View>
            <Text style={[styles.blockTitle, theme.mute_text]}>
              Login sessions
            </Text>
          </View>

          <View style={[{ padding: 10 }, theme.shadow, theme.card]}>
            <Text style={[styles.cardTitle, theme.mute_text]}>
              Last login record was form
            </Text>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ marginLeft: 2 }}>
                  <FontAwesome name="mobile" size={24} color={theme.iconColor.color} />
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text style={[styles.cardSubTitle, theme.text]}>
                    Safari on IOS,iPhone
                  </Text>
                </View>
              </View>
              <Text style={[styles.cardTitle, theme.mute_text]}>
                223.178.116.184 -india- 17 hours ago
              </Text>
            </View>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ marginLeft: 2 }}>
                  <MaterialIcons
                    name="desktop-windows"
                    size={20}
                    color={theme.iconColor.color}
                  />
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text style={[styles.cardSubTitle, theme.text]}>
                    App on 13
                  </Text>
                </View>
              </View>
              <Text style={[styles.cardTitle, theme.mute_text]}>
                103.178.116.184 -india- 4 hours ago
              </Text>
            </View>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ marginLeft: 2 }}>
                  <MaterialIcons
                    name="desktop-windows"
                    size={20}
                    color={theme.iconColor.color}
                  />
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text style={[styles.cardSubTitle, theme.text]}>
                    App on 16.6
                  </Text>
                </View>
              </View>
              <Text style={[styles.cardTitle, theme.mute_text]}>
                223.178.116.184 -india- 17 hours ago
              </Text>
            </View>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ marginLeft: 2 }}>
                  <MaterialIcons
                    name="desktop-windows"
                    size={20}
                    color={theme.iconColor.color}
                  />
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text style={[styles.cardSubTitle, theme.text]}>
                    Chrome on Windows
                  </Text>
                </View>
              </View>
              <Text style={[styles.cardTitle, theme.mute_text]}>
                223.178.116.184 -india- 17 hours ago
              </Text>
            </View>
            <Text
              style={[styles.cardTitle, theme.mute_text, { marginTop: 10 }]}
            >
              {" "}
              If you don't recognize this session record, change your password
              immediately.
            </Text>
            <View>
              <TouchableOpacity
                style={[
                  styles.saveButton,
                  //theme.button,
                  {
                    borderRadius: 20,
                  },
                ]}
                onPress={() => {}}
              >
                <Text style={styles.saveButtonText}>Close all sessions</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text style={[styles.blockTitle, theme.mute_text]}>Privacy</Text>
          </View>
          {/* Hide Profile */}
          <View>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  hideProfile ? styles.toggleActive : styles.toggleInactive,
                ]}
                onPress={() => setHideProfile(!hideProfile)}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    hideProfile
                      ? styles.toggleThumbActive
                      : styles.toggleThumbInactive,
                  ]}
                />
              </TouchableOpacity>
              <Text style={[styles.toggleLabel, theme.text]}>
                Hide profile (Search, page explore, explore creators)
              </Text>
            </View>
          </View>
          {/* Hide Last Seen */}
          <View>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  hideLastSeen ? styles.toggleActive : styles.toggleInactive,
                ]}
                onPress={() => setHideLastSeen(!hideLastSeen)}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    hideProfile
                      ? styles.toggleThumbActive
                      : styles.toggleThumbInactive,
                  ]}
                />
              </TouchableOpacity>
              <Text style={[styles.toggleLabel, theme.text]}>
                Hide last seen
              </Text>
            </View>
          </View>
          {/* Active Status */}
          <View>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  activeStatus ? styles.toggleActive : styles.toggleInactive,
                ]}
                onPress={() => setActiveStatus(!activeStatus)}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    hideProfile
                      ? styles.toggleThumbActive
                      : styles.toggleThumbInactive,
                  ]}
                />
              </TouchableOpacity>
              <Text style={[styles.toggleLabel, theme.text]}>
                Active Status (Online)
              </Text>
            </View>
          </View>
          {/* Hide number of Subscribers */}
          <View>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  hideNumberOfSubscribers
                    ? styles.toggleActive
                    : styles.toggleInactive,
                ]}
                onPress={() =>
                  setHideNumberOfSubscribers(!hideNumberOfSubscribers)
                }
              >
                <View
                  style={[
                    styles.toggleThumb,
                    hideProfile
                      ? styles.toggleThumbActive
                      : styles.toggleThumbInactive,
                  ]}
                />
              </TouchableOpacity>
              <Text style={[styles.toggleLabel, theme.text]}>
                Hide number of subscriber
              </Text>
            </View>
          </View>
          {/* Hide my country */}
          <View>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  hideMyCountry ? styles.toggleActive : styles.toggleInactive,
                ]}
                onPress={() => setHideMyCountry(!hideMyCountry)}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    hideProfile
                      ? styles.toggleThumbActive
                      : styles.toggleThumbInactive,
                  ]}
                />
              </TouchableOpacity>
              <Text style={[styles.toggleLabel, theme.text]}>
                Hide my country
              </Text>
            </View>
          </View>
          {/* Show my birthday */}
          <View>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  showMyBirthday ? styles.toggleActive : styles.toggleInactive,
                ]}
                onPress={() => setshowMyBirthday(!showMyBirthday)}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    hideProfile
                      ? styles.toggleThumbActive
                      : styles.toggleThumbInactive,
                  ]}
                />
              </TouchableOpacity>
              <Text style={[styles.toggleLabel, theme.text]}>
                Show my birthdate
              </Text>
            </View>
          </View>
          {/* Unregistered people can seen my Posts */}
          <View>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  allowForUnregistedPeople
                    ? styles.toggleActive
                    : styles.toggleInactive,
                ]}
                onPress={() =>
                  setAllowForUnregistedPeople(!allowForUnregistedPeople)
                }
              >
                <View
                  style={[
                    styles.toggleThumb,
                    hideProfile
                      ? styles.toggleThumbActive
                      : styles.toggleThumbInactive,
                  ]}
                />
              </TouchableOpacity>
              <Text style={[styles.toggleLabel, theme.text]}>
                Unregistered people can seen my Posts
              </Text>
            </View>
          </View>
          {/* Allow comments on your posts */}
          <View>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  allowComments ? styles.toggleActive : styles.toggleInactive,
                ]}
                onPress={() => setAllowComments(!allowComments)}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    hideProfile
                      ? styles.toggleThumbActive
                      : styles.toggleThumbInactive,
                  ]}
                />
              </TouchableOpacity>
              <Text style={[styles.toggleLabel, theme.text]}>
                Allow comments on your posts
              </Text>
            </View>
          </View>

          <View>
            <Text style={[styles.blockTitle, theme.mute_text]}>Security</Text>
          </View>

          {/* Two-Step Authentication */}
          <View>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  twoStepAuthentication ? styles.toggleActive : styles.toggleInactive,
                ]}
                onPress={() => setTwoStepAuthentication(!twoStepAuthentication)}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    hideProfile
                      ? styles.toggleThumbActive
                      : styles.toggleThumbInactive,
                  ]}
                />
              </TouchableOpacity>
              <Text style={[styles.toggleLabel, theme.text]}>
                Two-Step Authentication
              </Text>
            </View>
          </View>

          <View>
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
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PrivacyAndSecurityScreen;
