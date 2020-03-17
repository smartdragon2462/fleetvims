import { RolesModule } from './roles.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

describe('RolesModule', () => {
  let rolesModule: RolesModule;

  beforeEach(() => {
    rolesModule = new RolesModule();
  });

  it('should create an instance', () => {
    expect(RolesModule).toBeTruthy();
  });
});
