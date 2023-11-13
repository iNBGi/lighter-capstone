import{ StyleSheet } from "react-native";


export const Aboutstyle = StyleSheet.create({
    content: {
      padding: 0,
        flex: 1,
        backgroundColor: "#1b1e31",
      },
      
        top: {
          flex: .2,
          borderWidth: 10,
          borderColor: "#2f2d26",
        },
        bottom: {
          flex: .8,
          
        },
        card:{
          flexDirection:"row",
          backgroundColor:"#1f1f1f"

           },
      image: {
        flex: 1,
        justifyContent: "center",
        width: 340, height: 360
      },
    view: {
        width: "100%"
    },
    cardTitle: {
      textAlign: 'center',
        color: "#2f2d26"
    },
    titleText: {
      marginBottom:15,
      borderRadius: 0,
      backgroundColor: "#FFFFFF",
      color: "#242F9B",
      textAlign: "center",
      padding:10,
      fontSize: 20,
      
    },
    button: {
      color: "#ffffff", // Set the text color for all buttons
    },
        Text: {
          marginTop: 16,
          padding: 8,
          borderWidth: 4,
          borderColor: "#20232a",
          borderRadius: 1,
          backgroundColor: "#ECE5C7",
          height: 70,
          textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
      },
      button:{
        
        justifyContent: 'center',
        alignItems: 'center',
        color: "#ffffff",


      },
    cardButton: {
        margin: 1,
        
      
    },
    card1:{
      padding: 0,
      margin:15,
      backgroundColor: '#1b1e31', // Adjust the alpha value as needed

    },
    
})