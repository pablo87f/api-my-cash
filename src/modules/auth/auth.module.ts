import { Module } from '@nestjs/common';

@Module({})
export class AuthModule {}

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
  ],
})
export class AuthModule {}
