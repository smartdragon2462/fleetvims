import { ClientsModule } from './clients.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

describe('ClientsModule', () => {
  let clientsModule: ClientsModule;

  beforeEach(() => {
    clientsModule = new ClientsModule();
  });

  it('should create an instance', () => {
    expect(ClientsModule).toBeTruthy();
  });
});
