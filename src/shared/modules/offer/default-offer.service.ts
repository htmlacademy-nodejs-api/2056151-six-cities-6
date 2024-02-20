import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { DEFAULT_OFFER_COUNT } from './offer.constant.js';
import { Types, PipelineStage } from 'mongoose';
import { averageRating } from '../../helpers/index.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.name}`);

    return result;
  }

  public async findById(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find().populate(['userId']).exec();
  }

  public async deleteById(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate(['userId'])
      .exec();
  }

  public async getOfferById(
    userId: string,
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    const offerObjectId = new Types.ObjectId(offerId);

    const pipeline = [
      { $match: { _id: offerObjectId } },
      ...this.addFavoritePipeline(userId),
      {
        $lookup: {
          from: 'users',
          localField: 'authorOfOfferId',
          foreignField: '_id',
          as: 'authorOfOffer',
        },
      },
      { $unwind: '$authorOfOffer' },
      { $limit: 1 },
    ];

    const results = await this.offerModel.aggregate(pipeline).exec();

    if (results.length > 0) {
      this.logger.info(`Offer with ID ${offerId} found`);
      return results[0];
    } else {
      this.logger.warn(`Offer with ID ${offerId} not found`);
      return null;
    }
  }

  public async updateRatingAndCommentCount(
    offerId: string,
    newRating: number
  ): Promise<DocumentType<OfferEntity> | null> {
    const offer = await this.offerModel.findById(offerId);

    if (!offer) {
      throw new Error('Offer not found');
    }

    const newAverageRating = averageRating(
      offer.rating,
      offer.numberOfComments,
      newRating
    );

    return this.offerModel
      .findByIdAndUpdate(
        offerId,
        {
          $set: { rating: newAverageRating },
          $inc: { numberOfComments: 1 },
        },
        { new: true }
      )
      .exec();
  }

  public async getPremiumOfferForCity(
    userId: string,
    city: string,
    limit: number = DEFAULT_OFFER_COUNT
  ): Promise<DocumentType<OfferEntity>[]> {
    try {
      const offers = await this.offerModel
        .aggregate([
          { $match: { city, isPremium: true } },
          { $sort: { createdAt: SortType.Down } },
          { $limit: limit },
          ...this.addFavoritePipeline(userId),
          {
            $lookup: {
              from: 'users',
              localField: 'authorOfOfferId',
              foreignField: '_id',
              as: 'authorOfOfferId',
            },
          },
          { $unwind: '$authorOfOfferId' },
          {
            $project: {
              name: 1,
              description: 1,
              createdDate: 1,
              city: 1,
              previewImage: 1,
              photos: 1,
              premium: 1,
              favourite: 1,
              rating: 1,
              type: 1,
              numberOfRooms: 1,
              numberOfGuests: 1,
              price: 1,
              facilities: 1,
              authorOfOffer: 1,
              numberOfComments: 1,
              coordinates: 1,
            },
          },
        ])
        .exec();
      this.logger.info(`Получены премиум оффера для ${city}`);
      return offers;
    } catch (error) {
      this.logger.error('Ошибка получения данных:', error as Error);
      throw error;
    }
  }

  public async getFavouriteOffersByUser(
    userId: string
  ): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate([
        { $match: { isFavorite: true } },
        { $sort: { createdAt: SortType.Down } },
        ...this.addFavoritePipeline(userId),
        {
          $lookup: {
            from: 'users',
            localField: 'authorOfOfferId',
            foreignField: '_id',
            as: 'authorOfOfferId',
          },
        },
        { $unwind: '$authorOfOfferId' },
        {
          $project: {
            name: 1,
            description: 1,
            createdDate: 1,
            city: 1,
            previewImage: 1,
            photos: 1,
            premium: 1,
            favourite: 1,
            rating: 1,
            type: 1,
            numberOfRooms: 1,
            numberOfGuests: 1,
            price: 1,
            facilities: 1,
            authorOfOffer: 1,
            numberOfComments: 1,
            coordinates: 1,
          },
        },
      ])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: documentId })) !== null;
  }

  private addFavoritePipeline(userId: string): PipelineStage[] {
    const userIdObj = new Types.ObjectId(userId);

    return [
      {
        $lookup: {
          from: 'users',
          let: { offerId: '$_id' },
          pipeline: [
            { $match: { _id: userIdObj } },
            { $project: { favouriteOffers: 1 } },
            { $unwind: '$favouriteOffers' },
            { $match: { favouriteOffers: { $eq: '$$offerId' } } },
          ],
          as: 'isFavoriteArray',
        },
      },
      {
        $addFields: {
          isFavorite: { $gt: [{ $size: '$isFavouriteArray' }, 0] },
        },
      },
      { $unset: 'isFavouriteArray' },
    ];
  }
}
