import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubdivisionCuentasContablesService } from './subdivision-cuentas-contables.service';
import { CreateSubdivisionCuentasContableDto } from './dto/create-subdivision-cuentas-contable.dto';
import { UpdateSubdivisionCuentasContableDto } from './dto/update-subdivision-cuentas-contable.dto';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('SubdivisionCuentasContables')
@Controller('SubdivisionCuentasContables')
export class SubdivisionCuentasContablesController {
  constructor(private readonly subdivisionCuentasContablesService: SubdivisionCuentasContablesService) {}

  @Post()
  create(@Body() createSubdivisionCuentasContableDto: CreateSubdivisionCuentasContableDto) {
    return this.subdivisionCuentasContablesService.create(createSubdivisionCuentasContableDto);
  }

  @Get()
  findAll() {
    return this.subdivisionCuentasContablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subdivisionCuentasContablesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubdivisionCuentasContableDto: UpdateSubdivisionCuentasContableDto) {
    return this.subdivisionCuentasContablesService.update(+id, updateSubdivisionCuentasContableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subdivisionCuentasContablesService.remove(+id);
  }
}
