import { ThemeContext } from "@/src/constants/Themes";
import React, { useContext, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./PasswordScreen.style";
import { AntDesign, Ionicons } from "@expo/vector-icons";
const PasswordScreen = () => {
  const theme = useContext(ThemeContext);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touchedForOldPaswword, setTouchedForOldPaswword] = useState({
    oldPassword: false,
  });
  const [touched, setTouched] = useState({
    password: false,
  });
  // Validation
  const errors = {
    password:
      password.length < 5 ? "Password must be at least 5 characters" : "",
  };
  return (
    <View style={[styles.container, theme.background]}>
      <Text style={[styles.title, theme.text]}>Password</Text>
      <Text style={[styles.sectionTitle, theme.mute_text]}>
        Update Password
      </Text>
      {/* Password */}
      {/* <View>
        <TextInput
          style={[
            styles.input,
            { flex: 1 },
            theme.text,
            theme.card,
            errors.password && touched.password && styles.inputError,
          ]}
          placeholder="Old Password"
          placeholderTextColor={String(theme.text.color) + "99"}
          value={oldPassword}
          onChangeText={setOldPassword}
         
        />
      </View> */}
      <View
        style={[
          styles.inputContainer,
          theme.card,
          { borderColor: theme.border.borderColor },
        ]}
      >
        <AntDesign
          name="unlock"
          size={20}
          color="#888b8f"
          style={styles.inputIcon}
        />
        <TextInput
          style={[styles.inputWithIcon, theme.text, theme.card]}
          placeholder="Old Password"
          placeholderTextColor={String(theme.text.color) + "99"}
          value={oldPassword}
          onChangeText={setOldPassword}
          // onBlur={() => setTouched(t => ({ ...t, fullName: true }))}
          // editable={!loading}
        />
      </View>
      <View
        style={[
          styles.inputContainer,
          theme.card,
          { borderColor: theme.border.borderColor, marginTop: 10 },
        ]}
      >
        <AntDesign
          name="lock"
          size={20}
          color="#888b8f"
          style={styles.inputIcon}
        />
        <TextInput
          style={[
            { flex: 1 },
            theme.text,
            theme.card,
            errors.password && touched.password && styles.inputError,
          ]}
          //  style={[styles.input,  errors.password && touched.password && styles.inputError]}
          placeholder="New Password"
          placeholderTextColor={String(theme.text.color) + "99"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          onBlur={() => setTouched((t) => ({ ...t, password: true }))}
        />
        <TouchableOpacity
          onPress={() => setShowPassword((s) => !s)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color={theme.text.color as string}
          />
        </TouchableOpacity>
      </View>
      <View></View>
      {errors.password && touched.password && (
        <Text style={styles.error}>{errors.password}</Text>
      )}
      <View>
        <TouchableOpacity
          style={[
            styles.saveButton,
            theme.button,
            {
              borderRadius: 20,
              opacity: password.trim() && oldPassword.trim() ? 1 : 0.5,
            },
          ]}
          onPress={() => {}}
          disabled={!password.trim() && !oldPassword.trim()}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordScreen;
