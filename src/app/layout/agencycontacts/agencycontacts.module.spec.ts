import { AgencyContactsModule } from './agencycontacts.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

describe('AgencyContactsModule', () => {
  let agencycontactsModule: AgencyContactsModule;

  beforeEach(() => {
    agencycontactsModule = new AgencyContactsModule();
  });

  it('should create an instance', () => {
    expect(AgencyContactsModule).toBeTruthy();
  });
});
