import { ClientContactsModule } from './clientcontacts.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

describe('ClientContactsModule', () => {
  let clientcontactsModule: ClientContactsModule;

  beforeEach(() => {
    clientcontactsModule = new ClientContactsModule();
  });

  it('should create an instance', () => {
    expect(ClientContactsModule).toBeTruthy();
  });
});
