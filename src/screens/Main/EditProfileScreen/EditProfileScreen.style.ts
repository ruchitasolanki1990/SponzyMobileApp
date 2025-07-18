import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.5,
  },
  sectionContainer: {
   // margin: 16,
    padding: 16,
  //  borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 20,
    // fontWeight: 'bold',
    marginBottom: 20,
    //textAlign: 'center',
    color: "#8898aa"
  },
  inputGroup: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    // fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    paddingVertical: 12,
    fontSize: 16,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  inputWithIcon: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  urlPrefix: {
    fontSize: 16,
    paddingVertical: 12,
    // paddingHorizontal: 12,
    color: '#888b8f',
    fontWeight: '500',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  toggleLabel: {
    fontSize: 14,
    flex: 1,
    marginRight: 12,
  },
  toggleButton: {
    width: 40,
    height: 22,
    borderRadius: 11,
    padding: 2,
    marginRight:10
  },
  toggleActive: {
    backgroundColor: '#450ea7',
  },
  toggleInactive: {
    backgroundColor: '#E0E0E0',
  },
  toggleThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  toggleThumbActive: {
    backgroundColor: '#FFFFFF',
    transform: [{ translateX: 18 }],
  },
  toggleThumbInactive: {
    backgroundColor: '#FFFFFF',
    transform: [{ translateX: 0 }],
  },
  textareaContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 12,
    marginTop: 4,
  },
  textareaIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  textarea: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  pickerWrapper: {
    flex: 1,
    marginLeft: 8,  
  },
  picker: {
    width: '100%',

  },
  dateButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateButtonWithIcon: {
    flex: 1,
    paddingVertical: 12,
  },
  dateButtonText: {
    fontSize: 16,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerContainer: {
    width: '80%',
    borderRadius: 12,
    padding: 20,
  },
  datePickerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  datePickerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  datePickerContent: {
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  characterCount: {
    alignItems: 'flex-end',
    marginTop: 4,
  },
  characterCountText: {
    fontSize: 12,
    opacity: 0.7,
  },
  bottomSaveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  bottomSaveButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:50
  },
  bottomSaveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dropdown: {
   // margin: 16,
    height: 50,
    width:"80%",
    // borderBottomColor: 'gray',
    // borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default styles; 