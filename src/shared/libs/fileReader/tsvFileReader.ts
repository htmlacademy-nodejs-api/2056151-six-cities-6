import { FileReader } from './fileReader.interface.js';
import { readFileSync } from 'node:fs';
import { Offer, TypeOfOffer } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, {
      encoding: 'utf-8',
    });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not found');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(
        ([
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
        ]) => ({
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
        })
      );
  }
}
