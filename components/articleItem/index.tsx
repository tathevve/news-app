import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActiveTab, Article, RootStackParamList} from '../shared/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {styles} from './styles';
import {gridStyles} from './gridStyles';

enum EPath {
  HOME = 'Home',
  DETAILS = 'Details',
}

type DetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  EPath.DETAILS
>;

interface ArticleItemProps {
  article: Article;
  onSave: (article: Article) => void;
  onUnsave: (article: Article) => void;
  whichTab: ActiveTab;
}

const ArticleItem: React.FC<ArticleItemProps> = ({
  article,
  onSave,
  onUnsave,
  whichTab,
}) => {
  const navigation = useNavigation<DetailsScreenNavigationProp>();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const checkIfArticleIsSaved = async () => {
      try {
        const savedArticles = await AsyncStorage.getItem('savedArticles');
        const parsedArticles = savedArticles ? JSON.parse(savedArticles) : [];

        const isArticleSaved = parsedArticles.some(
          (item: Article) => item.id === article.id,
        );

        setSaved(isArticleSaved);
      } catch (error) {
        console.error('Failed to check if article is saved', error);
      }
    };

    checkIfArticleIsSaved();
  }, [article.id]);

  const handleSave = async () => {
    try {
      if (!saved) {
        await onSave(article);
        setSaved(true);
      } else {
        await onUnsave(article);
        setSaved(false);
      }
    } catch (error) {
      console.error('Error saving article:', error);
      Alert.alert('Error', 'Failed to save the article.');
    }
  };

  return (
    <>
      {whichTab === ActiveTab.LIST ? (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate(EPath.DETAILS, {article})}>
            {article.fields?.thumbnail && (
              <Image
                style={styles.image}
                source={{uri: article.fields.thumbnail}}
              />
            )}
            <View style={styles.textContainer}>
              <Text style={styles.category}>{article.sectionName}</Text>
              <Text style={styles.title}>{article.webTitle}</Text>
              <View style={styles.infoContainer}>
                <Text style={styles.date}>
                  {new Date(article.webPublicationDate).toDateString()}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.saveText}>{saved ? 'Unsave' : 'Save'}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={gridStyles.masonryItem}>
          <TouchableOpacity
            style={gridStyles.itemContainer}
            onPress={() => navigation.navigate(EPath.DETAILS, {article})}>
            {article.fields?.thumbnail && (
              <Image
                style={gridStyles.image}
                source={{uri: article.fields.thumbnail}}
                resizeMode="cover"
              />
            )}
            <View style={gridStyles.textContainer}>
              <Text style={gridStyles.category}>{article.sectionName}</Text>
              <Text style={gridStyles.title}>{article.webTitle}</Text>
              <View style={gridStyles.infoContainer}>
                <Text style={gridStyles.date}>
                  {new Date(article.webPublicationDate).toDateString()}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleSave}
              style={gridStyles.saveButton}>
              <Text style={gridStyles.saveText}>
                {saved ? 'Unsave' : 'Save'}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default ArticleItem;
