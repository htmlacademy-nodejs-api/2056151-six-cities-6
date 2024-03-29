import { CreateOfferDto, UpdateOfferDto } from './dto/index.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';

export interface OfferService {
    create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
    findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
    find(): Promise<DocumentType<OfferEntity>[]>;
    deleteById(offerId:string): Promise<DocumentType<OfferEntity>| null>;
    updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
    getOfferById(userId: string,offerId: string) : Promise<DocumentType<OfferEntity> | null>;
    updateRatingAndCommentCount(offerId: string, newRating: number): Promise<DocumentType<OfferEntity> | null>;
    getPremiumOfferForCity(userId: string, city: string, limit?: number): Promise<DocumentType<OfferEntity>[]>;
    getFavouriteOffersByUser(userId: string): Promise<DocumentType<OfferEntity> []>;
    exists(documentId: string): Promise<boolean>;
}
