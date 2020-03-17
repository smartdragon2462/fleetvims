import { ChangePasswordModule } from './changepassword.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

describe('ChangePasswordModule', () => {
  let changepasswordModule: ChangePasswordModule;

  beforeEach(() => {
    changepasswordModule = new ChangePasswordModule();
  });

  it('should create an instance', () => {
    expect(ChangePasswordModule).toBeTruthy();
  });
});
