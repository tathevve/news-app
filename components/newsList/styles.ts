import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
  },
  offlineMessage: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#D3D3D3',
  },
  notFound: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  tabButton: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: 'darkgray',
  },
  tabButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
  masonryItem: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
});
