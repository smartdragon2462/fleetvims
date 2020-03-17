import { ClientReportsModule } from './clientreports.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

describe('ClientReportsModule', () => {
  let clientreportsModule: ClientReportsModule;

  beforeEach(() => {
    clientreportsModule = new ClientReportsModule();
  });

  it('should create an instance', () => {
    expect(ClientReportsModule).toBeTruthy();
  });
});
