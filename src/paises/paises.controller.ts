// paises.controller.ts
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PaisesService } from './paises.service';
import { CreatePaisDto } from './dto/create-paise.dto';
import { UpdatePaisDto } from './dto/update-paise.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('Paises')
@Controller('Paises')
export class PaisesController {
  constructor(private readonly paisesService: PaisesService) {}

  @Post()
  create(@Body() createPaiseDto: CreatePaisDto) {
    return this.paisesService.create(createPaiseDto);
  }

  @Get()
  findAll() {
    return this.paisesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paisesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePaisDto: UpdatePaisDto) {
    return this.paisesService.update(+id, updatePaisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paisesService.remove(+id);
  }
}
