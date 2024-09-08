import React, {useState, useEffect, useCallback} from 'react';
import {FlatList, View, Text, TextInput, Alert, Pressable} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import ArticleItem from '../articleItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {ActiveTab, Article} from '../shared/types';
import {getArticles} from '../shared/models';
import {styles} from './styles';

const NewsList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isOffline, setIsOffline] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.LIST);

  const fetchArticles = async (page: number) => {
    try {
      const newArticles = await getArticles(page);

      setArticles(prevArticles => {
        const existingArticleIds = new Set(
          prevArticles.map(article => article.id),
        );
        const updatedArticles = [
          ...prevArticles,
          ...newArticles.filter(
            (article: Article) => !existingArticleIds.has(article.id),
          ),
        ];
        return updatedArticles;
      });

      setFilteredArticles(prevFilteredArticles => {
        const existingFilteredArticleIds = new Set(
          prevFilteredArticles.map(article => article.id),
        );
        const updatedFilteredArticles = [
          ...prevFilteredArticles,
          ...newArticles.filter(
            (article: Article) => !existingFilteredArticleIds.has(article.id),
          ),
        ];
        return updatedFilteredArticles;
      });

      setHasMore(newArticles.length > 0);
    } catch (err) {
      setError('Failed to load articles');
    }
  };

  useEffect(() => {
    fetchArticles(page);
  }, [page]);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = NetInfo.addEventListener(state => {
        setIsOffline(!state.isConnected);
      });

      return () => {
        unsubscribe();
        setSearchQuery('');
        setIsOffline(false);
      };
    }, []),
  );

  useEffect(() => {
    const filterArticles = async () => {
      if (isOffline) {
        try {
          const savedArticles = await AsyncStorage.getItem('savedArticles');
          const parsedArticles = savedArticles ? JSON.parse(savedArticles) : [];
          setFilteredArticles(parsedArticles);
        } catch (error) {
          console.error('Failed to load saved articles', error);
        }
      } else {
        if (searchQuery.trim()) {
          const filtered = articles.filter(item =>
            item.webTitle.toLowerCase().includes(searchQuery.toLowerCase()),
          );
          setFilteredArticles(filtered);
        } else {
          setFilteredArticles(articles);
        }
      }
    };

    filterArticles();
  }, [isOffline, searchQuery, articles]);

  const handleChange = (e: {nativeEvent: {text: string}}) => {
    setSearchQuery(e.nativeEvent.text);
  };

  const handleLoadMore = () => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleSaveArticle = async (article: Article) => {
    try {
      const savedArticles = await AsyncStorage.getItem('savedArticles');
      const parsedArticles = savedArticles ? JSON.parse(savedArticles) : [];

      const isArticleSaved = parsedArticles.some(
        (item: Article) => item.id === article.id,
      );

      if (!isArticleSaved) {
        parsedArticles.push(article);
        await AsyncStorage.setItem(
          'savedArticles',
          JSON.stringify(parsedArticles),
        );
      } else {
        Alert.alert('Info', 'This article is already saved.');
      }
    } catch (error) {
      console.error('Error saving article:', error);
      Alert.alert('Error', 'Failed to save the article.');
    }
  };

  const handleUnsaveArticle = async (article: Article) => {
    try {
      const savedArticles = await AsyncStorage.getItem('savedArticles');
      const parsedArticles = savedArticles ? JSON.parse(savedArticles) : [];

      const updatedArticles = parsedArticles.filter(
        (item: Article) => item.id !== article.id,
      );

      await AsyncStorage.setItem(
        'savedArticles',
        JSON.stringify(updatedArticles),
      );
    } catch (error) {
      console.error('Error removing article:', error);
      Alert.alert('Error', 'Failed to remove the article.');
    }
  };

  if (error) {
    return (
      <View style={styles.error}>
        <Text>{error}</Text>
      </View>
    );
  }

  const renderItem = (item: Article) => {
    return activeTab === ActiveTab.LIST ? (
      <ArticleItem
        article={item}
        onSave={handleSaveArticle}
        onUnsave={handleUnsaveArticle}
        whichTab={ActiveTab.LIST}
      />
    ) : (
      <ArticleItem
        article={item}
        onSave={handleSaveArticle}
        onUnsave={handleUnsaveArticle}
        whichTab={ActiveTab.GRID}
      />
    );
  };

  return (
    <>
      <View style={styles.searchContainer}>
        <View style={styles.tabs}>
          <Pressable
            onPress={() => setActiveTab(ActiveTab.LIST)}
            style={[
              styles.tabButton,
              activeTab === ActiveTab.LIST ? styles.activeTab : {},
            ]}>
            <Text style={styles.tabButtonText}>List</Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab(ActiveTab.GRID)}
            style={[
              styles.tabButton,
              activeTab === ActiveTab.GRID ? styles.activeTab : {},
            ]}>
            <Text style={styles.tabButtonText}>Grid</Text>
          </Pressable>
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="gray"
          value={searchQuery}
          onChange={handleChange}
        />
      </View>
      {filteredArticles.length > 0 ? (
        <FlatList
          data={filteredArticles}
          keyExtractor={item => item.id}
          renderItem={({item}: {item: Article}) => renderItem(item)}
          onMomentumScrollEnd={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      ) : (
        <View style={styles.notFound}>
          <Text>Not Found</Text>
        </View>
      )}
    </>
  );
};

export default NewsList;
