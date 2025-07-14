import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  flex: { flex: 1 },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'linear-gradient(45deg, #ff7e5f, #feb47b)',
  },
  card: {
    width: "90%",
    maxWidth: 600,
    borderRadius: 16,
    padding: 24,
    marginTop: 32,
    marginBottom: 32,
    alignItems: "stretch",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#1E2A3A",
    fontFamily: "Barlow_700Bold",
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
  inputError: {
    borderColor: "red",
  },
  error: {
    color: "red",
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 2,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
    textAlign: 'center',
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeIcon: {
    marginLeft: 8,
    padding: 4,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderRadius: 6,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxLabel: {
    fontSize: 15,
    color: "#1E2A3A",
  },
  loginButton: {
    marginTop: 8,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginHorizontal: 4,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  socialButtonText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  signupLink: {
    marginTop: 18,
    alignItems: "center",
  },
  signupText: {
    fontSize: 15,
  },
  signupTextBold: {
   // color: "#1E90FF",
    fontWeight: "bold",
  },
});

export default styles;
