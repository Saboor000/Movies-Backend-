import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsArray,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 50)
  firstName: string;

  @IsString()
  @Length(2, 50)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain uppercase, lowercase, and number/special character',
  })
  password: string;

  @IsOptional()
  @IsString()
  @Matches(
    // eslint-disable-next-line no-useless-escape
    /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
    {
      message: 'Phone number must be valid',
    },
  )
  phone?: string;

  @IsOptional()
  @IsInt()
  @Min(13)
  @Max(120)
  age?: number;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  country?: string;

  @IsOptional()
  @IsString()
  avatar?: string; // URL to profile picture

  @IsOptional()
  @IsString()
  @Length(0, 500)
  bio?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  favoriteGenres?: string[];
}
