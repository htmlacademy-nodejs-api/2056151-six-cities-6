import { Offer, TypeOfOffer } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    name,
    description,
    createdDate,
    city,
    previewImage,
    photos,
    premium,
    favourite,
    rating,
    type,
    numberOfRooms,
    numberOfGuests,
    price,
    facilities,
    authorOfOffer,
    numberOfComments,
    coordinates,
  ] = offerData.replace('\n', '').split('\t');

  return {
    name,
    description,
    createdDate,
    city,
    previewImage,
    photos,
    premium: JSON.parse(premium),
    favourite: JSON.parse(favourite),
    rating: Number.parseFloat(rating),
    type: TypeOfOffer[type as 'apartment' | 'house' | 'room' | 'hotel'],
    numberOfRooms: Number.parseInt(numberOfRooms, 10),
    numberOfGuests: Number.parseInt(numberOfGuests, 10),
    price: Number.parseInt(price, 10),
    facilities: facilities.split(','),
    authorOfOffer: [authorOfOffer.split(' ')].map(
      ([username, email, password, avatarUrl, isPro]) => ({
        username,
        email,
        password,
        avatarUrl,
        isPro: JSON.parse(isPro),
      })
    ),
    numberOfComments: Number.parseInt(numberOfComments, 10),
    coordinates,
  };
}
