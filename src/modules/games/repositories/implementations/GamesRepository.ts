import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder("game").where("LOWER(game.title) like :title", {title: `%${param.toLowerCase()}%`}).getMany();
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query("select count(id) from games"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[] | undefined> {
    const games = await this.repository
      .createQueryBuilder("game").leftJoinAndSelect("game.users", "users").where("game.id = :id", {id}).getOne();

    return games?.users;
      
  }
}
