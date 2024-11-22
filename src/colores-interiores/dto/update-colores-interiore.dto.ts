import { PartialType } from '@nestjs/swagger';
import { CreateColoresInterioreDto } from './create-colores-interiore.dto';

export class UpdateColoresInterioreDto extends PartialType(CreateColoresInterioreDto) {}
