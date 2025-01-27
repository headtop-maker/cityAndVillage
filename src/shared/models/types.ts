import {TImageResponse} from '../../entities/News/models/types';

export interface CounterState {
  value: number;
  news: {
    id: string;
    createdAt: Date;
    title?: string;
    description?: string;
    image?: string;
    author: string;
  }[];
  appInFiles: string;
  currentAppVersion: string;
  isNewVersion: boolean;
  currentNewsId: string;
  important: {
    id: string;
    createdAt: Date;
    title: string;
    description: string;
    isImportant: boolean;
    recipient: string;
    imageBase64?: string;
    author: string;
    authorName: string;
  }[];
  imageForNewsFromServer: TImageResponse['photos'];
  actionState: {
    loadind: boolean;
    error: string | undefined;
    modalText: string;
    showIndicator: boolean;
  };
  fireBaseTokenAdded: boolean;
  banner: {
    text: string;
    icon: string;
    visible: boolean;
  };

  allUsers: {
    id: number;
    name: string;
    email: string;
    banned: boolean;
    userRole: userRole;
  }[];

  currentUser:
    | {
        userName: string;
        userEmail: string;
        userToken: string;
        role: userRole;
      }
    | undefined;
}

export enum userRole {
  admin = 'admin',
  simpleUser = 'simpleUser',
  worker = 'worker',
}

export type ServiceTitleItem = {
  id: string;
  categoryName: string;
  description: string;
};
export type ServiceTitle = ServiceTitleItem[] | undefined;

export interface IServices {
  response: {
    phone: string;
    email: string;
    categoryName: string;
    title: string;
    description: string;
    image: string;
    id: string;
  }[];
}

export type ImportantContact = {
  id: string;
  contactName: string;
  contacts: string[];
};

export type TDocuments = {
  id: string;
  documentTitle: string;
  filePath: string;
  createdAt: Date;
}[];

export type IAppVersion = {
  id: string;
  currentVersion: string;
  description: string[];
};

export type PrepareAds = {
  phone: string;
  email: string;
  categoryName: string;
  title: string;
  description: string;
  image: string;
};

export type GetPrepareAds = {
  id: string;
  phone: string;
  email: string;
  categoryName: string;
  title: string;
  description: string;
  image: string;
}[];
