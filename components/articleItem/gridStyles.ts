import {StyleSheet} from 'react-native';

export const gridStyles = StyleSheet.create({
  masonryItem: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
  },
  itemContainer: {
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  textContainer: {
    marginTop: 10,
  },
  category: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'gray',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  infoContainer: {
    marginTop: 5,
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  saveButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  saveText: {
    fontSize: 14,
    color: '#007BFF',
  },
});
