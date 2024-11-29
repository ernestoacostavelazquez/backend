import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PartesAlmacenService } from './partes_almacen.service';
import { CreatePartesAlmacenDto } from './dto/create-partes_almacen.dto';
import { UpdatePartesAlmacenDto } from './dto/update-partes_almacen.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('PartesAlmacen')
@Controller('PartesAlmacen')
export class PartesAlmacenController {
  constructor(private readonly partesAlmacenService: PartesAlmacenService) {}

  @Post()
  create(@Body() createPartesAlmacenDto: CreatePartesAlmacenDto) {
    return this.partesAlmacenService.create(createPartesAlmacenDto);
  }

  @Get()
  findAll() {
    return this.partesAlmacenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partesAlmacenService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePartesAlmacenDto: UpdatePartesAlmacenDto) {
    return this.partesAlmacenService.update(+id, updatePartesAlmacenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partesAlmacenService.remove(+id);
  }
}
