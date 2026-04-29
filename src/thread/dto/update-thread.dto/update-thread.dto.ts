
import { IsBoolean, IsString, IsOptional, IsEmail, IsNotEmpty, IsNumber, MinLength, Matches } from 'class-validator';
export class UpdateThreadDto {
      @IsString()
      @IsNotEmpty()
      title: string;
    
    
      @IsString()
      @IsNotEmpty()
      message: string;
    
      @IsNumber()
      @IsNotEmpty()
      userId: number;
}

