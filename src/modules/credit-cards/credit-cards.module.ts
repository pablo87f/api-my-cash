import { Module } from '@nestjs/common';
import CreateCreditCard from 'src/@core/application/use-cases/credit-card/create-credit-card';
import EditCreditCard from 'src/@core/application/use-cases/credit-card/edit-credit-card';
import GetCreditCard from 'src/@core/application/use-cases/credit-card/get-credit-card';
import RetrieveCreditCards from 'src/@core/application/use-cases/credit-card/retrieve-credit-cards';
import PrismaCreditCardsRepository from 'src/@core/domain/infra/repositories/PrismaOrm/prisma-credit-cards-repository';
import ICreditCardsRepository from 'src/@core/domain/repositories/ICreditCardsRepository';
import { DbService } from 'src/database/db.service';
import { CreditCardsController } from './credit-cards.controller';

@Module({
  controllers: [CreditCardsController],
  providers: [
    DbService,
    {
      provide: PrismaCreditCardsRepository,
      useFactory: (db: DbService) => {
        return new PrismaCreditCardsRepository(db);
      },
      inject: [DbService],
    },
    {
      provide: CreateCreditCard,
      useFactory: (creditCardsRepository: ICreditCardsRepository) => {
        return new CreateCreditCard(creditCardsRepository);
      },
      inject: [PrismaCreditCardsRepository],
    },
    {
      provide: RetrieveCreditCards,
      useFactory: (creditCardsRepository: ICreditCardsRepository) => {
        return new RetrieveCreditCards(creditCardsRepository);
      },
      inject: [PrismaCreditCardsRepository],
    },
    {
      provide: GetCreditCard,
      useFactory: (creditCardsRepository: ICreditCardsRepository) => {
        return new GetCreditCard(creditCardsRepository);
      },
      inject: [PrismaCreditCardsRepository],
    },
    {
      provide: EditCreditCard,
      useFactory: (
        creditCardsRepository: ICreditCardsRepository,
        getCreditCard: GetCreditCard,
      ) => {
        return new EditCreditCard(creditCardsRepository, getCreditCard);
      },
      inject: [PrismaCreditCardsRepository, GetCreditCard],
    },
  ],
})
export class CreditCardsModule {}
