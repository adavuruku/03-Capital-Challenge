import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude, Transform, Expose, Type } from 'class-transformer';
import * as mongoose from 'mongoose';
import { User } from '../../user/schema/user.schema';

export type ContactDocument = Contact & Document;

@Schema()
export class Contact {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, minlength: 3 })
  fullName: string;

  @Prop({ required: true, minlength: 11 })
  phoneNumber: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  @Exclude()
  user: User;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}
export const ContactSchema = SchemaFactory.createForClass(Contact);
