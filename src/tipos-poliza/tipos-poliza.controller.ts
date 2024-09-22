import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TiposPolizaService } from './tipos-poliza.service';
import { CreateTiposPolizaDto } from './dto/create-tipos-poliza.dto';
import { UpdateTiposPolizaDto } from './dto/update-tipos-poliza.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('TiposPoliza')
@Controller('TiposPoliza')
export class TiposPolizaController {
  constructor(private readonly tiposPolizaService: TiposPolizaService) {}

  @Post()
  create(@Body() createTiposPolizaDto: CreateTiposPolizaDto) {
    return this.tiposPolizaService.create(createTiposPolizaDto);
  }

  @Get()
  findAll() {
    return this.tiposPolizaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiposPolizaService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTiposPolizaDto: UpdateTiposPolizaDto) {
    return this.tiposPolizaService.update(+id, updateTiposPolizaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiposPolizaService.remove(+id);
  }
}
