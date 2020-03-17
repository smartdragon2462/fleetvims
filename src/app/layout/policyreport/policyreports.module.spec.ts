import { PolicyReportsModule } from './policyreports.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

describe('PolicyReportsModule', () => {
  let policyreportsModule: PolicyReportsModule;

  beforeEach(() => {
    policyreportsModule = new PolicyReportsModule();
  });

  it('should create an instance', () => {
    expect(PolicyReportsModule).toBeTruthy();
  });
});
