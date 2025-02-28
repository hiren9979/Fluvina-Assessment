import { Injectable, NotFoundException } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  private pool: mysql.Pool;

  constructor() {
    this.pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'root@123',
      database: 'notes',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  async createNote(note: CreateNoteDto): Promise<any> {
    const [result] = await this.pool.execute(
      'INSERT INTO notes (title, content, createdAt) VALUES (?, ?, NOW())',
      [note.title, note.content],
    );
    const id = (result as mysql.ResultSetHeader).insertId;
    return this.getNoteById(id);
  }

  async getAllNotes(): Promise<any[]> {
    const [rows] = await this.pool.execute('SELECT * FROM notes');
    return rows as any[];
  }

  async getNoteById(id: number): Promise<any> {
    const [rows] = await this.pool.execute('SELECT * FROM notes WHERE id = ?', [id]);
    if (Array.isArray(rows) && rows.length > 0) {
      return rows[0];
    }
    return null;
  }

  async updateNote(id: number, note: UpdateNoteDto): Promise<any> {
    let query = 'UPDATE notes SET ';
    const params: any = [];

    if (note.title) {
      query += 'title = ?, ';
      params.push(note.title);
    }
    if (note.content) {
      query += 'content = ?, ';
      params.push(note.content);
    }

    if (params.length === 0) {
      return this.getNoteById(id);
    }

    query = query.slice(0, -2);
    query += ' WHERE id = ?';
    params.push(id);

    await this.pool.execute(query, params);
    return this.getNoteById(id);
  }

  async deleteNote(id: number): Promise<void> {
    await this.pool.execute('DELETE FROM notes WHERE id = ?', [id]);
  }
}
