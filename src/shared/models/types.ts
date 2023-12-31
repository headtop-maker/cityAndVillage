import {TImageResponse} from '../../entities/News/models/types';

export interface CounterState {
  value: number;
  news: {
    id: string;
    createdAt: Date;
    title: string;
    description: string;
    image: string;
    author: string;
  }[];
  currentNewsId: string;
  important: {
    id: string;
    createdAt: Date;
    title: string;
    description: string;
    isImportant: boolean;
  }[];
  imageForNewsFromServer: TImageResponse['photos'];
  actionState: {
    loadind: boolean;
    error: string | undefined;
    modalText: string;
    showIndicator: boolean;
  };
  allUsers:
    | {
        id: number;
        name: string;
        email: string;
        banned: boolean;
        userRole: userRole;
      }[]
    | undefined;
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
