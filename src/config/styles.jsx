import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: 'rgb(48 169 223)',
  },
  innerContainer: {
    padding: 20,
  },
  selfCenter: {
    alignSelf: "center",
  },
});

const styles2 = StyleSheet.create({
  container: {
    flexDirection: 'row', // Organiza os botões em uma linha horizontal
    justifyContent: 'space-between', // Distribui os botões igualmente na linha
    alignItems: 'center', // Centraliza os botões verticalmente
    padding: 10,
  },
  button: {
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'black',
  },
}); 



export default styles;
export { styles2 };