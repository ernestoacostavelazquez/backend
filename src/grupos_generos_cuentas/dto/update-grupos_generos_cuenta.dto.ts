import { PartialType } from '@nestjs/swagger';
import { CreateGruposGenerosCuentaDto } from './create-grupos_generos_cuenta.dto';

export class UpdateGruposGenerosCuentaDto extends PartialType(CreateGruposGenerosCuentaDto) {}
