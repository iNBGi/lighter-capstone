import { StyleSheet } from "react-native";

export const loginStyle = StyleSheet.create({
  content: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#1b1e31",
    color: "#000000", // Default text color for buttons

  },
  view: {
    width: "80%",
  },
  card: {
    padding: 10,
    backgroundColor: "#1f1f1f",
    borderRadius: 10, // Add border radius for rounded corners
  },
  cardTitle: {
    color: "#ffffff", // Text color for the card title
  },
  cardButton: {
    margin: 10,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: "#f6f8fa",
    borderRadius: 10, // Add border radius for rounded corners

  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: 340, height: 360
},
  cardText: {
    color: "#ffffff", // Text color for the text inside the card
  },
  buttonText: {
    color: "#ffffff", // Default text color for buttons
  },
  textinput:{
    margin: 0,
    backgroundColor: 'transparent', // Set the underline color to transparent
    color: 'white', // Set the text color to white
    placeholderTextColor: 'white', // Set the placeholder text color to white
  },
  card: {
    margin: 10,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: "#f6f8fa",
    borderRadius: 10, // Add border radius for rounded corners

  },
});
