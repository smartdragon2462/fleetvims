import { UsersModule } from './users.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

describe('UsersModule', () => {
  let usersModule: UsersModule;

  beforeEach(() => {
    usersModule = new UsersModule();
  });

  it('should create an instance', () => {
    expect(UsersModule).toBeTruthy();
  });
});
