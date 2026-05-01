import { IsBoolean, IsString, IsOptional, IsEmail, IsNotEmpty, IsNumber, MinLength, Matches } from 'class-validator';

export class CreateThreadDto {
  @IsString()
  @IsNotEmpty()
  title: string;


  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  userId: string;
}

