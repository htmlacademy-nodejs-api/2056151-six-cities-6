import dayjs from 'dayjs';

import { OfferGenerator, WEEK_DAY, RATING, ROOMS,GUESTS, PRICE, COMMENTS } from './offerGenerator.interface.js';
import { MockServerData } from '../../types/index.js';
import {
  generateRandomValue,
  getRandomItem,
} from '../../helpers/index.js';

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const name = getRandomItem<string>(this.mockData.name);
    const description = getRandomItem<string>(this.mockData.description);
    const createdData = dayjs()
      .subtract(generateRandomValue(WEEK_DAY.FIRST_WEEK_DAY, WEEK_DAY.LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem<string>(this.mockData.city);

    const [nameOfHotel, previewImage, photos] = name.split(';');

    const premium = getRandomItem<string>(this.mockData.premium);
    const favourite = getRandomItem<string>(this.mockData.favourite);
    const rating = generateRandomValue(
      RATING.MIN_RATING,
      RATING.MAX_RATING,
      RATING.NUM_AFTER_DIGIT_FOR_RATING
    ).toString();
    const type = getRandomItem(this.mockData.type);

    const numberOfRooms = generateRandomValue(
      ROOMS.MIN_NUMBER_OF_ROOMS,
      ROOMS.MAX_NUMBER_OF_ROOMS
    ).toString();
    const numberOfGuests = generateRandomValue(
      GUESTS.MIN_NUMBER_OF_GUESTS,
      GUESTS.MAX_NUMBER_OF_GUESTS
    ).toString();
    const price = generateRandomValue(PRICE.MIN_PRICE, PRICE.MAX_PRICE).toString();
    const facilities = getRandomItem(this.mockData.facilities);
    const authorOfOffer = getRandomItem(this.mockData.authorOfOffer).toString();
    const numberOfComments = generateRandomValue(
      COMMENTS.MIN_NUMBER_OF_COMMENTS,
      COMMENTS.MAX_NUMBER_OF_COMMENTS
    ).toString();

    const [town, latitude, longitude] = city.split(' ');

    const coordinates = `${latitude} ${longitude}`;

    return [
      nameOfHotel,
      description,
      createdData,
      town,
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
    ].join('\t');
  }
}
