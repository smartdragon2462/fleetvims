import { ContractsModule } from './contracts.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

describe('ContractsModule', () => {
  let contractsModule: ContractsModule;

  beforeEach(() => {
    contractsModule = new ContractsModule();
  });

  it('should create an instance', () => {
    expect(ContractsModule).toBeTruthy();
  });
});
