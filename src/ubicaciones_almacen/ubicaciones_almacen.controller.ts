import { Controller, Get, Post, Body,Param, Delete, Put } from '@nestjs/common';
import { UbicacionesAlmacenService } from './ubicaciones_almacen.service';
import { CreateUbicacionesAlmacenDto } from './dto/create-ubicaciones_almacen.dto';
import { UpdateUbicacionesAlmacenDto } from './dto/update-ubicaciones_almacen.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('UbicacionesAlmacen')
@Controller('UbicacionesAlmacen')
export class UbicacionesAlmacenController {
  constructor(private readonly ubicacionesAlmacenService: UbicacionesAlmacenService) {}

  @Post()
  create(@Body() createUbicacionesAlmacenDto: CreateUbicacionesAlmacenDto) {
    return this.ubicacionesAlmacenService.create(createUbicacionesAlmacenDto);
  }

  @Get()
  findAll() {
    return this.ubicacionesAlmacenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ubicacionesAlmacenService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUbicacionesAlmacenDto: UpdateUbicacionesAlmacenDto) {
    return this.ubicacionesAlmacenService.update(+id, updateUbicacionesAlmacenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ubicacionesAlmacenService.remove(+id);
  }
}
