import { VehicleContactsModule } from './vehiclecontacts.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

describe('VehicleContactsModule', () => {
  let vehiclecontactsModule: VehicleContactsModule;

  beforeEach(() => {
    vehiclecontactsModule = new VehicleContactsModule();
  });

  it('should create an instance', () => {
    expect(VehicleContactsModule).toBeTruthy();
  });
});
