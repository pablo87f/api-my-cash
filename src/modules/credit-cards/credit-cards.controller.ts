import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import CreateCreditCard from 'src/@core/application/use-cases/credit-card/create-credit-card';
import RetrieveCreditCards from 'src/@core/application/use-cases/credit-card/retrieve-credit-cards';
import { CreateCreditCardDto } from 'src/@core/domain/repositories/ICreditCardsRepository';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('credit-cards')
export class CreditCardsController {
  constructor(
    private readonly createCreditCard: CreateCreditCard,
    private readonly retrieveCreditCards: RetrieveCreditCards,
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
    // return this.creditCardsRepository.find({ id, user_id });
  }

  @Patch(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateCreditCardDto: any,
  ) {
    const user_id = req.user.id;
    // return this.creditCardsService.update(+id, updateCreditCardDto);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    const user_id = req.user.id;
    // return this.creditCardsService.remove(+id);
  }
}
