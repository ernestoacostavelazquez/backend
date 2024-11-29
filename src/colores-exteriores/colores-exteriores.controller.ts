import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ColoresExterioresService } from './colores-exteriores.service';
import { CreateColoresExterioreDto } from './dto/create-colores-exteriore.dto';
import { UpdateColoresExterioreDto } from './dto/update-colores-exteriore.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('ColoresExteriores')
@Controller('ColoresExteriores')
export class ColoresExterioresController {
  constructor(private readonly coloresExterioresService: ColoresExterioresService) {}

  @Post()
  create(@Body() createColoresExterioreDto: CreateColoresExterioreDto) {
    return this.coloresExterioresService.create(createColoresExterioreDto);
  }

  @Get()
  findAll() {
    return this.coloresExterioresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coloresExterioresService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateColoresExterioreDto: UpdateColoresExterioreDto) {
    return this.coloresExterioresService.update(+id, updateColoresExterioreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coloresExterioresService.remove(+id);
  }
}
