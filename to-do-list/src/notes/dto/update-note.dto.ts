import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateNoteDto {
    @IsOptional()
    @IsString()
    title?: string;
    
    @IsOptional()
    @IsString()
    content?: string;
  }