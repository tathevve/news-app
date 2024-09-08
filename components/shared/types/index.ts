import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Details: {article: Article};
};
export type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

export interface Article {
  id: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  fields: {
    thumbnail: string;
    bodyText: string;
  };
}

export enum ActiveTab {
  LIST = 'list',
  GRID = 'grid',
}
