import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaestroPersonasService } from './maestro_personas.service';
import { CreateMaestroPersonaDto } from './dto/create-maestro_persona.dto';
import { UpdateMaestroPersonaDto } from './dto/update-maestro_persona.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('MaestroPersonas')
@Controller('MaestroPersonas')
export class MaestroPersonasController {
  constructor(private readonly maestroPersonasService: MaestroPersonasService) {}

  @Post()
  create(@Body() createMaestroPersonaDto: CreateMaestroPersonaDto) {
    return this.maestroPersonasService.create(createMaestroPersonaDto);
  }

  @Get()
  findAll() {
    return this.maestroPersonasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maestroPersonasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaestroPersonaDto: UpdateMaestroPersonaDto) {
    return this.maestroPersonasService.update(+id, updateMaestroPersonaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maestroPersonasService.remove(+id);
  }
}
