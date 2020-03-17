import { LienholderContactsModule } from './lienholdercontacts.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

describe('LienholderContactsModule', () => {
  let lienholdercontactsModule: LienholderContactsModule;

  beforeEach(() => {
    lienholdercontactsModule = new LienholderContactsModule();
  });

  it('should create an instance', () => {
    expect(LienholderContactsModule).toBeTruthy();
  });
});
