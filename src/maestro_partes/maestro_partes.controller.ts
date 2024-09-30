import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaestroPartesService } from './maestro_partes.service';
import { CreateMaestroParteDto } from './dto/create-maestro_parte.dto';
import { UpdateMaestroParteDto } from './dto/update-maestro_parte.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('MaestroPartes')
@Controller('MaestroPartes')
export class MaestroPartesController {
  constructor(private readonly maestroPartesService: MaestroPartesService) {}

  @Post()
  create(@Body() createMaestroParteDto: CreateMaestroParteDto) {
    return this.maestroPartesService.create(createMaestroParteDto);
  }

  @Get()
  findAll() {
    return this.maestroPartesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maestroPartesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaestroParteDto: UpdateMaestroParteDto) {
    return this.maestroPartesService.update(+id, updateMaestroParteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maestroPartesService.remove(+id);
  }
}
