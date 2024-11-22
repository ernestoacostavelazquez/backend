import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ColoresInterioresService } from './colores-interiores.service';
import { CreateColoresInterioreDto } from './dto/create-colores-interiore.dto';
import { UpdateColoresInterioreDto } from './dto/update-colores-interiore.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('ColoresInteriores')
@Controller('ColoresInteriores')
export class ColoresInterioresController {
  constructor(private readonly coloresInterioresService: ColoresInterioresService) {}

  @Post()
  create(@Body() createColoresInterioreDto: CreateColoresInterioreDto) {
    return this.coloresInterioresService.create(createColoresInterioreDto);
  }

  @Get()
  findAll() {
    return this.coloresInterioresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coloresInterioresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColoresInterioreDto: UpdateColoresInterioreDto) {
    return this.coloresInterioresService.update(+id, updateColoresInterioreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coloresInterioresService.remove(+id);
  }
}
