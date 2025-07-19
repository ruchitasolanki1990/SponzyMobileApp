import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  AntDesign,
  Entypo,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import { ThemeContext } from "../../../constants/Themes";
import { RootState, AppDispatch } from "../../../redux/store";
import { setProfile } from "../../../redux/slices/userAuthSlice";
import styles from "./EditProfileScreen.style";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";
import { MultiSelect } from "react-native-element-dropdown";
import Toast from 'react-native-toast-message';

function normalizeDate(dateStr: string): string {
  // If already in YYYY-MM-DD, return as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  // If in MM/DD/YYYY or DD/MM/YYYY, convert to YYYY-MM-DD
  const parts = dateStr.split(/[\/\-]/);
  if (parts.length === 3) {
    // Try MM/DD/YYYY
    if (parseInt(parts[0], 10) <= 12) {
      return `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
    }
    // Try DD/MM/YYYY
    return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
  }
  return dateStr; // fallback
}

function formatDateMMDDYYYY(dateStr: string): string {
  // Expects dateStr in YYYY-MM-DD
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  const [year, month, day] = dateStr.split("-");
  return `${month}/${day}/${year}`;
}

function get18YearsAgoDate(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 18);
  return d.toISOString().split("T")[0];
}

const EditProfileScreen = () => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.userAuth.user);
  const token = useSelector((state: RootState) => state.userAuth.token);

  // Profile Information
  const [fullName, setFullName] = useState(user?.name || "");
  const [username, setUsername] = useState(user?.username || "");
  const [avatarImage, setAvatarImage] = useState(user?.avatar_image || "");
  const [coverImage, setCoverImage] = useState(user?.cover_image || "");
  const [status, setStatus] = useState(user?.status || "");
  const [showUsername, setShowUsername] = useState(false);
  const [email, setEmail] = useState(user?.email || "");
  const [profession, setProfession] = useState(user?.profession || "");
  const [language, setLanguage] = useState();
  // Set birthday to user's birthday or exactly 18 years ago from today (preserving month and day)
  const [birthday, setBirthday] = useState(
    // user?.birthday ? normalizeDate(user.birthday) :
    // new Date(
    //   new Date().setFullYear(new Date().getFullYear() - 18)
    // ).toISOString().split("T")[0]
  );
  const [gender, setGender] = useState("");
  const [website, setWebsite] = useState(user?.website || "");
  const [category, setCategory] = useState();
  const [story, setStory] = useState(user?.story || "");

  // Social Profiles
  const [facebookLink, setFacebookLink] = useState(user?.facebookLink || "");
  const [twitterLink, setTwitterLink] = useState(user?.twitterLink || "");
  const [instagramLink, setInstagramLink] = useState(user?.instagramLink || "");
  const [youtubeLink, setYoutubeLink] = useState(user?.youtubeLink || "");
  const [pinterestLink, setPinterestLink] = useState(user?.pinterestLink || "");
  const [githubLink, setGithubLink] = useState(user?.githubLink || "");
  const [snapchatLink, setSnapchatLink] = useState(user?.snapchatLink || "");
  const [telegramLink, setTelegramLink] = useState(user?.telegramLink || "");
  const [twitchLink, setTwitchLink] = useState(user?.twitchLink || "");
  const [discordLink, setDiscordLink] = useState(user?.discordLink || "");
  const [vkLink, setVkLink] = useState(user?.vkLink || "");
  const [redditLink, setRedditLink] = useState(user?.redditLink || "");
  const [spotifyLink, setSpotifyLink] = useState(user?.spotifyLink || "");
  const [threadsLink, setThreadsLink] = useState(user?.threadsLink || "");
  const [kickLink, setKickLink] = useState(user?.kickLink || "");
  // Add TikTok state
  const [tiktokLink, setTiktokLink] = useState(
    user && "tiktokLink" in user && (user as any).tiktokLink
      ? (user as any).tiktokLink
      : ""
  );

  // Billing Information
  const [company, setCompany] = useState(user?.company || "");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState(user?.city || "");
  const [address, setAddress] = useState(user?.address || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");

  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const [profileDetails, setProfileDetails] = useState([]);
  const [metaData, setMetaData] = useState();
  const [touched, setTouched] = useState({
    fullName: false,
    username: false,
    avatarImage: false,
    coverImage: false,
    status: false,
    profession: false,
    language: false,
    birthday: false,
    gender: false,
    website: false,
    category: false,
    story: false,
    facebookLink: false,
    twitterLink: false,
    instagramLink: false,
    youtubeLink: false,
    pinterestLink: false,
    githubLink: false,
    snapchatLink: false,
    telegramLink: false,
    twitchLink: false,
    discordLink: false,
    vkLink: false,
    redditLink: false,
    spotifyLink: false,
    threadsLink: false,
    kickLink: false,
    tiktokLink: false,
    company: false,
    country: false,
    city: false,
    address: false,
    postalCode: false,
    email: false,
  });

  const [countries, setCountries] = useState<
    { label: string; value: string }[]
  >([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [categories, setCategories] = useState<
    { label: string; value: string }[]
  >([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const languages = [
    { label: "(Language) Not specified", value: "" },
    { label: "English", value: "en" }];

  // Dropdown options
  const genders = [
    { label: "(Gender) Not specified", value: "" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

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
        setCountries([
          { label: "* Select Country", value: "" },
          ...response.data?.data.map((item: any) => ({
            label: item.country_name, // or item.label if your API returns that
            value: item.id, // or item.value
          }))
        ]);
      }
    } catch (error) {
      setCountries([]);
      Alert.alert("Error", "Failed to load countries");
    } finally {
      setCountriesLoading(false);
    }
  };

  const fetchCategories = async () => {
    setCategoriesLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setCategories(
          response.data?.data.map((item: any) => ({
            label: item.name, // Adjust according to your API response
            value: item.id,
          }))
        );
      }
    } catch (error) {
      setCategories([]);
      Alert.alert("Error", "Failed to load categories");
    } finally {
      setCategoriesLoading(false);
    }
  };
  const fetchProfileDetails = async () => {
    try {
      const response = await axios.get(`${apiUrl}/users/${user?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setProfileDetails(response.data?.data);
        console.log(response.data)
        setMetaData(response.data?.meta);
      }
    } catch (error) {
      setProfileDetails([]);
      Alert.alert("Error", "Failed to load profiledata");
    }
  };
  const updateProfile = async (updateObj) => {
    try {
      const response = await axios.put(`${apiUrl}/users/${user?.id}}`,updateObj,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      fetchProfileDetails()
    } catch (error) {
      console.log('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    fetchCountries();
    fetchCategories();
    fetchProfileDetails();
  }, []);

  useEffect(() => {
    if (profileDetails && Object.keys(profileDetails).length > 0) {
      setFullName(profileDetails.name || "");
      setUsername(profileDetails.username || "");
      setShowUsername(profileDetails.hide_name === "yes" ? true : false)
      setEmail(profileDetails.email || "");
      setProfession(profileDetails.profession || "");
      setLanguage(profileDetails?.language);
      // if (
      //   (!profileDetails.birthdate || profileDetails.birthdate === "") &&
      //   profileDetails.birthdate_changed === "no"
      // ) {
      //   setBirthday(get18YearsAgoDate());
      // } else {
      //   setBirthday(profileDetails.birthdate ? normalizeDate(profileDetails.birthdate) : "");
      // }
      setBirthday(profileDetails?.birthdate)
      setGender(profileDetails?.gender);
      setWebsite(profileDetails.website || "");
      let cat= profileDetails.categories_id;
      const catArray = cat?.split(',').map(Number);
      setCategory(catArray);
      setCompany(profileDetails?.company)
      setCountry(Number(profileDetails?.countries_id))
      setCity(profileDetails?.city)
      setAddress(profileDetails?.address)
      setPostalCode(profileDetails?.zip)
      setFacebookLink(profileDetails?.facebook)
      setTwitterLink(profileDetails?.twitter)
      setInstagramLink(profileDetails?.instagram)
      setYoutubeLink(profileDetails?.youtube)
      setPinterestLink(profileDetails?.pinterest)
      setGithubLink(profileDetails?.github)
      setSnapchatLink(profileDetails?.snapchat)
      setTiktokLink(profileDetails?.tiktok)
      setTelegramLink(profileDetails?.telegram)
      setTwitchLink(profileDetails?.twitch)
      setDiscordLink(profileDetails?.discord)
      setVkLink(profileDetails?.vk)
      setRedditLink(profileDetails?.reddit)
      setSpotifyLink(profileDetails?.spotify)
      setThreadsLink(profileDetails?.threads)
      setKickLink(profileDetails?.kick)
      setStory(profileDetails.story || "");
    }
  }, [profileDetails]);

  // Validation
  const usernameRegex = /^[a-zA-Z0-9_-]{3,25}$/;
  const websiteRegex = /^https?:\/\/.+/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errors = {
    fullName:
      !fullName || fullName.trim().length < 2
        ? "Full name is required (min 2 characters)"
        : /[^a-zA-Z\s]/.test(fullName)
        ? "Full name can only contain letters and spaces"
        : "",
    username: !usernameRegex.test(username)
      ? "Username must be 3-25 characters. Only letters, numbers, dashes, and underscores are allowed."
      : "",
    email:
      email && !emailRegex.test(email)
        ? "Please enter a valid email address"
        : "",
    profession:
      profession &&
      (profession.trim().length < 6
        ? "Profession must be at least 6 characters"
        : profession.trim().length > 100
        ? "Profession must be at most 100 characters"
        : ""),
    language:"",
    birthday: "",
    gender:"",
    website:
      website && !websiteRegex.test(website)
        ? "Please enter a valid website URL (starting with http:// or https://)"
        : "",
    category:"",
    story:
      !story || story.trim().length < 10
        ? "Please tell us about your story (min 10 characters)"
        : story.length > metaData?.story_length
        ? `Story must be ${metaData?.story_length} characters or less`
        : "",
    facebookLink:
      facebookLink && !websiteRegex.test(facebookLink)
        ? "Please enter a valid Facebook URL"
        : "",
    twitterLink:
      twitterLink && !websiteRegex.test(twitterLink)
        ? "Please enter a valid Twitter URL"
        : "",
    instagramLink:
      instagramLink && !websiteRegex.test(instagramLink)
        ? "Please enter a valid Instagram URL"
        : "",
    youtubeLink:
      youtubeLink && !websiteRegex.test(youtubeLink)
        ? "Please enter a valid YouTube URL"
        : "",
    pinterestLink:
      pinterestLink && !websiteRegex.test(pinterestLink)
        ? "Please enter a valid Pinterest URL"
        : "",
    githubLink:
      githubLink && !websiteRegex.test(githubLink)
        ? "Please enter a valid GitHub URL"
        : "",
    snapchatLink:
      snapchatLink && !websiteRegex.test(snapchatLink)
        ? "Please enter a valid Snapchat URL"
        : "",
    telegramLink:
      telegramLink && !websiteRegex.test(telegramLink)
        ? "Please enter a valid Telegram URL"
        : "",
    twitchLink:
      twitchLink && !websiteRegex.test(twitchLink)
        ? "Please enter a valid Twitch URL"
        : "",
    discordLink:
      discordLink && !websiteRegex.test(discordLink)
        ? "Please enter a valid Discord URL"
        : "",
    vkLink:
      vkLink && !websiteRegex.test(vkLink) ? "Please enter a valid VK URL" : "",
    redditLink:
      redditLink && !websiteRegex.test(redditLink)
        ? "Please enter a valid Reddit URL"
        : "",
    spotifyLink:
      spotifyLink && !websiteRegex.test(spotifyLink)
        ? "Please enter a valid Spotify URL"
        : "",
    threadsLink:
      threadsLink && !websiteRegex.test(threadsLink)
        ? "Please enter a valid Threads URL"
        : "",
    kickLink:
      kickLink && !websiteRegex.test(kickLink)
        ? "Please enter a valid Kick URL"
        : "",
    tiktokLink:
      tiktokLink && !websiteRegex.test(tiktokLink)
        ? "Please enter a valid TikTok URL"
        : "",
    company:
      company && company.trim().length < 2
        ? "Company name must be at least 2 characters"
        : "",
    country: !country ? "Country is required" : "",
    city:
      city && city.trim().length < 2
        ? "City must be at least 2 characters"
        : city.length > 100
        ? "City must be at most 100 characters"
        : "",
    address:
      address && address.trim().length < 5
        ? "Address must be at least 5 characters"
        : address.length > 100
        ? "Address must be at most 100 characters"
        : "",
    postalCode:
      postalCode && postalCode.trim().length < 3
        ? "Postal code must be at least 3 characters"
        : postalCode.length > 20
        ? "Postal code must be at most 20 characters"
        : "",
  };

  const isFormValid =
    !errors.fullName &&
    !errors.username &&
    !errors.story &&
    !errors.country; // this checks your validation error for country

  const handleDateSelect = (date: string) => {
    setBirthday(date);
    setShowDatePicker(false);
    setTouched((t) => ({ ...t, birthday: true }));
  };

  const handleCancelDate = () => {
    setShowDatePicker(false);
  };

  const handleSave = async () => {
    if (!isFormValid) {
      setTouched((t) => ({ ...t, country: true }));
      Alert.alert("Validation Error", "Please fix the errors before saving.");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update user profile in Redux
      const updatedUser = {
        ...user,
        id: user?.id || "user-" + Date.now(),
        // name: fullName.trim(),
        // email: email.trim(), // Ensure email is preserved
        // username: username.trim(),
        avatar_image: avatarImage.trim(),
        cover_image: coverImage.trim(),
        status: status.trim(),
        // website: website.trim(),
        // categories_id: category,
        // profession: profession.trim(),
        // language: language,
        // birthday: birthday,
        // gender: gender,
       
        // story: story.trim(),
        // facebook: facebookLink.trim(),
        // twitter: twitterLink.trim(),
        // instagram: instagramLink.trim(),
        // youtube: youtubeLink.trim(),
        // pinterest: pinterestLink.trim(),
        // github: githubLink.trim(),
        // snapchat: snapchatLink.trim(),
        // telegram: telegramLink.trim(),
        // twitch: twitchLink.trim(),
        // discord: discordLink.trim(),
        // vk: vkLink.trim(),
        // reddit: redditLink.trim(),
        // spotify: spotifyLink.trim(),
        // threads: threadsLink.trim(),
        // kick: kickLink.trim(),
        // tiktok: tiktokLink.trim(),
        // company: company.trim(),
        // countries_id: country,
        // city: city.trim(),
        // address: address.trim(),
        // zip: postalCode.trim(),


        name: fullName.trim(),
        email: email.trim(), // Ensure email is preserved
        username: username.trim(),
        website:website.trim(),
        categories_id:category,
        profession:profession,
        countries_id : country,
        city:city,
        address:address,
        zip:postalCode,
        company:company,
        story:story,
        facebook:facebookLink,
        twitter:twitchLink,
        instagram:instagramLink,
        youtube:youtubeLink,
        pinterest:pinterestLink,
        github:githubLink,
        snapchat:snapchatLink,
        tiktok:tiktokLink,
        telegram:telegramLink,
        twitch:twitchLink,
        discord:discordLink,
        vk:vkLink,
        reddit:redditLink,
        spotify:spotifyLink,
        threads:threadsLink,
        kick:kickLink,
        gender:gender,
        birthdate:formatDateMMDDYYYY(birthday),
        language :language,
        hide_name:showUsername === true ? "yes" : "no"
      };
      const updateUserObj={
        name: fullName.trim(),
        email: email.trim(), // Ensure email is preserved
        username: username.trim(),
        website:website.trim(),
        categories_id:category,
        profession:profession,
        countries_id : country,
        city:city,
        address:address,
        zip:postalCode,
        company:company,
        story:story,
        facebook:facebookLink,
        twitter:twitchLink,
        instagram:instagramLink,
        youtube:youtubeLink,
        pinterest:pinterestLink,
        github:githubLink,
        snapchat:snapchatLink,
        tiktok:tiktokLink,
        telegram:telegramLink,
        twitch:twitchLink,
        discord:discordLink,
        vk:vkLink,
        reddit:redditLink,
        spotify:spotifyLink,
        threads:threadsLink,
        kick:kickLink,
        gender:gender,
        birthdate:formatDateMMDDYYYY(birthday),
        language :language,
        hide_name:showUsername === true ? "yes" : "no"
      }
      console.log("updatedUser",updateUserObj)
     updateProfile(updateUserObj)
     dispatch(setProfile(updatedUser));
     Toast.show({
      type: 'success',
      text1: 'Profile updated successfully',
    });
    // Optionally navigate back after a delay
    setTimeout(() => navigation.goBack(), 1000);

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to update profile. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const renderDatePicker = () => (
    <Modal
      visible={showDatePicker}
      transparent
      animationType="slide"
      onRequestClose={handleCancelDate}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.datePickerContainer, theme.card]}>
          <View style={styles.datePickerHeader}>
            <Text style={[styles.datePickerTitle, theme.text]}>
              Select Birthday
            </Text>
            <TouchableOpacity onPress={handleCancelDate}>
              <Ionicons
                name="close"
                size={24}
                color={theme.text.color as string}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.datePickerContent}>
            <Calendar
              onDayPress={profileDetails?.birthdate_changed === "yes" ? () => {} : (day) => handleDateSelect(day.dateString)}
              enableSwipeMonths={true}
              current={birthday || get18YearsAgoDate()}
              // Highlight the user's birthday if it exists, otherwise highlight 18 years ago from today
              markedDates={
                birthday
                  ? {
                      [birthday]: {
                        selected: true,
                        selectedColor: theme.button.backgroundColor as string,
                      },
                    }
                  : {}
              }
              maxDate={get18YearsAgoDate()}
              minDate={"1920-01-01"}
              theme={{
                backgroundColor: "transparent",
                calendarBackground: "transparent",
                textSectionTitleColor: theme.text.color as string,
                selectedDayBackgroundColor: theme.button
                  .backgroundColor as string,
                selectedDayTextColor: theme.button.color as string,
                todayTextColor: theme.button.backgroundColor as string,
                dayTextColor: theme.text.color as string,
                textDisabledColor: String(theme.text.color) + "50",
                dotColor: theme.button.backgroundColor as string,
                selectedDotColor: theme.button.color as string,
                arrowColor: theme.text.color as string,
                monthTextColor: theme.text.color as string,
                indicatorColor: theme.button.backgroundColor as string,
                textDayFontWeight: "300",
                textMonthFontWeight: "bold",
                textDayHeaderFontWeight: "300",
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 13,
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <>
      <KeyboardAvoidingView
        // keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 100}
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Profile Information Section */}
          <View style={[styles.sectionContainer, theme.card, theme.background]}>
            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, theme.text]}>Full Name *</Text>
              <View
                style={[
                  styles.inputContainer,
                  theme.card,
                  {
                    borderColor:
                      errors.fullName && touched.fullName
                        ? "red"
                        : theme.border.borderColor,
                  },
                ]}
              >
                <Ionicons
                  name="person"
                  size={20}
                  color="#888b8f"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.inputWithIcon, theme.text, theme.card]}
                  placeholder="Full name"
                  placeholderTextColor={String(theme.text.color) + "99"}
                  value={fullName}
                  onChangeText={(text) =>
                    setFullName(text.replace(/[^a-zA-Z\s]/g, ""))
                  }
                  maxLength={100}
                  onBlur={() => setTouched((t) => ({ ...t, fullName: true }))}
                  editable={!loading}
                />
              </View>
              {errors.fullName && touched.fullName && (
                <Text style={styles.error}>{errors.fullName}</Text>
              )}
            </View>

            {/* Username */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, theme.text]}>Username *</Text>
              <View
                style={[
                  styles.inputContainer,
                  theme.card,
                  {
                    borderColor:
                      errors.username && touched.username
                        ? "red"
                        : theme.border.borderColor,
                  },
                ]}
              >
                <Text style={[styles.urlPrefix]}>
                  onlyfans.checkrain.co.in/
                </Text>
                <TextInput
                  style={[styles.inputWithIcon, theme.text]}
                  placeholder="Username"
                  placeholderTextColor={String(theme.text.color) + "99"}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  onBlur={() => setTouched((t) => ({ ...t, username: true }))}
                  editable={!loading}
                />
              </View>
              {errors.username && touched.username && (
                <Text style={styles.error}>{errors.username}</Text>
              )}
            </View>

            {/* Username Display Toggle */}
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  showUsername ? styles.toggleActive : styles.toggleInactive,
                ]}
                onPress={() => setShowUsername(!showUsername)}
                disabled={loading}
              >
                <View
                  style={[
                    styles.toggleThumb,
                    showUsername
                      ? styles.toggleThumbActive
                      : styles.toggleThumbInactive,
                  ]}
                />
              </TouchableOpacity>
              <Text style={[styles.toggleLabel, theme.text]}>
                Show username instead of your Full name
              </Text>
            </View>

            {/* Email Field */}

            <View style={[styles.inputGroup, { marginTop: 10 }]}>
              <View
                style={[
                  styles.inputContainer,
                  theme.card,
                  { borderColor: theme.border.borderColor },
                ]}
              >
                <TextInput
                  style={[styles.inputWithIcon, theme.text, theme.card]}
                  placeholder="Email"
                  placeholderTextColor={String(theme.text.color) + "99"}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={metaData?.isSuperAdmin !== false && true}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                />
              </View>
              {errors.email && touched.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
            </View>

            {/* Profession/Occupation */}
            <View style={styles.inputGroup}>
              <View
                style={[
                  styles.inputContainer,
                  theme.card,
                  {
                    borderColor:
                      errors.profession && touched.profession
                        ? "red"
                        : theme.border.borderColor,
                  },
                ]}
              >
                <FontAwesome6
                  name="user-tie"
                  size={20}
                  color="#888b8f"
                  style={styles.inputIcon}
                />

                <TextInput
                  style={[styles.inputWithIcon, theme.text]}
                  placeholder="Profession/Occupation"
                  placeholderTextColor={String(theme.text.color) + "99"}
                  value={profession}
                  onChangeText={setProfession}
                  onBlur={() => setTouched((t) => ({ ...t, profession: true }))}
                  editable={!loading}
                  maxLength={100}
                />
              </View>
              {errors.profession && touched.profession && (
                <Text style={styles.error}>{errors.profession}</Text>
              )}
            </View>

            {/* Language Dropdown */}
            <View style={styles.inputGroup}>
              <View
                style={[
                  styles.inputContainer,
                  theme.card,
                  {
                    borderColor:
                      errors.language && touched.language
                        ? "red"
                        : theme.border.borderColor,
                  },
                ]}
              >
                <Ionicons
                  name="language-outline"
                  size={20}
                  color="#888b8f"
                  style={styles.inputIcon}
                />
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={[styles.placeholderStyle,theme.text]}
                    selectedTextStyle={[styles.selectedTextStyle,theme.text]}
                    inputSearchStyle={[styles.inputSearchStyle,theme.text]}
                    data={languages}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="(Language) Not specified"
                    searchPlaceholder="Search..."
                    value={language}
                    onChange={(item) => {
                      setLanguage(item.value);
                    }}
                  />
                {errors.language && touched.language && (
                  <Text style={styles.error}>{errors.language}</Text>
                )}
              </View>
            </View>

            {/* Birthday */}
            <View style={styles.inputGroup}>
              <View
                style={[
                  styles.inputContainer,
                  theme.card,
                  {
                    borderColor:
                      errors.birthday && touched.birthday
                        ? "red"
                        : theme.border.borderColor,
                  },
                ]}
              >
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color="#888b8f"
                  style={styles.inputIcon}
                />
                <TouchableOpacity
                  style={styles.dateButtonWithIcon}
                  onPress={() => setShowDatePicker(true)}
                  disabled={profileDetails?.birthdate_change === "yes" || loading}
                >
                  <Text
                    style={[
                      styles.dateButtonText,
                      theme.text,
                      !birthday && { opacity: 0.6 },
                      profileDetails?.birthdate_changed === "yes" && { color: "#aaa" }
                    ]}
                  >
                    {birthday ? formatDateMMDDYYYY(birthday) : "* Birthdate"}
                  </Text>
                </TouchableOpacity>
              </View>
              {errors.birthday && touched.birthday && (
                <Text style={styles.error}>{errors.birthday}</Text>
              )}
            </View>

            {/* Gender Dropdown */}
            <View style={styles.inputGroup}>
              <View
                style={[
                  styles.inputContainer,
                  theme.card,
                  {
                    borderColor:
                      errors.gender && touched.gender
                        ? "red"
                        : theme.border.borderColor,
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="gender-male-female"
                  size={20}
                  color="#888b8f"
                  style={styles.inputIcon}
                />
                 <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={[styles.placeholderStyle,theme.text]}
                    selectedTextStyle={[styles.selectedTextStyle,theme.text]}
                    inputSearchStyle={[styles.inputSearchStyle,theme.text]}
                    data={genders}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="(Gender) Not specified"
                    searchPlaceholder="Search..."
                    value={gender}
                    onChange={(item) => {
                      setGender(item.value);
                    }}
                  />
                
                {errors.gender && touched.gender && (
                  <Text style={styles.error}>{errors.gender}</Text>
                )}
              </View>
            </View>

            {/* Website */}
            {profileDetails && profileDetails?.verified_id === "yes" && (
              <View style={styles.inputGroup}>
                <View
                  style={[
                    styles.inputContainer,
                    theme.card,
                    {
                      borderColor:
                        errors.website && touched.website
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
                  <TextInput
                    style={[styles.inputWithIcon, theme.text]}
                    placeholder="Website"
                    placeholderTextColor={String(theme.text.color) + "99"}
                    value={website}
                    onChangeText={setWebsite}
                    onBlur={() => setTouched((t) => ({ ...t, website: true }))}
                    editable={!loading}
                  />
                </View>
                {errors.website && touched.website && (
                  <Text style={styles.error}>{errors.website}</Text>
                )}
              </View>
            )}

            {/* Category Dropdown */}
            {profileDetails && profileDetails?.verified_id === "yes" && (
                <View style={styles.inputGroup}>
                <View
                  style={[
                    styles.inputContainer,
                    theme.card,theme.border
                  ]}
                >
                <AntDesign name="bulb1" size={20}
                  color="#888b8f"
                  style={styles.inputIcon} />
                <MultiSelect
                    style={styles.dropdown}
                    placeholderStyle={[styles.placeholderStyle,theme.text]}
                    selectedTextStyle={[styles.selectedTextStyle,theme.text]}
                    inputSearchStyle={[styles.inputSearchStyle,theme.text]}
                  data={categories}
                  labelField="label"
                  valueField="value"
                  value={category}
                  placeholder="Categories"
                  onChange={item => {
                    setCategory(item);
                    setTouched((t) => ({ ...t, category: true }));
                  }}
                  search
                />
                
              </View>
              </View>
            )}
            {errors.category && touched.category && (
                  <Text style={styles.error}>{errors.category}</Text>
                )}
          </View>
          
          {/* Billing Information Section */}{" "}
        
            <View
              style={[styles.sectionContainer, theme.card, theme.background]}
            >
              <Text style={[styles.sectionTitle]}>--Billing Information</Text>
              {/* Company */}
              <View style={styles.inputGroup}>
                <View
                  style={[
                    styles.inputContainer,
                    theme.card,
                    {
                      borderColor:
                        errors.company && touched.company
                          ? "red"
                          : theme.border.borderColor,
                    },
                  ]}
                >
                  <Ionicons
                    name="business-outline"
                    size={20}
                    color="#888b8f"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.inputWithIcon, theme.text]}
                    placeholder="Company"
                    placeholderTextColor={String(theme.text.color) + "99"}
                    value={company}
                    onChangeText={setCompany}
                    onBlur={() => setTouched((t) => ({ ...t, company: true }))}
                    editable={!loading}
                  />
                </View>
                {errors.company && touched.company && (
                  <Text style={styles.error}>{errors.company}</Text>
                )}
              </View>

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
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={[styles.placeholderStyle,theme.text]}
                    selectedTextStyle={[styles.selectedTextStyle,theme.text]}
                    inputSearchStyle={[styles.inputSearchStyle,theme.text]}
                    data={countries}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="* Select Country"
                    searchPlaceholder="Search..."
                    value={country}
                    onChange={(item) => {
                      setCountry(item.value);
                    }}
                  />
                </View>
                {errors.country && touched.country && (
                  <Text style={styles.error}>{errors.country}</Text>
                )}
              </View>

              {/* City */}
              <View style={styles.inputGroup}>
                <View
                  style={[
                    styles.inputContainer,
                    theme.card,
                    {
                      borderColor:
                        errors.city && touched.city
                          ? "red"
                          : theme.border.borderColor,
                    },
                  ]}
                >
                  <Entypo
                    name="location-pin"
                    size={20}
                    color="#888b8f"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.inputWithIcon, theme.text]}
                    placeholder="City"
                    placeholderTextColor={String(theme.text.color) + "99"}
                    value={city}
                    onChangeText={setCity}
                    onBlur={() => setTouched((t) => ({ ...t, city: true }))}
                    editable={!loading}
                    maxLength={100}
                  />
                </View>
                {errors.city && touched.city && (
                  <Text style={styles.error}>{errors.city}</Text>
                )}
              </View>

              {/* Address */}
              <View style={styles.inputGroup}>
                <View
                  style={[
                    styles.textareaContainer,
                    theme.card,
                    {
                      borderColor:
                        errors.address && touched.address
                          ? "red"
                          : theme.border.borderColor,
                    },
                  ]}
                >
                  <Ionicons
                    name="home-outline"
                    size={20}
                    color="#888b8f"
                    style={styles.textareaIcon}
                  />
                  <TextInput
                    style={[styles.textarea, theme.text]}
                    placeholder="Address"
                    placeholderTextColor={String(theme.text.color) + "99"}
                    value={address}
                    onChangeText={setAddress}
                    multiline
                    numberOfLines={3}
                    onBlur={() => setTouched((t) => ({ ...t, address: true }))}
                    editable={!loading}
                    maxLength={100}
                  />
                </View>
                {errors.address && touched.address && (
                  <Text style={styles.error}>{errors.address}</Text>
                )}
              </View>

              {/* Postal/Zip Code */}
              <View style={styles.inputGroup}>
                <View
                  style={[
                    styles.inputContainer,
                    theme.card,
                    {
                      borderColor:
                        errors.postalCode && touched.postalCode
                          ? "red"
                          : theme.border.borderColor,
                    },
                  ]}
                >
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color="#888b8f"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.inputWithIcon, theme.text]}
                    placeholder="Postal/Zip"
                    placeholderTextColor={String(theme.text.color) + "99"}
                    value={postalCode}
                    onChangeText={setPostalCode}
                    keyboardType="numeric"
                    onBlur={() =>
                      setTouched((t) => ({ ...t, postalCode: true }))
                    }
                    editable={!loading}
                    maxLength={20}
                  />
                </View>
                {errors.postalCode && touched.postalCode && (
                  <Text style={styles.error}>{errors.postalCode}</Text>
                )}
              </View>
            </View>
          {/* )} */}
          {/* Social Profiles Section */}
          {profileDetails && profileDetails?.verified_id === "yes" && (
            <View
              style={[styles.sectionContainer, theme.card, theme.background]}
            >
              <Text style={[styles.sectionTitle]}>--Social Profiles</Text>

              {/* Facebook */}
              <View style={styles.inputGroup}>
                <View
                  style={[
                    styles.inputContainer,
                    theme.card,
                    {
                      borderColor:
                        errors.facebookLink && touched.facebookLink
                          ? "red"
                          : theme.border.borderColor,
                    },
                  ]}
                >
                  <Ionicons
                    name="logo-facebook"
                    size={20}
                    color="#1877F2"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.inputWithIcon, theme.text]}
                    placeholder="https://facebook.com/username"
                    placeholderTextColor={String(theme.text.color) + "99"}
                    value={facebookLink}
                    onChangeText={setFacebookLink}
                    onBlur={() =>
                      setTouched((t) => ({ ...t, facebookLink: true }))
                    }
                    editable={!loading}
                  />
                </View>
                {errors.facebookLink && touched.facebookLink && (
                  <Text style={styles.error}>{errors.facebookLink}</Text>
                )}
              </View>

              {/* Twitter */}
              <View style={styles.inputGroup}>
                <View
                  style={[
                    styles.inputContainer,
                    theme.card,
                    {
                      borderColor:
                        errors.twitterLink && touched.twitterLink
                          ? "red"
                          : theme.border.borderColor,
                    },
                  ]}
                >
                  <Ionicons
                    name="logo-twitter"
                    size={20}
                    color="#1DA1F2"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.inputWithIcon, theme.text]}
                    placeholder="https://twitter.com/username"
                    placeholderTextColor={String(theme.text.color) + "99"}
                    value={twitterLink}
                    onChangeText={setTwitterLink}
                    onBlur={() =>
                      setTouched((t) => ({ ...t, twitterLink: true }))
                    }
                    editable={!loading}
                  />
                </View>
                {errors.twitterLink && touched.twitterLink && (
                  <Text style={styles.error}>{errors.twitterLink}</Text>
                )}
              </View>

              {/* Instagram */}
              <View style={styles.inputGroup}>
                <View
                  style={[
                    styles.inputContainer,
                    theme.card,
                    {
                      borderColor:
                        errors.instagramLink && touched.instagramLink
                          ? "red"
                          : theme.border.borderColor,
                    },
                  ]}
                >
                  <Ionicons
                    name="logo-instagram"
                    size={20}
                    color="#E4405F"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.inputWithIcon, theme.text]}
                    placeholder="https://instagram.com/username"
                    placeholderTextColor={String(theme.text.color) + "99"}
                    value={instagramLink}
                    onChangeText={setInstagramLink}
                    onBlur={() =>
                      setTouched((t) => ({ ...t, instagramLink: true }))
                    }
                    editable={!loading}
                  />
                </View>
                {errors.instagramLink && touched.instagramLink && (
                  <Text style={styles.error}>{errors.instagramLink}</Text>
                )}
              </View>

              {/* YouTube */}
              <View style={styles.inputGroup}>
                <View
                  style={[
                    styles.inputContainer,
                    theme.card,
                    {
                      borderColor:
                        errors.youtubeLink && touched.youtubeLink
                          ? "red"
                          : theme.border.borderColor,
                    },
                  ]}
                >
                  <Ionicons
                    name="logo-youtube"
                    size={20}
                    color="#FF0000"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.inputWithIcon, theme.text]}
                    placeholder="https://youtube.com/username"
                    placeholderTextColor={String(theme.text.color) + "99"}
                    value={youtubeLink}
                    onChangeText={setYoutubeLink}
                    onBlur={() =>
                      setTouched((t) => ({ ...t, youtubeLink: true }))
                    }
                    editable={!loading}
                  />
                </View>
                {errors.youtubeLink && touched.youtubeLink && (
                  <Text style={styles.error}>{errors.youtubeLink}</Text>
                )}
              </View>

              {/* Pinterest */}
              <View style={styles.inputGroup}>
                <View
                  style={[
                    styles.inputContainer,
                    theme.card,
                    {
                      borderColor:
                        errors.pinterestLink && touched.pinterestLink
                          ? "red"
                          : theme.border.borderColor,
                    },
                  ]}
                >
                  <Ionicons
                    name="logo-pinterest"
                    size={20}
                    color="#BD081C"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.inputWithIcon, theme.text]}
                    placeholder="https://pinterest.com/username"
                    placeholderTextColor={String(theme.text.color) + "99"}
                    value={pinterestLink}
                    onChangeText={setPinterestLink}
                    onBlur={() =>
                      setTouched((t) => ({ ...t, pinterestLink: true }))
                    }
                    editable={!loading}
                  />
                </View>
                {errors.pinterestLink && touched.pinterestLink && (
                  <Text style={styles.error}>{errors.pinterestLink}</Text>
                )}
              </View>

              {/* GitHub */}
              <View style={styles.inputGroup}>
                <View
                  style={[
                    styles.inputContainer,
                    theme.card,
                    {
                      borderColor:
                        errors.githubLink && touched.githubLink
                          ? "red"
                          : theme.border.borderColor,
                    },
                  ]}
                >
                  <Ionicons
                    name="logo-github"
                    size={20}
                    color="#333"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.inputWithIcon, theme.text]}
                    placeholder="https://github.com/username"
                    placeholderTextColor={String(theme.text.color) + "99"}
                    value={githubLink}
                    onChangeText={setGithubLink}
                    onBlur={() =>
                      setTouched((t) => ({ ...t, githubLink: true }))
                    }
                    editable={!loading}
                  />
                </View>
                {errors.githubLink && touched.githubLink && (
                  <Text style={styles.error}>{errors.githubLink}</Text>
                )}
              </View>

              {/* Snapchat */}
              <View style={styles.inputGroup}>
                <View
                  style={[
                    styles.inputContainer,
                    theme.card,
                    {
                      borderColor:
                        errors.snapchatLink && touched.snapchatLink
                          ? "red"
                          : theme.border.borderColor,
                    },
                  ]}
                >
                  <Ionicons
                    name="logo-snapchat"
                    size={20}
                    color="#FFFC00"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.inputWithIcon, theme.text]}
                    placeholder="https://www.snapchat.com/add/username"
                    placeholderTextColor={String(theme.text.color) + "99"}
                    value={snapchatLink}
                    onChangeText={setSnapchatLink}
                    onBlur={() =>
                      setTouched((t) => ({ ...t, snapchatLink: true }))
                    }
                    editable={!loading}
                  />
                </View>
                {errors.snapchatLink && touched.snapchatLink && (
                  <Text style={styles.error}>{errors.snapchatLink}</Text>
                )}
              </View>

              {/* TikTok */}
              <View style={styles.inputGroup}>
                <View
                  style={[
                    styles.inputContainer,
                    theme.card,
                    {
                      borderColor:
                        errors.tiktokLink && touched.tiktokLink
                          ? "red"
                          : theme.border.borderColor,
                    },
                  ]}
                >
                  <Ionicons
                    name="logo-tiktok"
                    size={20}
                    color="#000"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.inputWithIcon, theme.text]}
                    placeholder="https://www.tiktok.com/@username"
                    placeholderTextColor={String(theme.text.color) + "99"}
                    value={tiktokLink}
                    onChangeText={setTiktokLink}
                    onBlur={() =>
                      setTouched((t) => ({ ...t, tiktokLink: true }))
                    }
                    editable={!loading}
                  />
                </View>
                {errors.tiktokLink && touched.tiktokLink && (
                  <Text style={styles.error}>{errors.tiktokLink}</Text>
                )}
              </View>

              {/* Telegram */}
              <View style={styles.inputGroup}>
                <View
                  style={[
                    styles.inputContainer,
                    theme.card,
                    {
                      borderColor:
                        errors.telegramLink && touched.telegramLink
                          ? "red"
                          : theme.border.borderColor,
                    },
                  ]}
                >
                  <Ionicons
                    name="paper-plane"
                    size={20}
                    color="#0088CC"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.inputWithIcon, theme.text]}
                    placeholder="https://t.me/username"
                    placeholderTextColor={String(theme.text.color) + "99"}
                    value={telegramLink}
                    onChangeText={setTelegramLink}
                    onBlur={() =>
                      setTouched((t) => ({ ...t, telegramLink: true }))
                    }
                    editable={!loading}
                  />
                </View>
                {errors.telegramLink && touched.telegramLink && (
                  <Text style={styles.error}>{errors.telegramLink}</Text>
                )}
              </View>

              {/* Twitch */}
              <View style={styles.inputGroup}>
                <View
                  style={[
                    styles.inputContainer,
                    theme.card,
                    {
                      borderColor:
                        errors.twitchLink && touched.twitchLink
                          ? "red"
                          : theme.border.borderColor,
                    },
                  ]}
                >
                  <Ionicons
                    name="game-controller"
                    size={20}
                    color="#9146FF"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.inputWithIcon, theme.text]}
                    placeholder="https://www.twitch.tv/username"
                    placeholderTextColor={String(theme.text.color) + "99"}
                    value={twitchLink}
                    onChangeText={setTwitchLink}
                    onBlur={() =>
                      setTouched((t) => ({ ...t, twitchLink: true }))
                    }
                    editable={!loading}
                  />
                </View>
                {errors.twitchLink && touched.twitchLink && (
                  <Text style={styles.error}>{errors.twitchLink}</Text>
                )}
              </View>

              {/* Discord */}
              <View style={styles.inputGroup}>
                <View
                  style={[
                    styles.inputContainer,
                    theme.card,
                    {
                      borderColor:
                        errors.discordLink && touched.discordLink
                          ? "red"
                          : theme.border.borderColor,
                    },
                  ]}
                >
                  <Ionicons
                    name="chatbubbles"
                    size={20}
                    color="#5865F2"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.inputWithIcon, theme.text]}
                    placeholder="https://discord.gg/username"
                    placeholderTextColor={String(theme.text.color) + "99"}
                    value={discordLink}
                    onChangeText={setDiscordLink}
                    onBlur={() =>
                      setTouched((t) => ({ ...t, discordLink: true }))
                    }
                    editable={!loading}
                  />
                </View>
                {errors.discordLink && touched.discordLink && (
                  <Text style={styles.error}>{errors.discordLink}</Text>
                )}
              </View>

              {/* VK */}
              <View style={styles.inputGroup}>
                <View
                  style={[
                    styles.inputContainer,
                    theme.card,
                    {
                      borderColor:
                        errors.vkLink && touched.vkLink
                          ? "red"
                          : theme.border.borderColor,
                    },
                  ]}
                >
                  <Ionicons
                    name="globe"
                    size={20}
                    color="#4C75A3"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.inputWithIcon, theme.text]}
                    placeholder="https://vk.com/username"
                    placeholderTextColor={String(theme.text.color) + "99"}
                    value={vkLink}
                    onChangeText={setVkLink}
                    onBlur={() => setTouched((t) => ({ ...t, vkLink: true }))}
                    editable={!loading}
                  />
                </View>
                {errors.vkLink && touched.vkLink && (
                  <Text style={styles.error}>{errors.vkLink}</Text>
                )}
              </View>

              {/* Reddit */}
              <View style={styles.inputGroup}>
                <View
                  style={[
                    styles.inputContainer,
                    theme.card,
                    {
                      borderColor:
                        errors.redditLink && touched.redditLink
                          ? "red"
                          : theme.border.borderColor,
                    },
                  ]}
                >
                  <Ionicons
                    name="logo-reddit"
                    size={20}
                    color="#FF4500"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.inputWithIcon, theme.text]}
                    placeholder="https://reddit.com/user/username"
                    placeholderTextColor={String(theme.text.color) + "99"}
                    value={redditLink}
                    onChangeText={setRedditLink}
                    onBlur={() =>
                      setTouched((t) => ({ ...t, redditLink: true }))
                    }
                    editable={!loading}
                  />
                </View>
                {errors.redditLink && touched.redditLink && (
                  <Text style={styles.error}>{errors.redditLink}</Text>
                )}
              </View>

              {/* Spotify */}
              <View style={styles.inputGroup}>
                <View
                  style={[
                    styles.inputContainer,
                    theme.card,
                    {
                      borderColor:
                        errors.spotifyLink && touched.spotifyLink
                          ? "red"
                          : theme.border.borderColor,
                    },
                  ]}
                >
                  <Ionicons
                    name="musical-notes"
                    size={20}
                    color="#1DB954"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.inputWithIcon, theme.text]}
                    placeholder="https://spotify.com/username"
                    placeholderTextColor={String(theme.text.color) + "99"}
                    value={spotifyLink}
                    onChangeText={setSpotifyLink}
                    onBlur={() =>
                      setTouched((t) => ({ ...t, spotifyLink: true }))
                    }
                    editable={!loading}
                  />
                </View>
                {errors.spotifyLink && touched.spotifyLink && (
                  <Text style={styles.error}>{errors.spotifyLink}</Text>
                )}
              </View>

              {/* Threads */}
              <View style={styles.inputGroup}>
                <View
                  style={[
                    styles.inputContainer,
                    theme.card,
                    {
                      borderColor:
                        errors.threadsLink && touched.threadsLink
                          ? "red"
                          : theme.border.borderColor,
                    },
                  ]}
                >
                  <Ionicons
                    name="chatbubble"
                    size={20}
                    color="#000000"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.inputWithIcon, theme.text]}
                    placeholder="https://threads.net/username"
                    placeholderTextColor={String(theme.text.color) + "99"}
                    value={threadsLink}
                    onChangeText={setThreadsLink}
                    onBlur={() =>
                      setTouched((t) => ({ ...t, threadsLink: true }))
                    }
                    editable={!loading}
                  />
                </View>
                {errors.threadsLink && touched.threadsLink && (
                  <Text style={styles.error}>{errors.threadsLink}</Text>
                )}
              </View>

              {/* Kick */}
              <View style={styles.inputGroup}>
                <View
                  style={[
                    styles.inputContainer,
                    theme.card,
                    {
                      borderColor:
                        errors.kickLink && touched.kickLink
                          ? "red"
                          : theme.border.borderColor,
                    },
                  ]}
                >
                  <Ionicons
                    name="game-controller-outline"
                    size={20}
                    color="#53FC18"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.inputWithIcon, theme.text]}
                    placeholder="https://kick.com/username"
                    placeholderTextColor={String(theme.text.color) + "99"}
                    value={kickLink}
                    onChangeText={setKickLink}
                    onBlur={() => setTouched((t) => ({ ...t, kickLink: true }))}
                    editable={!loading}
                  />
                </View>
                {errors.kickLink && touched.kickLink && (
                  <Text style={styles.error}>{errors.kickLink}</Text>
                )}
              </View>

              {/* Story */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, theme.text]}>
                  Tell us about your story *
                </Text>
                <TextInput
                  style={[
                    styles.textArea,
                    theme.text,
                    theme.card,
                    {
                      borderColor:
                        errors.story && touched.story
                          ? "red"
                          : theme.border.borderColor,
                    },
                  ]}
                  placeholder="Share your story with us (max 500 characters)"
                  placeholderTextColor={String(theme.text.color) + "99"}
                  value={story}
                  onChangeText={setStory}
                  onBlur={() => setTouched((t) => ({ ...t, story: true }))}
                  multiline
                  numberOfLines={4}
                  maxLength={metaData?.story_length}
                  editable={!loading}
                />
                <View style={styles.characterCount}>
                  <Text style={[styles.characterCountText, theme.text]}>
                    {story.length}/500
                  </Text>
                </View>
                {errors.story && touched.story && (
                  <Text style={styles.error}>{errors.story}</Text>
                )}
              </View>
              {/* Save Button at Bottom */}
            </View>
          )}
          <View style={[styles.sectionContainer, theme.card, theme.background]}>
            <TouchableOpacity
              onPress={handleSave}
              disabled={!isFormValid || loading}
              style={[
                styles.bottomSaveButton,
                theme.button,
                (!isFormValid || loading) && styles.disabledButton,
              ]}
            >
              {loading ? (
                <ActivityIndicator
                  size="small"
                  color={theme.button.color as string}
                />
              ) : (
                <Text
                  style={[
                    styles.bottomSaveButtonText,
                    { color: theme.button.color as string },
                  ]}
                >
                  Save Changes
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
        {renderDatePicker()}
        <Toast />
      </KeyboardAvoidingView>
    </>
  );
};

export default EditProfileScreen;
