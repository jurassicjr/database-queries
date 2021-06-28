import { getRepository, IsNull, Not, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User | undefined> {
    return this.repository.findOne(user_id, { relations: ["games"]});
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query("select * from USERS order by first_name"); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const threat_first_name = first_name.charAt(0).toUpperCase() + first_name.slice(1).toLowerCase();
    const threat_last_name = last_name.charAt(0).toUpperCase() + last_name.slice(1).toLowerCase();
   
    return this.repository.query("select * from USERS WHERE first_name = $1 AND last_name = $2", [threat_first_name, threat_last_name]); // Complete usando raw query
  }
}
