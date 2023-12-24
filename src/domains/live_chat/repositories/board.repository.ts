import { Repository } from 'typeorm';
import { CustomRepository } from 'src/core/decorators/typeorm-ex.decorator';
import { Board } from '../entities/board.entity';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {}
