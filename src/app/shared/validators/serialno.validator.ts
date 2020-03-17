import { AbstractControl} from '@angular/forms';
import { VehiclesService } from '../services/vehicles.service';
import 'rxjs/add/operator/map';

export class SerialnoValidator {
  static validSerialno(vehiclesService:VehiclesService,vehicleid){

  	  return (control: AbstractControl) => {
      return vehiclesService.checkUniqueSerialno(control.value,vehicleid).map(res => {
      				var parsed = JSON.parse(JSON.stringify(res));
      				console.log(parsed['Result']);
      				console.log(parsed.Result);
      				
					return parsed['Result_value'] ? null:{validSerialno: true} ;
      		});
      }
    
  }
}
