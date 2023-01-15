import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import CreateCreditCard from 'src/@core/application/use-cases/credit-card/create-credit-card';
import RetrieveCreditCards from 'src/@core/application/use-cases/credit-card/retrieve-credit-cards';
import { CreateCreditCardDto } from 'src/@core/domain/repositories/ICreditCardsRepository';
import loggedUser from '../loggedUser';

const user_id = loggedUser.id;

@Controller('auth')
export class AuthController {
  constructor(
    private readonly createCreditCard: CreateCreditCard,
    private readonly retrieveCreditCards: RetrieveCreditCards,
  ) {}

  @Post()
  create(@Body() createCreditCardDto: CreateCreditCardDto) {
    return this.createCreditCard.execute({ user_id, ...createCreditCardDto });
  }

  @Get()
  findAll() {
    return this.retrieveCreditCards.execute({ user_id });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.creditCardsRepository.find({ id, user_id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCreditCardDto: any) {
    // return this.creditCardsService.update(+id, updateCreditCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.creditCardsService.remove(+id);
  }
}
