import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    marginTop: 10,
  },
  sectionSubTitle:{
    fontSize: 14,
    fontWeight: "bold",
    marginVertical:10
  },
  title:{
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  blockTitle:{
    fontSize: 20,
    fontWeight: "bold",
    marginVertical:10
  },
  cardTitle:{
    fontSize: 12,
    fontWeight: "bold"
  },
  cardSubTitle:{
    fontSize: 16,
    fontWeight:'600',
    marginVertical:10
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop:10,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
   },
   toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //marginTop:10,
    marginVertical:10
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
});
export default styles;
