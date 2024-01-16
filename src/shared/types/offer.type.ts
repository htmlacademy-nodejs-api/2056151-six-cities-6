import { Photo } from './photo.type.js';
import { typeOfOffer } from './typeOfOffer.js';
import { Facilities } from './facilities.type.js';
import { Coordinate } from './coordinate.type.js';
import { User } from './user.type.js';

export type Offer = {
    name: string;
    description: string;
    date: string;
    city: string;
    previewImage: string;
    photos: Photo;
    premium: boolean;
    favourites: boolean;
    rating: number;
    typeOfOffer: typeof typeOfOffer;
    numberOfRooms: number;
    numberOfGuests: number;
    price: number;
    facilities: Facilities;
    authorOfOffer: User;
    numberOfComments: number;
    coordinates: Coordinate
  };
