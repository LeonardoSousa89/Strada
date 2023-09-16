import { StyleSheet, Text, View } from 'react-native'

export default function Welcome() {
  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
      <Text>this is animation screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
