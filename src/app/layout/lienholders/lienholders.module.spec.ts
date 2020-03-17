import { LienholdersModule } from './lienholders.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

describe('LienholdersModule', () => {
  let lienholdersModule: LienholdersModule;

  beforeEach(() => {
    lienholdersModule = new LienholdersModule();
  });

  it('should create an instance', () => {
    expect(LienholdersModule).toBeTruthy();
  });
});
