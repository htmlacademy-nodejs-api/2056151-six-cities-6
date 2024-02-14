import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { TypeOfOffer, Cities } from '../../types/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public name!: string;

  @prop({ trim: true, required: true })
  public description!: string;

  @prop({ trim: true, required: true })
  public createdDate!: string;

  @prop({ type: () => String, enum: Cities })
  public city!: Cities;

  @prop({ trim: true, required: true })
  public previewImage!: string;

  @prop({ trim: true, required: true })
  public photos!: string;

  @prop({ required: true })
  public premium!: boolean;

  @prop({ required: true })
  public favourite!: boolean;

  @prop({required: true, min: 0, max: 5})
  public rating!: number;

  @prop({
    required: true,
    type: () => String,
    enum: TypeOfOffer,
  })
  public type!: TypeOfOffer;

  @prop({required: true, min: 1, max: 5})
  public numberOfRooms!: number;

  @prop({required: true, min: 1, max: 10})
  public numberOfGuests!: number;

  @prop({required: true, min: 500, max: 10000})
  public price!: number;

  @prop({required: true, type: () => [String]})
  public facilities!: string[];

  @prop({required: true, min: 1, max: 1000})
  public numberOfComments!: number;

  @prop({required: true})
  public coordinates!: string;
}

export const OfferModel = getModelForClass(OfferEntity);
