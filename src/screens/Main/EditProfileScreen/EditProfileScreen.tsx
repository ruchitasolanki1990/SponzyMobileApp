import React, { useContext, useState, useEffect } from 'react';
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
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Entypo, FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';
import { ThemeContext } from '../../../constants/Themes';
import { RootState, AppDispatch } from '../../../redux/store';
import { setProfile } from '../../../redux/slices/userAuthSlice';
import styles from './EditProfileScreen.style';
import axios from 'axios';

const EditProfileScreen = () => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.userAuth.user);
  const token = useSelector((state: RootState) => state.userAuth.token);

  // Profile Information
  const [fullName, setFullName] = useState(user?.name || '');
  const [username, setUsername] = useState(user?.username || '');
  const [avatarImage, setAvatarImage] = useState(user?.avatar_image || '');
  const [coverImage, setCoverImage] = useState(user?.cover_image || '');
  const [status, setStatus] = useState(user?.status || '');
  const [showUsername, setShowUsername] = useState(false);
  const [email, setEmail] = useState(user?.email || '');
  const [profession, setProfession] = useState(user?.profession || '');
  const [language, setLanguage] = useState(user?.language || 'en');
  const [birthday, setBirthday] = useState(user?.birthday || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [website, setWebsite] = useState(user?.website || '');
  const [category, setCategory] = useState(user?.category || '');
  const [story, setStory] = useState(user?.story || '');

  // Social Profiles
  const [facebookLink, setFacebookLink] = useState(user?.facebookLink || '');
  const [twitterLink, setTwitterLink] = useState(user?.twitterLink || '');
  const [instagramLink, setInstagramLink] = useState(user?.instagramLink || '');
  const [youtubeLink, setYoutubeLink] = useState(user?.youtubeLink || '');
  const [pinterestLink, setPinterestLink] = useState(user?.pinterestLink || '');
  const [githubLink, setGithubLink] = useState(user?.githubLink || '');
  const [snapchatLink, setSnapchatLink] = useState(user?.snapchatLink || '');
  const [telegramLink, setTelegramLink] = useState(user?.telegramLink || '');
  const [twitchLink, setTwitchLink] = useState(user?.twitchLink || '');
  const [discordLink, setDiscordLink] = useState(user?.discordLink || '');
  const [vkLink, setVkLink] = useState(user?.vkLink || '');
  const [redditLink, setRedditLink] = useState(user?.redditLink || '');
  const [spotifyLink, setSpotifyLink] = useState(user?.spotifyLink || '');
  const [threadsLink, setThreadsLink] = useState(user?.threadsLink || '');
  const [kickLink, setKickLink] = useState(user?.kickLink || '');

  // Billing Information
  const [company, setCompany] = useState(user?.company || '');
  const [country, setCountry] = useState(user?.country || '');
  const [city, setCity] = useState(user?.city || '');
  const [address, setAddress] = useState(user?.address || '');
  const [postalCode, setPostalCode] = useState(user?.postalCode || '');

  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
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
    company: false,
    country: false,
    city: false,
    address: false,
    postalCode: false,
  });

  const [countries, setCountries] = useState<{ label: string; value: string }[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [categories, setCategories] = useState<{ label: string; value: string }[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const languages = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Italian', value: 'it' },
    { label: 'Portuguese', value: 'pt' },
    { label: 'Russian', value: 'ru' },
    { label: 'Chinese', value: 'zh' },
    { label: 'Japanese', value: 'ja' },
    { label: 'Korean', value: 'ko' },
  ];

  // Dropdown options
  const genders = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
  ];

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const fetchCountries = async () => {
    setCountriesLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/countries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Adjust the mapping based on your API response structure
      if(response.data.success){
        setCountries(
          response.data?.data.map((item: any) => ({
            label: item.country_name, // or item.label if your API returns that
            value: item.id, // or item.value
          }))
        );
      }
     
    } catch (error) {
      setCountries([]);
      Alert.alert('Error', 'Failed to load countries');
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
            label: item.category_name, // Adjust according to your API response
            value: item.id,
          }))
        );
      }
    } catch (error) {
      setCategories([]);
      Alert.alert('Error', 'Failed to load categories');
    } finally {
      setCategoriesLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
    fetchCategories();
  }, []);

  // Validation
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  const websiteRegex = /^https?:\/\/.+/;
  const errors = {
    fullName: !fullName || fullName.trim().length < 2 ? 'Full name is required (min 2 characters)' : '',
    username: !usernameRegex.test(username) ? 'Username must be 3-20 characters, letters, numbers, and underscores only' : '',
    profession: profession && profession.trim().length < 2 ? 'Profession must be at least 2 characters' : '',
    language: '',
    birthday: '',
    gender: '',
    website: website && !websiteRegex.test(website) ? 'Please enter a valid website URL (starting with http:// or https://)' : '',
    category: '',
    story: !story || story.trim().length < 10 ? 'Please tell us about your story (min 10 characters)' : story.length > 500 ? 'Story must be 500 characters or less' : '',
    facebookLink: facebookLink && !websiteRegex.test(facebookLink) ? 'Please enter a valid Facebook URL' : '',
    twitterLink: twitterLink && !websiteRegex.test(twitterLink) ? 'Please enter a valid Twitter URL' : '',
    instagramLink: instagramLink && !websiteRegex.test(instagramLink) ? 'Please enter a valid Instagram URL' : '',
    youtubeLink: youtubeLink && !websiteRegex.test(youtubeLink) ? 'Please enter a valid YouTube URL' : '',
    pinterestLink: pinterestLink && !websiteRegex.test(pinterestLink) ? 'Please enter a valid Pinterest URL' : '',
    githubLink: githubLink && !websiteRegex.test(githubLink) ? 'Please enter a valid GitHub URL' : '',
    snapchatLink: snapchatLink && !websiteRegex.test(snapchatLink) ? 'Please enter a valid Snapchat URL' : '',
    telegramLink: telegramLink && !websiteRegex.test(telegramLink) ? 'Please enter a valid Telegram URL' : '',
    twitchLink: twitchLink && !websiteRegex.test(twitchLink) ? 'Please enter a valid Twitch URL' : '',
    discordLink: discordLink && !websiteRegex.test(discordLink) ? 'Please enter a valid Discord URL' : '',
    vkLink: vkLink && !websiteRegex.test(vkLink) ? 'Please enter a valid VK URL' : '',
    redditLink: redditLink && !websiteRegex.test(redditLink) ? 'Please enter a valid Reddit URL' : '',
    spotifyLink: spotifyLink && !websiteRegex.test(spotifyLink) ? 'Please enter a valid Spotify URL' : '',
    threadsLink: threadsLink && !websiteRegex.test(threadsLink) ? 'Please enter a valid Threads URL' : '',
    kickLink: kickLink && !websiteRegex.test(kickLink) ? 'Please enter a valid Kick URL' : '',
    company: company && company.trim().length < 2 ? 'Company name must be at least 2 characters' : '',
    country: '',
    city: city && city.trim().length < 2 ? 'City must be at least 2 characters' : '',
    address: address && address.trim().length < 5 ? 'Address must be at least 5 characters' : '',
    postalCode: postalCode && postalCode.trim().length < 3 ? 'Postal code must be at least 3 characters' : '',
  };

  const isFormValid = !errors.fullName && !errors.username && !errors.story;

  const handleDateSelect = (date: string) => {
    setBirthday(date);
    setShowDatePicker(false);
    setTouched(t => ({ ...t, birthday: true }));
  };

  const handleCancelDate = () => {
    setShowDatePicker(false);
  };

  const handleSave = async () => {
    if (!isFormValid) {
      Alert.alert('Validation Error', 'Please fix the errors before saving.');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user profile in Redux
      const updatedUser = {
        ...user,
        id: user?.id || 'user-' + Date.now(),
        name: fullName.trim(),
        email: user?.email || '', // Ensure email is preserved
        username: username.trim(),
        avatar_image: avatarImage.trim(),
        cover_image: coverImage.trim(),
        status: status.trim(),
        profession: profession.trim(),
        language: language,
        birthday: birthday,
        gender: gender,
        website: website.trim(),
        category: category,
        story: story.trim(),
        facebookLink: facebookLink.trim(),
        twitterLink: twitterLink.trim(),
        instagramLink: instagramLink.trim(),
        youtubeLink: youtubeLink.trim(),
        pinterestLink: pinterestLink.trim(),
        githubLink: githubLink.trim(),
        snapchatLink: snapchatLink.trim(),
        telegramLink: telegramLink.trim(),
        twitchLink: twitchLink.trim(),
        discordLink: discordLink.trim(),
        vkLink: vkLink.trim(),
        redditLink: redditLink.trim(),
        spotifyLink: spotifyLink.trim(),
        threadsLink: threadsLink.trim(),
        kickLink: kickLink.trim(),
        company: company.trim(),
        country: country,
        city: city.trim(),
        address: address.trim(),
        postalCode: postalCode.trim(),
      };
      
      dispatch(setProfile(updatedUser));
      
      Alert.alert('Success', 'Profile updated successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
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
            <Text style={[styles.datePickerTitle, theme.text]}>Select Birthday</Text>
            <TouchableOpacity onPress={handleCancelDate}>
              <Ionicons name="close" size={24} color={theme.text.color as string} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.datePickerContent}>
            <Calendar
              onDayPress={(day) => handleDateSelect(day.dateString)}
              markedDates={birthday ? { [birthday]: { selected: true, selectedColor: theme.button.backgroundColor as string } } : {}}
              maxDate={new Date().toISOString().split('T')[0]}
              minDate={'1900-01-01'}
              theme={{
                backgroundColor: 'transparent',
                calendarBackground: 'transparent',
                textSectionTitleColor: theme.text.color as string,
                selectedDayBackgroundColor: theme.button.backgroundColor as string,
                selectedDayTextColor: theme.button.color as string,
                todayTextColor: theme.button.backgroundColor as string,
                dayTextColor: theme.text.color as string,
                textDisabledColor: String(theme.text.color) + '50',
                dotColor: theme.button.backgroundColor as string,
                selectedDotColor: theme.button.color as string,
                arrowColor: theme.text.color as string,
                monthTextColor: theme.text.color as string,
                indicatorColor: theme.button.backgroundColor as string,
                textDayFontWeight: '300',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '300',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 13
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
   
    <>
      <KeyboardAvoidingView  keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 100} behavior={Platform.OS === 'ios' ? 'padding' :'height'} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">

        {/* Profile Information Section */}
        <View style={[styles.sectionContainer, theme.card,theme.background]}>
          
          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, theme.text]}>Full Name *</Text>
            <View style={[styles.inputContainer, theme.card, { borderColor: errors.fullName && touched.fullName ? 'red' : theme.border.borderColor }]}>
              <Ionicons name="person" size={20} color="#888b8f" style={styles.inputIcon} />
              <TextInput
                style={[styles.inputWithIcon, theme.text,theme.card]}
                placeholder="Enter your full name"
                placeholderTextColor={String(theme.text.color) + '99'}
                value={fullName}
                onChangeText={setFullName}
                onBlur={() => setTouched(t => ({ ...t, fullName: true }))}
                editable={!loading}
              />
            </View>
            {errors.fullName && touched.fullName && <Text style={styles.error}>{errors.fullName}</Text>}
          </View>

          {/* Username */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, theme.text]}>Username *</Text>
            <View style={[styles.inputContainer, theme.card, { borderColor: errors.username && touched.username ? 'red' : theme.border.borderColor }]}>
              <Text style={[styles.urlPrefix]}>onlyfans.checkrain.co.in/</Text>
              <TextInput
                style={[styles.inputWithIcon, theme.text]}
                placeholder="Username"
                placeholderTextColor={String(theme.text.color) + '99'}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                onBlur={() => setTouched(t => ({ ...t, username: true }))}
                editable={!loading}
              />
            </View>
            {errors.username && touched.username && <Text style={styles.error}>{errors.username}</Text>}
          </View>

            {/* Username Display Toggle */}
            <View style={styles.toggleContainer}>
            <TouchableOpacity
                style={[styles.toggleButton, showUsername ? styles.toggleActive : styles.toggleInactive]}
                onPress={() => setShowUsername(!showUsername)}
                disabled={loading}
              >
                <View style={[styles.toggleThumb, showUsername ? styles.toggleThumbActive : styles.toggleThumbInactive]} />
              </TouchableOpacity>
                            <Text style={[styles.toggleLabel, theme.text]}>Show username instead of your Full name</Text>
              
            </View>

          {/* Email Field */}
        
           <View style={[styles.inputGroup,{marginTop:10}]}>
          <View style={[styles.inputContainer, theme.card, { borderColor: theme.border.borderColor }]}>
          <TextInput
              style={[styles.inputWithIcon, theme.text, theme.card]}
              placeholder="Email"
              placeholderTextColor={String(theme.text.color) + '99'}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
            </View>
            {errors.username && touched.username && <Text style={styles.error}>{errors.username}</Text>}
          </View>

          {/* Profession/Occupation */}
          <View style={styles.inputGroup}>
            <View style={[styles.inputContainer, theme.card, { borderColor: errors.profession && touched.profession ? 'red' : theme.border.borderColor }]}>
            <FontAwesome6 name="user-tie" size={20} color="#888b8f" style={styles.inputIcon} />
        
              <TextInput
                style={[styles.inputWithIcon, theme.text]}
                placeholder="Enter your profession or occupation"
                placeholderTextColor={String(theme.text.color) + '99'}
                value={profession}
                onChangeText={setProfession}
                onBlur={() => setTouched(t => ({ ...t, profession: true }))}
                editable={!loading}
              />
            </View>
            {errors.profession && touched.profession && <Text style={styles.error}>{errors.profession}</Text>}
          </View>

          {/* Language Dropdown */}
          <View style={styles.inputGroup}>
            <View style={[styles.inputContainer, theme.card, { borderColor: errors.language && touched.language ? 'red' : theme.border.borderColor }]}>
              <Ionicons name="language-outline" size={20} color="#888b8f" style={styles.inputIcon} />
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={language}
                  onValueChange={(value) => {
                    setLanguage(value);
                    setTouched(t => ({ ...t, language: true }));
                  }}
                  style={[styles.picker, theme.text]}
                  enabled={!loading}
                >
                  {languages.map((lang) => (
                    <Picker.Item key={lang.value} label={lang.label} value={lang.value} />
                  ))}
                </Picker>
              </View>
            </View>
            {errors.language && touched.language && <Text style={styles.error}>{errors.language}</Text>}
          </View>

          {/* Birthday */}
          <View style={styles.inputGroup}>
            <View style={[styles.inputContainer, theme.card, { borderColor: errors.birthday && touched.birthday ? 'red' : theme.border.borderColor }]}>
              <Ionicons name="calendar-outline" size={20} color="#888b8f" style={styles.inputIcon} />
              <TouchableOpacity
                style={styles.dateButtonWithIcon}
                onPress={() => setShowDatePicker(true)}
                disabled={loading}
              >
                <Text style={[styles.dateButtonText, theme.text, !birthday && { opacity: 0.6 }]}>
                  {birthday || 'Select your birthday'}
                </Text>
              </TouchableOpacity>
            </View>
            {errors.birthday && touched.birthday && <Text style={styles.error}>{errors.birthday}</Text>}
          </View>

          {/* Gender Dropdown */}
          <View style={styles.inputGroup}>
            <View style={[styles.inputContainer, theme.card, { borderColor: errors.gender && touched.gender ? 'red' : theme.border.borderColor }]}>
              <MaterialCommunityIcons name="gender-male-female"  size={20} color="#888b8f" style={styles.inputIcon}/>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={gender}
                  onValueChange={(value) => {
                    setGender(value);
                    setTouched(t => ({ ...t, gender: true }));
                  }}
                  style={[styles.picker, theme.text]}
                  enabled={!loading}
                >
                  {genders.map((gen) => (
                    <Picker.Item key={gen.value} label={gen.label} value={gen.value} />
                  ))}
                </Picker>
              </View>
            </View>
            {errors.gender && touched.gender && <Text style={styles.error}>{errors.gender}</Text>}
          </View>

          {/* Website */}
          <View style={styles.inputGroup}>
            <View style={[styles.inputContainer, theme.card, { borderColor: errors.website && touched.website ? 'red' : theme.border.borderColor }]}>
              <Ionicons name="globe-outline" size={20} color="#888b8f" style={styles.inputIcon} />
              <TextInput
                style={[styles.inputWithIcon, theme.text]}
                placeholder="Enter your website URL (e.g., https://example.com)"
                placeholderTextColor={String(theme.text.color) + '99'}
                value={website}
                onChangeText={setWebsite}
                onBlur={() => setTouched(t => ({ ...t, website: true }))}
                editable={!loading}
              />
            </View>
            {errors.website && touched.website && <Text style={styles.error}>{errors.website}</Text>}
          </View>

          {/* Category Dropdown */}
          <View style={styles.inputGroup}>
            <View style={[styles.inputContainer, theme.card, { borderColor: errors.category && touched.category ? 'red' : theme.border.borderColor }]}>
              <Ionicons name="grid-outline" size={20} color="#888b8f" style={styles.inputIcon} />
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={category}
                  onValueChange={(value) => {
                    setCategory(value);
                    setTouched(t => ({ ...t, category: true }));
                  }}
                  style={[styles.picker, theme.text]}
                  enabled={!loading && !categoriesLoading}
                >
                  {categoriesLoading ? (
                    <Picker.Item label="Loading categories..." value="" />
                  ) : (
                    categories.map((cat) => (
                      <Picker.Item key={cat.value} label={cat.label} value={cat.value} />
                    ))
                  )}
                </Picker>
              </View>
            </View>
            {errors.category && touched.category && <Text style={styles.error}>{errors.category}</Text>}
          </View>

        </View>

        {/* Billing Information Section */}
        <View style={[styles.sectionContainer, theme.card,theme.background]}>
          <Text style={[styles.sectionTitle]}>--Billing Information</Text>
          {/* Company */}
          <View style={styles.inputGroup}>
            <View style={[styles.inputContainer, theme.card, { borderColor: errors.company && touched.company ? 'red' : theme.border.borderColor }]}>
              <Ionicons name="business-outline" size={20} color="#888b8f" style={styles.inputIcon} />
              <TextInput
                style={[styles.inputWithIcon, theme.text]}
                placeholder="Enter company name"
                placeholderTextColor={String(theme.text.color) + '99'}
                value={company}
                onChangeText={setCompany}
                onBlur={() => setTouched(t => ({ ...t, company: true }))}
                editable={!loading}
              />
            </View>
            {errors.company && touched.company && <Text style={styles.error}>{errors.company}</Text>}
          </View>

          {/* Country Dropdown */}
          <View style={styles.inputGroup}>
            <View style={[styles.inputContainer, theme.card, { borderColor: errors.country && touched.country ? 'red' : theme.border.borderColor }]}>
            <Ionicons name="globe-outline" size={20} color="#888b8f" style={styles.inputIcon} />
            <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={country}
                  onValueChange={(value) => {
                    setCountry(value);
                    setTouched(t => ({ ...t, country: true }));
                  }}
                  style={[styles.picker, theme.text]}
                  enabled={!loading && !countriesLoading}
                >
                  {countriesLoading ? (
                    <Picker.Item label="Loading countries..." value="" />
                  ) : (
                    countries.map((cntry) => (
                      <Picker.Item key={cntry.value} label={cntry.label} value={cntry.value} />
                    ))
                  )}
                </Picker>
              </View>
            </View>
            {errors.country && touched.country && <Text style={styles.error}>{errors.country}</Text>}
          </View>

          {/* City */}
          <View style={styles.inputGroup}>
            <View style={[styles.inputContainer, theme.card, { borderColor: errors.city && touched.city ? 'red' : theme.border.borderColor }]}>
            <Entypo name="location-pin" size={20} color="#888b8f" style={styles.inputIcon} />
              <TextInput
                style={[styles.inputWithIcon, theme.text]}
                placeholder="Enter city name"
                placeholderTextColor={String(theme.text.color) + '99'}
                value={city}
                onChangeText={setCity}
                onBlur={() => setTouched(t => ({ ...t, city: true }))}
                editable={!loading}
              />
            </View>
            {errors.city && touched.city && <Text style={styles.error}>{errors.city}</Text>}
          </View>

          {/* Address */}
          <View style={styles.inputGroup}>
            <View style={[styles.textareaContainer, theme.card, { borderColor: errors.address && touched.address ? 'red' : theme.border.borderColor }]}>
              <Ionicons name="home-outline" size={20} color="#888b8f" style={styles.textareaIcon} />
              <TextInput
                style={[styles.textarea, theme.text]}
                placeholder="Enter your address"
                placeholderTextColor={String(theme.text.color) + '99'}
                value={address}
                onChangeText={setAddress}
                multiline
                numberOfLines={3}
                onBlur={() => setTouched(t => ({ ...t, address: true }))}
                editable={!loading}
              />
            </View>
            {errors.address && touched.address && <Text style={styles.error}>{errors.address}</Text>}
          </View>

          {/* Postal/Zip Code */}
          <View style={styles.inputGroup}>
            <View style={[styles.inputContainer, theme.card, { borderColor: errors.postalCode && touched.postalCode ? 'red' : theme.border.borderColor }]}>
              <Ionicons name="mail-outline" size={20} color="#888b8f" style={styles.inputIcon} />
              <TextInput
                style={[styles.inputWithIcon, theme.text]}
                placeholder="Enter postal/zip code"
                placeholderTextColor={String(theme.text.color) + '99'}
                value={postalCode}
                onChangeText={setPostalCode}
                keyboardType="numeric"
                onBlur={() => setTouched(t => ({ ...t, postalCode: true }))}
                editable={!loading}
              />
            </View>
            {errors.postalCode && touched.postalCode && <Text style={styles.error}>{errors.postalCode}</Text>}
          </View>
        </View>

        {/* Social Profiles Section */}
        <View style={[styles.sectionContainer, theme.card,theme.background]}>
          <Text style={[styles.sectionTitle]}>--Social Profiles</Text>
          
          {/* Facebook */}
          <View style={styles.inputGroup}>
            <View style={[styles.inputContainer, theme.card, { borderColor: errors.facebookLink && touched.facebookLink ? 'red' : theme.border.borderColor }]}>
              <Ionicons name="logo-facebook" size={20} color="#1877F2" style={styles.inputIcon} />
              <TextInput
                style={[styles.inputWithIcon, theme.text]}
                placeholder="Enter Facebook URL"
                placeholderTextColor={String(theme.text.color) + '99'}
                value={facebookLink}
                onChangeText={setFacebookLink}
                onBlur={() => setTouched(t => ({ ...t, facebookLink: true }))}
                editable={!loading}
              />
            </View>
            {errors.facebookLink && touched.facebookLink && <Text style={styles.error}>{errors.facebookLink}</Text>}
          </View>

          {/* Twitter */}
          <View style={styles.inputGroup}>
            <View style={[styles.inputContainer, theme.card, { borderColor: errors.twitterLink && touched.twitterLink ? 'red' : theme.border.borderColor }]}>
              <Ionicons name="logo-twitter" size={20} color="#1DA1F2" style={styles.inputIcon} />
              <TextInput
                style={[styles.inputWithIcon, theme.text]}
                placeholder="Enter Twitter URL"
                placeholderTextColor={String(theme.text.color) + '99'}
                value={twitterLink}
                onChangeText={setTwitterLink}
                onBlur={() => setTouched(t => ({ ...t, twitterLink: true }))}
                editable={!loading}
              />
            </View>
            {errors.twitterLink && touched.twitterLink && <Text style={styles.error}>{errors.twitterLink}</Text>}
          </View>

          {/* Instagram */}
          <View style={styles.inputGroup}>
            <View style={[styles.inputContainer, theme.card, { borderColor: errors.instagramLink && touched.instagramLink ? 'red' : theme.border.borderColor }]}>
              <Ionicons name="logo-instagram" size={20} color="#E4405F" style={styles.inputIcon} />
              <TextInput
                style={[styles.inputWithIcon, theme.text]}
                placeholder="Enter Instagram URL"
                placeholderTextColor={String(theme.text.color) + '99'}
                value={instagramLink}
                onChangeText={setInstagramLink}
                onBlur={() => setTouched(t => ({ ...t, instagramLink: true }))}
                editable={!loading}
              />
            </View>
            {errors.instagramLink && touched.instagramLink && <Text style={styles.error}>{errors.instagramLink}</Text>}
          </View>

          {/* YouTube */}
          <View style={styles.inputGroup}>
            <View style={[styles.inputContainer, theme.card, { borderColor: errors.youtubeLink && touched.youtubeLink ? 'red' : theme.border.borderColor }]}>
              <Ionicons name="logo-youtube" size={20} color="#FF0000" style={styles.inputIcon} />
              <TextInput
                style={[styles.inputWithIcon, theme.text]}
                placeholder="Enter YouTube URL"
                placeholderTextColor={String(theme.text.color) + '99'}
                value={youtubeLink}
                onChangeText={setYoutubeLink}
                onBlur={() => setTouched(t => ({ ...t, youtubeLink: true }))}
                editable={!loading}
              />
            </View>
            {errors.youtubeLink && touched.youtubeLink && <Text style={styles.error}>{errors.youtubeLink}</Text>}
          </View>

          {/* Pinterest */}
          <View style={styles.inputGroup}>
            <View style={[styles.inputContainer, theme.card, { borderColor: errors.pinterestLink && touched.pinterestLink ? 'red' : theme.border.borderColor }]}>
              <Ionicons name="logo-pinterest" size={20} color="#BD081C" style={styles.inputIcon} />
              <TextInput
                style={[styles.inputWithIcon, theme.text]}
                placeholder="Enter Pinterest URL"
                placeholderTextColor={String(theme.text.color) + '99'}
                value={pinterestLink}
                onChangeText={setPinterestLink}
                onBlur={() => setTouched(t => ({ ...t, pinterestLink: true }))}
                editable={!loading}
              />
            </View>
            {errors.pinterestLink && touched.pinterestLink && <Text style={styles.error}>{errors.pinterestLink}</Text>}
          </View>

          {/* GitHub */}
          <View style={styles.inputGroup}>
            <View style={[styles.inputContainer, theme.card, { borderColor: errors.githubLink && touched.githubLink ? 'red' : theme.border.borderColor }]}>
              <Ionicons name="logo-github" size={20} color="#333" style={styles.inputIcon} />
              <TextInput
                style={[styles.inputWithIcon, theme.text]}
                placeholder="Enter GitHub URL"
                placeholderTextColor={String(theme.text.color) + '99'}
                value={githubLink}
                onChangeText={setGithubLink}
                onBlur={() => setTouched(t => ({ ...t, githubLink: true }))}
                editable={!loading}
              />
            </View>
            {errors.githubLink && touched.githubLink && <Text style={styles.error}>{errors.githubLink}</Text>}
          </View>

          {/* Snapchat */}
          <View style={styles.inputGroup}>
            <View style={[styles.inputContainer, theme.card, { borderColor: errors.snapchatLink && touched.snapchatLink ? 'red' : theme.border.borderColor }]}>
              <Ionicons name="logo-snapchat" size={20} color="#FFFC00" style={styles.inputIcon} />
              <TextInput
                style={[styles.inputWithIcon, theme.text]}
                placeholder="Enter Snapchat URL"
                placeholderTextColor={String(theme.text.color) + '99'}
                value={snapchatLink}
                onChangeText={setSnapchatLink}
                onBlur={() => setTouched(t => ({ ...t, snapchatLink: true }))}
                editable={!loading}
              />
            </View>
            {errors.snapchatLink && touched.snapchatLink && <Text style={styles.error}>{errors.snapchatLink}</Text>}
          </View>

          {/* Telegram */}
          <View style={styles.inputGroup}>
            <View style={[styles.inputContainer, theme.card, { borderColor: errors.telegramLink && touched.telegramLink ? 'red' : theme.border.borderColor }]}>
              <Ionicons name="paper-plane" size={20} color="#0088CC" style={styles.inputIcon} />
              <TextInput
                style={[styles.inputWithIcon, theme.text]}
                placeholder="Enter Telegram URL"
                placeholderTextColor={String(theme.text.color) + '99'}
                value={telegramLink}
                onChangeText={setTelegramLink}
                onBlur={() => setTouched(t => ({ ...t, telegramLink: true }))}
                editable={!loading}
              />
            </View>
            {errors.telegramLink && touched.telegramLink && <Text style={styles.error}>{errors.telegramLink}</Text>}
          </View>

          {/* Twitch */}
          <View style={styles.inputGroup}>
            <View style={[styles.inputContainer, theme.card, { borderColor: errors.twitchLink && touched.twitchLink ? 'red' : theme.border.borderColor }]}>
              <Ionicons name="game-controller" size={20} color="#9146FF" style={styles.inputIcon} />
              <TextInput
                style={[styles.inputWithIcon, theme.text]}
                placeholder="Enter Twitch URL"
                placeholderTextColor={String(theme.text.color) + '99'}
                value={twitchLink}
                onChangeText={setTwitchLink}
                onBlur={() => setTouched(t => ({ ...t, twitchLink: true }))}
                editable={!loading}
              />
            </View>
            {errors.twitchLink && touched.twitchLink && <Text style={styles.error}>{errors.twitchLink}</Text>}
          </View>

          {/* Discord */}
          <View style={styles.inputGroup}>
            <View style={[styles.inputContainer, theme.card, { borderColor: errors.discordLink && touched.discordLink ? 'red' : theme.border.borderColor }]}>
              <Ionicons name="chatbubbles" size={20} color="#5865F2" style={styles.inputIcon} />
              <TextInput
                style={[styles.inputWithIcon, theme.text]}
                placeholder="Enter Discord URL"
                placeholderTextColor={String(theme.text.color) + '99'}
                value={discordLink}
                onChangeText={setDiscordLink}
                onBlur={() => setTouched(t => ({ ...t, discordLink: true }))}
                editable={!loading}
              />
            </View>
            {errors.discordLink && touched.discordLink && <Text style={styles.error}>{errors.discordLink}</Text>}
          </View>

          {/* VK */}
          <View style={styles.inputGroup}>
            <View style={[styles.inputContainer, theme.card, { borderColor: errors.vkLink && touched.vkLink ? 'red' : theme.border.borderColor }]}>
              <Ionicons name="globe" size={20} color="#4C75A3" style={styles.inputIcon} />
              <TextInput
                style={[styles.inputWithIcon, theme.text]}
                placeholder="Enter VK URL"
                placeholderTextColor={String(theme.text.color) + '99'}
                value={vkLink}
                onChangeText={setVkLink}
                onBlur={() => setTouched(t => ({ ...t, vkLink: true }))}
                editable={!loading}
              />
            </View>
            {errors.vkLink && touched.vkLink && <Text style={styles.error}>{errors.vkLink}</Text>}
          </View>

          {/* Reddit */}
          <View style={styles.inputGroup}>
            <View style={[styles.inputContainer, theme.card, { borderColor: errors.redditLink && touched.redditLink ? 'red' : theme.border.borderColor }]}>
              <Ionicons name="logo-reddit" size={20} color="#FF4500" style={styles.inputIcon} />
              <TextInput
                style={[styles.inputWithIcon, theme.text]}
                placeholder="Enter Reddit URL"
                placeholderTextColor={String(theme.text.color) + '99'}
                value={redditLink}
                onChangeText={setRedditLink}
                onBlur={() => setTouched(t => ({ ...t, redditLink: true }))}
                editable={!loading}
              />
            </View>
            {errors.redditLink && touched.redditLink && <Text style={styles.error}>{errors.redditLink}</Text>}
          </View>

          {/* Spotify */}
          <View style={styles.inputGroup}>
            <View style={[styles.inputContainer, theme.card, { borderColor: errors.spotifyLink && touched.spotifyLink ? 'red' : theme.border.borderColor }]}>
              <Ionicons name="musical-notes" size={20} color="#1DB954" style={styles.inputIcon} />
              <TextInput
                style={[styles.inputWithIcon, theme.text]}
                placeholder="Enter Spotify URL"
                placeholderTextColor={String(theme.text.color) + '99'}
                value={spotifyLink}
                onChangeText={setSpotifyLink}
                onBlur={() => setTouched(t => ({ ...t, spotifyLink: true }))}
                editable={!loading}
              />
            </View>
            {errors.spotifyLink && touched.spotifyLink && <Text style={styles.error}>{errors.spotifyLink}</Text>}
          </View>

          {/* Threads */}
          <View style={styles.inputGroup}>
            <View style={[styles.inputContainer, theme.card, { borderColor: errors.threadsLink && touched.threadsLink ? 'red' : theme.border.borderColor }]}>
              <Ionicons name="chatbubble" size={20} color="#000000" style={styles.inputIcon} />
              <TextInput
                style={[styles.inputWithIcon, theme.text]}
                placeholder="Enter Threads URL"
                placeholderTextColor={String(theme.text.color) + '99'}
                value={threadsLink}
                onChangeText={setThreadsLink}
                onBlur={() => setTouched(t => ({ ...t, threadsLink: true }))}
                editable={!loading}
              />
            </View>
            {errors.threadsLink && touched.threadsLink && <Text style={styles.error}>{errors.threadsLink}</Text>}
          </View>

          {/* Kick */}
          <View style={styles.inputGroup}>
            <View style={[styles.inputContainer, theme.card, { borderColor: errors.kickLink && touched.kickLink ? 'red' : theme.border.borderColor }]}>
              <Ionicons name="game-controller-outline" size={20} color="#53FC18" style={styles.inputIcon} />
              <TextInput
                style={[styles.inputWithIcon, theme.text]}
                placeholder="Enter Kick URL"
                placeholderTextColor={String(theme.text.color) + '99'}
                value={kickLink}
                onChangeText={setKickLink}
                onBlur={() => setTouched(t => ({ ...t, kickLink: true }))}
                editable={!loading}
              />
            </View>
            {errors.kickLink && touched.kickLink && <Text style={styles.error}>{errors.kickLink}</Text>}
          </View>

          {/* Story */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, theme.text]}>Tell us about your story *</Text>
            <TextInput
              style={[styles.textArea, theme.text, theme.card, { borderColor: errors.story && touched.story ? 'red' : theme.border.borderColor }]}
              placeholder="Share your story with us (max 500 characters)"
              placeholderTextColor={String(theme.text.color) + '99'}
              value={story}
              onChangeText={setStory}
              onBlur={() => setTouched(t => ({ ...t, story: true }))}
              multiline
              numberOfLines={4}
              maxLength={500}
              editable={!loading}
            />
            <View style={styles.characterCount}>
              <Text style={[styles.characterCountText, theme.text]}>{story.length}/500</Text>
            </View>
            {errors.story && touched.story && <Text style={styles.error}>{errors.story}</Text>}
          </View>
          {/* Save Button at Bottom */}
          <TouchableOpacity 
          onPress={handleSave} 
          disabled={!isFormValid || loading}
          style={[styles.bottomSaveButton, theme.button, (!isFormValid || loading) && styles.disabledButton]}
        >
          {loading ? (
            <ActivityIndicator size="small" color={theme.button.color as string} />
          ) : (
            <Text style={[styles.bottomSaveButtonText, { color: theme.button.color as string }]}>Save Changes</Text>
          )}
        </TouchableOpacity>
        </View>

         
    
      </ScrollView>
      {renderDatePicker()}
      </KeyboardAvoidingView>
      </>
  );
};

export default EditProfileScreen; 