import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
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
    marginRight: 10,
  },
  toggleActive: {
    backgroundColor: "#450ea7",
  },
  toggleInactive: {
    backgroundColor: "#E0E0E0",
  },
  toggleThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  toggleThumbActive: {
    backgroundColor: "#FFFFFF",
    transform: [{ translateX: 18 }],
  },
  toggleThumbInactive: {
    backgroundColor: "#FFFFFF",
    transform: [{ translateX: 0 }],
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    //marginTop:10,
    marginVertical: 10,
  },
  input: {
    paddingVertical: 12,
    fontSize: 16,
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  blockTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 16,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  uploadContainer:{
    width: "100%",
   // height: "40%",
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#c2cdda",
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
    borderRadius: 10,
    paddingVertical:50
  },
  textarea: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 150,
  },
});
export default styles;
