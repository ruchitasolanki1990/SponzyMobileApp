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
  title:{
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  inputGroup:{
    marginBottom: 10,
  },
  inputContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  pickerWrapper:{
    flex: 1,
    marginLeft: 8,  
  },
  picker:{
    width: '100%',
  },
  inputIcon:{
    marginRight:8
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop:10
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default styles;
