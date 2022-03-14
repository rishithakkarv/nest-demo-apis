import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { Request, Response } from 'express';

describe('UsersController', () => {
  let controller: UsersController;

  const statusResponseMock = {
    send: jest.fn((s) => s),
  };

  const responseMock = {
    status: jest.fn((r) => statusResponseMock),
    send: jest.fn((r) => r),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: 'USER_SERVICE',
          useValue: {
            allUsers: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return status 200', async () => {
    controller.getUsers(responseMock);
    expect(await responseMock.status).toHaveBeenCalledWith(200);
  });
});
