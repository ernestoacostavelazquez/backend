import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ColoresService } from './colores.service';
import { CreateColoreDto } from './dto/create-colore.dto';
import { UpdateColoreDto } from './dto/update-colore.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('Colores')
@Controller('Colores')
export class ColoresController {
  constructor(private readonly coloresService: ColoresService) {}

  @Post()
  create(@Body() createColoreDto: CreateColoreDto) {
    return this.coloresService.create(createColoreDto);
  }

  @Get()
  findAll() {
    return this.coloresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coloresService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateColoreDto: UpdateColoreDto) {
    return this.coloresService.update(+id, updateColoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coloresService.remove(+id);
  }
}
