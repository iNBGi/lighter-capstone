import{ StyleSheet } from "react-native";


export const Menustyle = StyleSheet.create({
    content: {
      padding: 0,
        flex: 1,
        backgroundColor: "#1b1e31",
      },
      
      
        top: {
          flex: .2,
          borderWidth: 10,
          borderColor: "#6684a1",
        },
        bottom: {
          flex: .8,
          
        },
        card:{
          padding: 5,
          flexDirection:"row",
          backgroundColor:"#454545"
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
        color: "#33b535"
    },
    titleText: {
     
      marginBottom:15,
      borderRadius: 0,
      backgroundColor: "#1b1e31",
      color: "#242F9B",
      textAlign: "center",
      padding:10,
      fontSize: 20,
    },
        Text: {
          marginTop: 16,
          paddingVertical: 8,
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
        alignItems: 'center'
      },
      cardcover:{
        
      },
      card1:{
        padding: 0,
        margin:20,
      },
      card2:{
        padding: 0,
        margin:20,
        marginBottom:150
      },
      card3:{
        padding: 0,
        margin:20,
        marginBottom:100,
        backgroundColor: "#1b1e31",

      },
    cardButton: {
        margin: 1,
      
    }
    
})