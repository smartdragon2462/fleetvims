import { PoliciesModule } from './policies.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

describe('PoliciesModule', () => {
  let policiesModule: PoliciesModule;

  beforeEach(() => {
    policiesModule = new PoliciesModule();
  });

  it('should create an instance', () => {
    expect(PoliciesModule).toBeTruthy();
  });
});
