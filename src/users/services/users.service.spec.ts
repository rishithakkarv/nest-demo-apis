import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../typeorm';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepo: Repository<User>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepo = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('userRepo should be define', () => {
    expect(userRepo).toBeDefined();
  });

  describe('User Services', () => {
    const USER_DATA = {
      id: 1,
      name: 'some',
      email: 'some.one@gmail.com',
      createdAt: new Date('2022-02-23T18:53:57.000Z'),
      password: '123'
    };

    it('findOne', async () => {
      jest.spyOn(userRepo, 'findOne').mockResolvedValue(USER_DATA);
      expect(await userRepo.findOne()).toBe(USER_DATA)
    });
  });
});
