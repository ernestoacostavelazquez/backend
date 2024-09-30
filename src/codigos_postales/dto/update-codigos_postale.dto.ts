import { PartialType } from '@nestjs/swagger';
import { CreateCodigosPostaleDto } from './create-codigos_postale.dto';

export class UpdateCodigosPostaleDto extends PartialType(CreateCodigosPostaleDto) {}
