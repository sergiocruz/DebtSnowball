import { TestBed, inject } from '@angular/core/testing';

import { DebtEffectService } from './debt.effect';

describe('DebtEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DebtEffectService]
    });
  });

  it('should be created', inject([DebtEffectService], (service: DebtEffectService) => {
    expect(service).toBeTruthy();
  }));
});
