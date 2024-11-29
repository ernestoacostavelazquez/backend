import { Controller, Get, Post, Body,Param, Delete, Put } from '@nestjs/common';
import { TiposCarteraService } from './tipos_cartera.service';
import { CreateTiposCarteraDto } from './dto/create-tipos_cartera.dto';
import { UpdateTiposCarteraDto } from './dto/update-tipos_cartera.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('TiposCartera')
@Controller('TiposCartera')
export class TiposCarteraController {
  constructor(private readonly tiposCarteraService: TiposCarteraService) {}

  @Post()
  create(@Body() createTiposCarteraDto: CreateTiposCarteraDto) {
    return this.tiposCarteraService.create(createTiposCarteraDto);
  }

  @Get()
  findAll() {
    return this.tiposCarteraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiposCarteraService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTiposCarteraDto: UpdateTiposCarteraDto) {
    return this.tiposCarteraService.update(+id, updateTiposCarteraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiposCarteraService.remove(+id);
  }
}
