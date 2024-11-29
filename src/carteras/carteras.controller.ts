import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CarterasService } from './carteras.service';
import { CreateCarteraDto } from './dto/create-cartera.dto';
import { UpdateCarteraDto } from './dto/update-cartera.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('Carteras')
@Controller('Carteras')
export class CarterasController {
  constructor(private readonly carterasService: CarterasService) {}

  @Post()
  create(@Body() createCarteraDto: CreateCarteraDto) {
    return this.carterasService.create(createCarteraDto);
  }

  @Get()
  findAll() {
    return this.carterasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carterasService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCarteraDto: UpdateCarteraDto) {
    return this.carterasService.update(+id, updateCarteraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carterasService.remove(+id);
  }
}
