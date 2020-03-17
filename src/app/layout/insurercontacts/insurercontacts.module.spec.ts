import { InsurerContactsModule } from './insurercontacts.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

describe('InsurerContactsModule', () => {
  let insurercontactsModule: InsurerContactsModule;

  beforeEach(() => {
    insurercontactsModule = new InsurerContactsModule();
  });

  it('should create an instance', () => {
    expect(InsurerContactsModule).toBeTruthy();
  });
});
