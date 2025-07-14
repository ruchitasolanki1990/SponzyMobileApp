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
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    fontSize: 14,
    backgroundColor: "#fff",
    color: "#222",
  },
  eyeIcon: {
    marginLeft: 8,
    padding: 4,
  },
  inputError: {
    borderColor: "red",
  },
  error: {
    color: "red",
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 2,
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
