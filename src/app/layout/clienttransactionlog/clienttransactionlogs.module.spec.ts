import { ClientTransactionLogsModule } from './clienttransactionlogs.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

describe('ClientTransactionLogsModule', () => {
  let clienttransactionlogsModule: ClientTransactionLogsModule;

  beforeEach(() => {
    clienttransactionlogsModule = new ClientTransactionLogsModule();
  });

  it('should create an instance', () => {
    expect(ClientTransactionLogsModule).toBeTruthy();
  });
});
