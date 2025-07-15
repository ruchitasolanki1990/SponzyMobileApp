import { ThemeContext } from "@/src/constants/Themes";
import React, { useContext, useState } from "react";
import { Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./WalletScreen.style";
import { Feather, Ionicons } from "@expo/vector-icons";
const WalletScreen = () => {
  const theme = useContext(ThemeContext);
  const [amount, setAmount] = useState("");
  const [iAgree, setIagree] = useState(false);
  return (
    <View style={[styles.container, theme.background]}>
      <Text style={[styles.title, theme.text]}>Wallet</Text>
      <Text style={[styles.sectionTitle, theme.mute_text]}>
        Add funds to your wallet to use for subscription, tips, and more
      </Text>
      <View style={{ backgroundColor: "#7889e8", padding: 10 }}>
        <Text style={{ color: "white", fontSize: 20, fontWeight: 600 }}>
          $0.00 USD
        </Text>
        <Text style={[styles.subTitle, { color: "white" }]}>
          Funds available in your account
        </Text>
      </View>
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
          placeholder="Amount(Minimum $5 - Maximum $100)"
          placeholderTextColor={String(theme.text.color) + "99"}
          value={amount}
          onChangeText={setAmount}
        />
        <View></View>
      </View>
      <Text style={[styles.cardTitle, theme.mute_text, { marginTop: 10 }]}>
        to increase/decrease amount
      </Text>
      <View style={[styles.uploadContainer]}>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: 10,
          }}
        >
          <Text style={[theme.text, { fontSize: 16 }]}>Transaction Fee:</Text>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>$0</Text>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: 10,
          }}
        >
          <Text style={[theme.text, { fontSize: 16 }]}>Total:</Text>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>$0</Text>
        </View>
      </View>
      <View style={{marginTop:10}}>
        <Pressable
          style={styles.checkboxRow}
          onPress={() => setIagree((r) => !r)}
        >
          <View
            style={[
              styles.checkbox,
              {
                backgroundColor: iAgree
                  ? theme.button.backgroundColor
                  : "transparent",
                borderColor: theme.iconColor.color,
              },
            ]}
          >
            {iAgree && <Ionicons name="checkmark" size={16} color="#fff" />}
          </View>
          <Text style={[styles.checkboxLabel, theme.text]}>
            I agree with:<Text style={[theme.primaryColor]}> Terms and Conditions</Text>
          </Text>
        </Pressable>
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
                <Text style={styles.saveButtonText}>Add funds</Text>
              </TouchableOpacity>
            </View>
    </View>
  );
};

export default WalletScreen;
