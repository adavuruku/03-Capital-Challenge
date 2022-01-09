import { Module } from '@nestjs/common';
import { ContactService } from './service/contact.service';
import { ContactController } from './controller/contact.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactSchema } from './schema/contact.schema';
import { ContactRepository } from './repository/contact.repository';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
  ],
  providers: [
    {
      provide: 'ContactRepositoryInterface',
      useClass: ContactRepository,
    },
    {
      provide: 'ContactServiceInterface',
      useClass: ContactService,
    },
  ],
  controllers: [ContactController],
  exports: [],
})
export class ContactModule {}
