import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetallesPolizasService } from './detalles-polizas.service';
import { CreateDetallesPolizaDto } from './dto/create-detalles-poliza.dto';
import { UpdateDetallesPolizaDto } from './dto/update-detalles-poliza.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('DetallePolizas')
@Controller('DetallesPolizas')
export class DetallesPolizasController {
  constructor(private readonly detallesPolizasService: DetallesPolizasService) {}

  @Post()
  create(@Body() createDetallesPolizaDto: CreateDetallesPolizaDto) {
    return this.detallesPolizasService.create(createDetallesPolizaDto);
  }

  @Get()
  findAll() {
    return this.detallesPolizasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detallesPolizasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetallesPolizaDto: UpdateDetallesPolizaDto) {
    return this.detallesPolizasService.update(+id, updateDetallesPolizaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detallesPolizasService.remove(+id);
  }
}
