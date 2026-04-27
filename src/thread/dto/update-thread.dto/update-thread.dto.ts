import { PartialType } from '@nestjs/mapped-types';
import { CreateThreadDto } from '../create-thread.dto/create-thread.dto';

export class UpdateThreadDto extends PartialType(CreateThreadDto) {}

