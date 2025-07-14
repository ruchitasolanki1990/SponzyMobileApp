import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React, { useContext, useState } from "react";
import { ThemeContext } from "@/src/constants/Themes";
import styles from "./SubscriptionPriceScreen.style";
import { TextInput } from "react-native-gesture-handler";
import { Feather, Ionicons } from "@expo/vector-icons";
const SubscriptionPriceScreen = () => {
  const [subscriptionPriceWeekly, setSubscriptionPriceWeekly] =
    useState("0.00");
  const [subscriptionPriceMonthly, setSubscriptionPriceMonthly] =
    useState("0.00");
  const [subscriptionPrice3Monthly, setSubscriptionPrice3Monthly] =
    useState("0.00");
  const [subscriptionPrice6Monthly, setSubscriptionPrice6Monthly] =
    useState("0.00");
  const [subscriptionPrice12Monthly, setSubscriptionPrice12Monthly] =
    useState("0.00");
  const [subscriptionPriceWeeklyStatus, setSubscriptionPriceWeeklyStatus] =
    useState(false);
  const [subscriptionPriceMonthlyStatus, setSubscriptionPriceMonthlyStatus] =
    useState(false);
  const [subscriptionPrice3MonthlyStatus, setSubscriptionPrice3MonthlyStatus] =
    useState(false);
  const [subscriptionPrice6MonthlyStatus, setSubscriptionPrice6MonthlyStatus] =
    useState(false);
  const [
    subscriptionPrice12MonthlyStatus,
    setSubscriptionPrice12MonthlyStatus,
  ] = useState(false);
  const [freeScriptionStatus, setFreeSubscriptionStatus] = useState(false);

  const theme = useContext(ThemeContext);
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
          <Text style={[styles.title, theme.text]}>Subscription Price</Text>
          <Text style={[styles.sectionTitle, theme.mute_text]}>
            Set up your Subscription
          </Text>
          <View style={{ backgroundColor: "#7889e8", padding: 10 }}>
            <Text style={[styles.subTitle, { color: "white" }]}>
              You will receive 95% for each transaction (Does not include
              payment processor fees)
            </Text>
          </View>
          {/* Subscription Price (Weekly) */}
          <View>
            <Text style={[styles.blockTitle, theme.text]}>
              Subscription Price (Weekly)
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
                value={subscriptionPriceWeekly}
                onChangeText={setSubscriptionPriceWeekly}
              />
              <View></View>
            </View>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  subscriptionPriceWeeklyStatus
                    ? styles.toggleActive
                    : styles.toggleInactive,
                ]}
                onPress={() =>
                  setSubscriptionPriceWeeklyStatus(
                    !subscriptionPriceWeeklyStatus
                  )
                }
              >
                <View
                  style={[
                    styles.toggleThumb,
                    subscriptionPriceWeeklyStatus
                      ? styles.toggleThumbActive
                      : styles.toggleThumbInactive,
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* Subscription Price (Per Month) */}
          <View>
            <Text style={[styles.blockTitle, theme.text]}>
              Subscription Price (Per month)
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
                value={subscriptionPriceMonthly}
                onChangeText={setSubscriptionPriceMonthly}
              />
              <View></View>
            </View>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  subscriptionPriceMonthlyStatus
                    ? styles.toggleActive
                    : styles.toggleInactive,
                ]}
                onPress={() =>
                  setSubscriptionPriceMonthlyStatus(
                    !subscriptionPriceMonthlyStatus
                  )
                }
              >
                <View
                  style={[
                    styles.toggleThumb,
                    subscriptionPriceMonthlyStatus
                      ? styles.toggleThumbActive
                      : styles.toggleThumbInactive,
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* Subscription Price (3 Months) */}
          <View>
            <Text style={[styles.blockTitle, theme.text]}>
              Subscription Price (3 Months)
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
                value={subscriptionPrice3Monthly}
                onChangeText={setSubscriptionPrice3Monthly}
              />
              <View></View>
            </View>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  subscriptionPrice3MonthlyStatus
                    ? styles.toggleActive
                    : styles.toggleInactive,
                ]}
                onPress={() =>
                  setSubscriptionPrice3MonthlyStatus(
                    !subscriptionPrice3MonthlyStatus
                  )
                }
              >
                <View
                  style={[
                    styles.toggleThumb,
                    subscriptionPrice3MonthlyStatus
                      ? styles.toggleThumbActive
                      : styles.toggleThumbInactive,
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* Subscription Price (6 Months) */}
          <View>
            <Text style={[styles.blockTitle, theme.text]}>
              Subscription Price (6 Months)
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
                value={subscriptionPrice6Monthly}
                onChangeText={setSubscriptionPrice6Monthly}
              />
              <View></View>
            </View>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  subscriptionPrice6MonthlyStatus
                    ? styles.toggleActive
                    : styles.toggleInactive,
                ]}
                onPress={() =>
                  setSubscriptionPrice6MonthlyStatus(
                    !subscriptionPrice6MonthlyStatus
                  )
                }
              >
                <View
                  style={[
                    styles.toggleThumb,
                    subscriptionPrice6MonthlyStatus
                      ? styles.toggleThumbActive
                      : styles.toggleThumbInactive,
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* Subscription Price (12 Months) */}
          <View>
            <Text style={[styles.blockTitle, theme.text]}>
              Subscription Price (12 months)
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
                value={subscriptionPrice12Monthly}
                onChangeText={setSubscriptionPrice12Monthly}
              />
              <View></View>
            </View>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  subscriptionPrice12MonthlyStatus
                    ? styles.toggleActive
                    : styles.toggleInactive,
                ]}
                onPress={() =>
                  setSubscriptionPrice12MonthlyStatus(
                    !subscriptionPrice12MonthlyStatus
                  )
                }
              >
                <View
                  style={[
                    styles.toggleThumb,
                    subscriptionPrice12MonthlyStatus
                      ? styles.toggleThumbActive
                      : styles.toggleThumbInactive,
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  freeScriptionStatus
                    ? styles.toggleActive
                    : styles.toggleInactive,
                ]}
                onPress={() => setFreeSubscriptionStatus(!freeScriptionStatus)}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    freeScriptionStatus
                      ? styles.toggleThumbActive
                      : styles.toggleThumbInactive,
                  ]}
                />
              </TouchableOpacity>
              <Text style={[styles.toggleLabel, theme.text]}>
                Free ScriptionStatus
              </Text>
            </View>
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

export default SubscriptionPriceScreen;
