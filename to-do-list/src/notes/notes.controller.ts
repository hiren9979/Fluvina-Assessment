import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  async create(@Body() createNoteDto: CreateNoteDto): Promise<any> {
    return this.notesService.createNote(createNoteDto);
  }

  @Get()
  @ApiOkResponse({ description: 'List of notes' })
  async findAll(): Promise<any[]> {
    return this.notesService.getAllNotes();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Note found' })
  @ApiNotFoundResponse({ description: 'Note not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const note = await this.notesService.getNoteById(id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Note updated' })
  @ApiNotFoundResponse({ description: 'Note not found' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateNoteDto: UpdateNoteDto): Promise<any> {
    const note = await this.notesService.updateNote(id, updateNoteDto);
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Note deleted' })
  @ApiNotFoundResponse({ description: 'Note not found' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const note = await this.notesService.getNoteById(id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    await this.notesService.deleteNote(id);
  }
}

// Module
import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
@Module({
  providers: [NotesService],
  controllers: [NotesController],
})
export class NotesModule {}