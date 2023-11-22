import {ImagesAssets} from './assets/picture/icons/ImageAssets';

export enum Status {
  important = 'important',
  inforamation = 'inforamation',
}

export type TServiceItem = {
  id: number;
  nameService: string;
  imgSrc: keyof typeof ImagesAssets;
};
