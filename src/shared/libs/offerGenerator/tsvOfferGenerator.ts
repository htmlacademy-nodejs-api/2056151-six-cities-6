import dayjs from 'dayjs';

import { OfferGenerator } from './offerGenerator.interface.js';
import { MockServerData } from '../../types/index.js';
import {
  generateRandomValue,
  getRandomItem,
} from '../../helpers/index.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_RATING = 0;
const MAX_RATING = 5;
const NUM_AFTER_DIGIT_FOR_RATING = 1;

const MIN_NUMBER_OF_ROOMS = 1;
const MAX_NUMBER_OF_ROOMS = 5;

const MIN_NUMBER_OF_GUESTS = 1;
const MAX_NUMBER_OF_GUESTS = 10;

const MIN_PRICE = 500;
const MAX_PRICE = 2000;

const MIN_NUMBER_OF_COMMENTS = 1;
const MAX_NUMBER_OF_COMMENTS = 1000;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const name = getRandomItem<string>(this.mockData.name);
    const description = getRandomItem<string>(this.mockData.description);
    const createdData = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem<string>(this.mockData.city);

    const [nameOfHotel, previewImage, photos] = name.split(';');

    const premium = getRandomItem<string>(this.mockData.premium);
    const favourite = getRandomItem<string>(this.mockData.favourite);
    const rating = generateRandomValue(
      MIN_RATING,
      MAX_RATING,
      NUM_AFTER_DIGIT_FOR_RATING
    ).toString();
    const type = getRandomItem(this.mockData.type);

    const numberOfRooms = generateRandomValue(
      MIN_NUMBER_OF_ROOMS,
      MAX_NUMBER_OF_ROOMS
    ).toString();
    const numberOfGuests = generateRandomValue(
      MIN_NUMBER_OF_GUESTS,
      MAX_NUMBER_OF_GUESTS
    ).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const facilities = getRandomItem(this.mockData.facilities);
    const authorOfOffer = getRandomItem(this.mockData.authorOfOffer).toString();
    // const authorOfOffer;
    const numberOfComments = generateRandomValue(
      MIN_NUMBER_OF_COMMENTS,
      MAX_NUMBER_OF_COMMENTS
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
