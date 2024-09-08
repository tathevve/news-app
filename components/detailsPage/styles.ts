import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 15,
  },

  date: {
    fontSize: 14,
    color: '#868e96',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  bodyText: {
    fontSize: 16,
    color: '#343a40',
    lineHeight: 24,
  },
  section: {
    fontSize: 16,
    color: '#868e96',
    marginBottom: 25,
  },
  button: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 56,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
  readMoreText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
