import SCREENS from './screens';

export type IRouteParamList = {
  [SCREENS.TabScreen]: undefined;
  [SCREENS.MainScreen]: undefined;
  [SCREENS.SettingsScreen]: undefined;
  [SCREENS.NewsScreen]: undefined;
  [SCREENS.ImportantScreen]: undefined;
  [SCREENS.AddContentScreen]: undefined;
  [SCREENS.CurrentNewsScreen]: undefined;
  [SCREENS.LoginScreen]: undefined;
  [SCREENS.RegistrationScreen]: undefined;
};

export type KeyScreen = keyof IRouteParamList;

export enum LinkingNav {
  message = 'message',
  news = 'news',
}
