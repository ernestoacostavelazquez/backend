import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TiposPersonaService } from './tipos_persona.service';
import { CreateTiposPersonaDto } from './dto/create-tipos_persona.dto';
import { UpdateTiposPersonaDto } from './dto/update-tipos_persona.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('TiposPersona')
@Controller('TiposPersona')
export class TiposPersonaController {
  constructor(private readonly tiposPersonaService: TiposPersonaService) {}

  @Post()
  create(@Body() createTiposPersonaDto: CreateTiposPersonaDto) {
    return this.tiposPersonaService.create(createTiposPersonaDto);
  }

  @Get()
  findAll() {
    return this.tiposPersonaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiposPersonaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTiposPersonaDto: UpdateTiposPersonaDto) {
    return this.tiposPersonaService.update(+id, updateTiposPersonaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiposPersonaService.remove(+id);
  }
}
