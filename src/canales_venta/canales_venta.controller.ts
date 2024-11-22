import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CanalesVentaService } from './canales_venta.service';
import { CreateCanalesVentaDto } from './dto/create-canales_venta.dto';
import { UpdateCanalesVentaDto } from './dto/update-canales_venta.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('CanalesVenta')
@Controller('CanalesVenta')
export class CanalesVentaController {
  constructor(private readonly canalesVentaService: CanalesVentaService) {}

  @Post()
  create(@Body() createCanalesVentaDto: CreateCanalesVentaDto) {
    return this.canalesVentaService.create(createCanalesVentaDto);
  }

  @Get()
  findAll() {
    return this.canalesVentaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.canalesVentaService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCanalesVentaDto: UpdateCanalesVentaDto) {
    return this.canalesVentaService.update(+id, updateCanalesVentaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.canalesVentaService.remove(+id);
  }
}
