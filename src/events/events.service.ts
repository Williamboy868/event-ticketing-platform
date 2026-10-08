import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto.js';
import { UpdateEventDto } from './dto/update-event.dto.js';

@Injectable()
export class EventsService {
  create(createEventDto: CreateEventDto) {
    return {
      message: 'This action adds a new event',
      data: createEventDto
    };
  }

  findAll() {
    return { message: 'This action returns all events' };
  }

  findOne(id: string) {
    return { message: `This action returns a #${id} event` };
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    return { message: `This action updates a #${id} event` };
  }

  remove(id: string) {
    return { message: `This action removes a #${id} event` };
  }
}
