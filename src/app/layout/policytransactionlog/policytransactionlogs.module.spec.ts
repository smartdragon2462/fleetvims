import { PolicyTransactionLogsModule } from './policytransactionlogs.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

describe('PolicyTransactionLogsModule', () => {
  let policytransactionlogsModule: PolicyTransactionLogsModule;

  beforeEach(() => {
    policytransactionlogsModule = new PolicyTransactionLogsModule();
  });

  it('should create an instance', () => {
    expect(PolicyTransactionLogsModule).toBeTruthy();
  });
});
