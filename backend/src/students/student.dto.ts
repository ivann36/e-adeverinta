import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class StudentDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  fatherInitial: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  studyCycle: string;

  @IsNotEmpty()
  @IsString()
  studyField: string;

  @IsNotEmpty()
  @IsString()
  studyForm: string;

  @IsNotEmpty()
  @IsNumber()
  studyYear: number;

  @IsNotEmpty()
  @IsString()
  financiation: string;

  @IsNotEmpty()
  @IsString()
  gender: string;
}
