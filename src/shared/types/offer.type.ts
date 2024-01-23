import { TypeOfOffer } from './typeOfOffer.enum.js';
import { Facilities } from './facilities.type.js';
import { User } from './user.type.js';

export type Offer = {
  name: string;
  description: string;
  createdDate: string;
  city: string;
  previewImage: string;
  photos: string;
  premium: boolean;
  favourite: boolean;
  rating: number;
  type: TypeOfOffer;
  numberOfRooms: number;
  numberOfGuests: number;
  price: number;
  facilities: Facilities[];
  authorOfOffer: User[];
  numberOfComments: number;
  coordinates: string;
};
