import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TiposCuentasContablesService } from './tipos-cuentas-contables.service';
import { CreateTiposCuentasContableDto } from './dto/create-tipos-cuentas-contable.dto';
import { UpdateTiposCuentasContableDto } from './dto/update-tipos-cuentas-contable.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('TiposCuentasContables')
@Controller('TiposCuentasContables')
export class TiposCuentasContablesController {
  constructor(private readonly tiposCuentasContablesService: TiposCuentasContablesService) {}

  @Post()
  create(@Body() createTiposCuentasContableDto: CreateTiposCuentasContableDto) {
    const tiposCuentas =  this.tiposCuentasContablesService.create(createTiposCuentasContableDto);
    return tiposCuentas;
  }

  @Get()
  findAll() {
    return this.tiposCuentasContablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiposCuentasContablesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTiposCuentasContableDto: UpdateTiposCuentasContableDto) {
    return this.tiposCuentasContablesService.update(+id, updateTiposCuentasContableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiposCuentasContablesService.remove(+id);
  }
}
