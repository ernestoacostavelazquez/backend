import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { GruposGenerosCuentasService } from './grupos_generos_cuentas.service';
import { CreateGruposGenerosCuentaDto } from './dto/create-grupos_generos_cuenta.dto';
import { UpdateGruposGenerosCuentaDto } from './dto/update-grupos_generos_cuenta.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('GruposGenerosCuentas')
@Controller('GruposGenerosCuentas')
export class GruposGenerosCuentasController {
  constructor(private readonly gruposGenerosCuentasService: GruposGenerosCuentasService) {}

  @Post()
  create(@Body() createGruposGenerosCuentaDto: CreateGruposGenerosCuentaDto) {
    return this.gruposGenerosCuentasService.create(createGruposGenerosCuentaDto);
  }

  @Get()
  findAll() {
    return this.gruposGenerosCuentasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gruposGenerosCuentasService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateGruposGenerosCuentaDto: UpdateGruposGenerosCuentaDto) {
    return this.gruposGenerosCuentasService.update(+id, updateGruposGenerosCuentaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gruposGenerosCuentasService.remove(+id);
  }
}
