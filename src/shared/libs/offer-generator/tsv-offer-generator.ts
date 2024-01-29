import dayjs from 'dayjs';

import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData, TypeOfOffer } from '../../types/index.js';
import {
  generateRandomValue,
  getRandomItems,
  getRandomItem,
} from '../../helpers/index.js';

const MIN_PRICE = 500;
const MAX_PRICE = 2000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const categories = getRandomItems<string>(
      this.mockData.categories
    ).join(';');

    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const photo = getRandomItem<string>(this.mockData.offerImages);
    const type = getRandomItem([
      TypeOfOffer.apartment,
      TypeOfOffer.hotel,
      TypeOfOffer.house,
      TypeOfOffer.room,
    ]);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const author = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatar = getRandomItem<string>(this.mockData.avatars);

    const createdData = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    const [firstname, lastname] = author.split(' ');

    return [
      title,
      description,
      createdData,
      photo,
      type,
      price,
      categories,
      firstname,
      lastname,
      email,
      avatar,
    ].join('\t');
  }
}

