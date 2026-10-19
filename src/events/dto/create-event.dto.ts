import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ description: 'The name of the event', example: 'Summer Music Festival' })
  name: string;

  @ApiProperty({ description: 'A detailed description of the event', example: 'Join us for a weekend of live music.' })
  description: string;

  @ApiProperty({ description: 'Start time of the event', example: '2026-12-01T10:00:00Z' })
  startTime: Date;

  @ApiProperty({ description: 'End time of the event', example: '2026-12-03T23:59:00Z' })
  endTime: Date;

  @ApiProperty({ description: 'Discount percentage (0-100)', default: 0, required: false })
  discountPercentage?: number;
}
