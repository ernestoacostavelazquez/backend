import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadosCivilService } from './estados_civil.service';
import { CreateEstadosCivilDto } from './dto/create-estados_civil.dto';
import { UpdateEstadosCivilDto } from './dto/update-estados_civil.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('EstadosCivil')
@Controller('EstadosCivil')
export class EstadosCivilController {
  constructor(private readonly estadosCivilService: EstadosCivilService) {}

  @Post()
  create(@Body() createEstadosCivilDto: CreateEstadosCivilDto) {
    return this.estadosCivilService.create(createEstadosCivilDto);
  }

  @Get()
  findAll() {
    return this.estadosCivilService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadosCivilService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadosCivilDto: UpdateEstadosCivilDto) {
    return this.estadosCivilService.update(+id, updateEstadosCivilDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadosCivilService.remove(+id);
  }
}
