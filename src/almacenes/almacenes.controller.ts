import { Controller, Get, Post, Body,Param, Delete, Put } from '@nestjs/common';
import { AlmacenesService } from './almacenes.service';
import { CreateAlmaceneDto } from './dto/create-almacene.dto';
import { UpdateAlmaceneDto } from './dto/update-almacene.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('Almacenes')
@Controller('Almacenes')
export class AlmacenesController {
  constructor(private readonly almacenesService: AlmacenesService) {}

  @Post()
  create(@Body() createAlmaceneDto: CreateAlmaceneDto) {
    return this.almacenesService.create(createAlmaceneDto);
  }

  @Get()
  findAll() {
    return this.almacenesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.almacenesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlmaceneDto: UpdateAlmaceneDto) {
    return this.almacenesService.update(+id, updateAlmaceneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.almacenesService.remove(+id);
  }
}
