import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude, Transform, Expose } from 'class-transformer';

export type ContactDocument = Contact & Document;

@Schema()
export class Contact {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  @Exclude()
  password: string;

  @Prop({ required: true })
  @Exclude()
  verificationCode: string;

  @Prop({ default: false })
  @Exclude()
  accountVerified: boolean;

  @Prop({ required: true })
  @Exclude()
  accountVerifiedExpire: Date;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}
export const ContactSchema = SchemaFactory.createForClass(Contact);
