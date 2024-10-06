import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GenerosCuentasContablesService } from './generos_cuentas_contables.service';
import { CreateGenerosCuentasContableDto } from './dto/create-generos_cuentas_contable.dto';
import { UpdateGenerosCuentasContableDto } from './dto/update-generos_cuentas_contable.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('GenerosCuentasContables')
@Controller('GenerosCuentasContables')
export class GenerosCuentasContablesController {
  constructor(private readonly generosCuentasContablesService: GenerosCuentasContablesService) {}

  @Post()
  create(@Body() createGenerosCuentasContableDto: CreateGenerosCuentasContableDto) {
    return this.generosCuentasContablesService.create(createGenerosCuentasContableDto);
  }

  @Get()
  findAll() {
    return this.generosCuentasContablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generosCuentasContablesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenerosCuentasContableDto: UpdateGenerosCuentasContableDto) {
    return this.generosCuentasContablesService.update(+id, updateGenerosCuentasContableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generosCuentasContablesService.remove(+id);
  }
}
