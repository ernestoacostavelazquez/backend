import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TiposCajaService } from './tipos_caja.service';
import { CreateTiposCajaDto } from './dto/create-tipos_caja.dto';
import { UpdateTiposCajaDto } from './dto/update-tipos_caja.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('TiposCaja')
@Controller('TiposCaja')
export class TiposCajaController {
  constructor(private readonly tiposCajaService: TiposCajaService) {}

  @Post()
  create(@Body() createTiposCajaDto: CreateTiposCajaDto) {
    return this.tiposCajaService.create(createTiposCajaDto);
  }

  @Get()
  findAll() {
    return this.tiposCajaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiposCajaService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTiposCajaDto: UpdateTiposCajaDto) {
    return this.tiposCajaService.update(+id, updateTiposCajaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiposCajaService.remove(+id);
  }
}
