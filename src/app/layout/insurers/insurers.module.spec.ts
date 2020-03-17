import { InsurersModule } from './insurers.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

describe('InsurersModule', () => {
  let insurersModule: InsurersModule;

  beforeEach(() => {
    insurersModule = new InsurersModule();
  });

  it('should create an instance', () => {
    expect(InsurersModule).toBeTruthy();
  });
});
