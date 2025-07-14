import { View, Text, Image, TextInput } from "react-native";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "@/src/constants/Themes";
import { RootState } from "@/src/redux/store";

interface ProfileWithSearchBarComponentsProps {
  value: string;
  onChangeText: (text: string) => void;
}

const ProfileWithSearchBarComponents = ({ value, onChangeText }: ProfileWithSearchBarComponentsProps) => {
  const theme = useContext(ThemeContext);
  const user = useSelector((state: RootState) => state.userAuth.user);

  return (
    <>
      <View
        style={{
          width: "25%",
          height: 100,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {user ? (
          <View style={{ alignItems: "center" }}>
            <Image
              source={user.avatar_image ? { uri: user.avatar_image } : require("../../../assets/img/userprofile.png")}
              style={{ width: 60, height: 60, borderRadius: 30 }}
            />
            {/* <Text style={[theme.text, { fontSize: 12, marginTop: 4, textAlign: "center" }]}>
              {user.name || "User"}
            </Text> */}
          </View>
        ) : (
          <Image
            source={require("../../../assets/img/userprofile.png")}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
        )}
      </View>
      <View style={{ width: "75%", height: 100 }}>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={[
            theme.mute_text,
            theme.card,
            { padding: 10, fontSize: 16, marginTop: 10 },
          ]}
          placeholder={user ? `What's on your mind, ${user.name}?` : "Write something..."}
          placeholderTextColor={theme.mute_text.color}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </>
  );
};

export default ProfileWithSearchBarComponents;
