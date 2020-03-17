import { VehicleTransactionLogsModule } from './vehicletransactionlogs.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

describe('VehicleTransactionLogsModule', () => {
  let vehicletransactionlogsModule: VehicleTransactionLogsModule;

  beforeEach(() => {
    vehicletransactionlogsModule = new VehicleTransactionLogsModule();
  });

  it('should create an instance', () => {
    expect(VehicleTransactionLogsModule).toBeTruthy();
  });
});
