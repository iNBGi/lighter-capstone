import{ StyleSheet } from "react-native";

export const loginStyle = StyleSheet.create({
    content: {
        display: "flex",
        flex: 1,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        backgroundColor:"#ffffff"
    },
    view: {
        width: "80%"
    },
    cardTitle: {
        color: "#9caea9"
    },
    card: {
        padding: 10,
        backgroundColor: "#1f1f1f",
        borderRadius: 10, // Add border radius for rounded corners
      },
    cardButton: {
        margin: 2,
        marginLeft: 0,
        marginRight: 0,
        backgroundColor:"#505a7b"
    },
    
    
})