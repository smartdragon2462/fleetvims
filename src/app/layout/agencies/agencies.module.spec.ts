import { AgenciesModule } from './agencies.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

describe('AgenciesModule', () => {
  let agenciesModule: AgenciesModule;

  beforeEach(() => {
    agenciesModule = new AgenciesModule();
  });

  it('should create an instance', () => {
    expect(AgenciesModule).toBeTruthy();
  });
});
