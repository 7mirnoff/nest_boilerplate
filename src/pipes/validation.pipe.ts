import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { ValidationException } from '../exceptions/validation.exception'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const metatype = metadata.metatype
    if (metatype) {
      const obj = plainToInstance(metatype, value)
      const errors = await validate(obj)

      if (errors.length) {
        const messages = errors.map(({ property, constraints }) => {
          if (!constraints) return ''
          return `${property} - ${Object.values(constraints).join(', ')}`
        })
        throw new ValidationException(messages)
      }
    }

    return value
  }
}
