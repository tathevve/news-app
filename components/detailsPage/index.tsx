import React, {useState} from 'react';
import {Linking} from 'react-native';
import {Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {Article, DetailsScreenRouteProp} from '../shared/types';
import {styles} from './styles';

const MAX_NUMBER_LINES = 5;

const ArticleDetails = ({route}: {route: DetailsScreenRouteProp}) => {
  const {article} = route.params;

  const typedArticle = article as Article;

  const [isExpanded, setIsExpanded] = useState(false);

  const handleSeeMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{typedArticle.webTitle}</Text>
      <Text style={styles.date}>
        {new Date(typedArticle.webPublicationDate).toDateString()}
      </Text>

      <Text style={styles.section}>{typedArticle.sectionName}</Text>

      {article.fields?.thumbnail && (
        <>
          <Image
            style={styles.image}
            source={{uri: article.fields.thumbnail}}
          />
          <Text
            style={styles.bodyText}
            numberOfLines={isExpanded ? undefined : MAX_NUMBER_LINES}>
            {article.fields.bodyText}
          </Text>
        </>
      )}

      <TouchableOpacity onPress={handleSeeMore}>
        <Text style={styles.readMoreText}>
          {isExpanded ? 'See Less' : 'See More'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL(typedArticle.webUrl)}>
        <Text style={styles.buttonText}>
          Read the full article on The Guardian
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ArticleDetails;
