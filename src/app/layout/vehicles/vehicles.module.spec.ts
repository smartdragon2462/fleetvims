import { VehiclesModule } from './vehicles.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

describe('VehiclesModule', () => {
  let vehiclesModule: VehiclesModule;

  beforeEach(() => {
    vehiclesModule = new VehiclesModule();
  });

  it('should create an instance', () => {
    expect(VehiclesModule).toBeTruthy();
  });
});
