import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TiposDomiciliosService } from './tipos_domicilios.service';
import { CreateTiposDomicilioDto } from './dto/create-tipos_domicilio.dto';
import { UpdateTiposDomicilioDto } from './dto/update-tipos_domicilio.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('TiposDomicilios')
@Controller('TiposDomicilios')
export class TiposDomiciliosController {
  constructor(private readonly tiposDomiciliosService: TiposDomiciliosService) {}

  @Post()
  create(@Body() createTiposDomicilioDto: CreateTiposDomicilioDto) {
    return this.tiposDomiciliosService.create(createTiposDomicilioDto);
  }

  @Get()
  findAll() {
    return this.tiposDomiciliosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiposDomiciliosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTiposDomicilioDto: UpdateTiposDomicilioDto) {
    return this.tiposDomiciliosService.update(+id, updateTiposDomicilioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiposDomiciliosService.remove(+id);
  }
}
