import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import CreateCreditCard from 'src/@core/application/use-cases/credit-card/create-credit-card';
import EditCreditCard from 'src/@core/application/use-cases/credit-card/edit-credit-card';
import GetCreditCard from 'src/@core/application/use-cases/credit-card/get-credit-card';
import RetrieveCreditCards from 'src/@core/application/use-cases/credit-card/retrieve-credit-cards';
import {
  CreateCreditCardDto,
  CreditCardDataToUpdate,
} from 'src/@core/domain/repositories/ICreditCardsRepository';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('credit-cards')
export class CreditCardsController {
  constructor(
    private readonly createCreditCard: CreateCreditCard,
    private readonly retrieveCreditCards: RetrieveCreditCards,
    private readonly getCreditCard: GetCreditCard,
    private readonly editCreditCard: EditCreditCard,
  ) {}

  @Post()
  async create(@Req() req, @Body() createCreditCardDto: CreateCreditCardDto) {
    const user_id = req.user.id;
    const createdCreditCard = await this.createCreditCard.execute({
      user_id,
      ...createCreditCardDto,
    });

    if (!createdCreditCard) {
      throw new BadRequestException(
        'Não foi possivle criar o cartão de crédito',
      );
    }
    return createdCreditCard;
  }

  @Get()
  findAll(@Req() req) {
    const user_id = req.user.id;
    return this.retrieveCreditCards.execute({ user_id });
  }

  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    const user_id = req.user.id;
    return this.getCreditCard.execute({ id, user_id });
  }

  @Patch(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() creditCardDataToUpdate: CreditCardDataToUpdate,
  ) {
    const user_id = req.user.id;
    return this.editCreditCard.execute({
      credit_card_id: id,
      user_id,
      dataToUpdate: creditCardDataToUpdate,
    });
  }

  // @Delete(':id')
  // remove(@Req() req, @Param('id') id: string) {
  //   const user_id = req.user.id;
  //   // return this.creditCardsService.remove(+id);
  // }
}
