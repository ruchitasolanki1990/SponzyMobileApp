import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./BlockCountriesScreen.style";
import { ThemeContext } from "@/src/constants/Themes";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
const BlockCountriesScreen = () => {
  const theme = useContext(ThemeContext);
  const [countries, setCountries] = useState<
    { label: string; value: string }[]
  >([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const [country, setCountry] = useState("");
  const [touched, setTouched] = useState({
    country: false,
  });
  const errors = {
    country: "",
  };
  const token = useSelector((state: RootState) => state.userAuth.token);
  useEffect(() => {
    fetchCountries();
  }, []);
  const fetchCountries = async () => {
    setCountriesLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/countries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Adjust the mapping based on your API response structure
      if (response.data.success) {
        setCountries(
          response.data?.data.map((item: any) => ({
            label: item.country_name, // or item.label if your API returns that
            value: item.id, // or item.value
          }))
        );
      }
    } catch (error) {
      setCountries([]);
    } finally {
      setCountriesLoading(false);
    }
  };
  return (
    <View style={[styles.container, theme.background]}>
      <Text style={[styles.title, theme.text]}>Block Countries</Text>
      <Text style={[styles.sectionTitle, theme.mute_text]}>
        Select the countries in which you do not want your profile to be
        displayed, they will not be able to see your profile in any section of
        the site.
      </Text>
      {/* Country Dropdown */}
      <View style={styles.inputGroup}>
        <View
          style={[
            styles.inputContainer,
            theme.card,
            {
              borderColor:
                errors.country && touched.country
                  ? "red"
                  : theme.border.borderColor,
            },
          ]}
        >
          <Ionicons
            name="globe-outline"
            size={20}
            color="#888b8f"
            style={styles.inputIcon}
          />
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={country}
              onValueChange={(value) => {
                setCountry(value);
              }}
              style={[styles.picker, theme.text]}
              enabled={!countriesLoading}
            >
              {countriesLoading ? (
                <Picker.Item label="Loading countries..." value="" />
              ) : (
                countries.map((cntry) => (
                  <Picker.Item
                    key={cntry.value}
                    label={cntry.label}
                    value={cntry.value}
                  />
                ))
              )}
            </Picker>
          </View>
        </View>
        {errors.country && touched.country && (
          <Text style={styles.error}>{errors.country}</Text>
        )}
      </View>
      <View>
         <TouchableOpacity
              style={[styles.saveButton, theme.button, { borderRadius: 20 }]}
              onPress={() => {
               
              }}
             
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
    </View>
  );
};

export default BlockCountriesScreen;
