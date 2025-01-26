import { TestBed } from '@angular/core/testing';

import { FeatureVisibilityService } from './feature-visibility.service';

describe('FeatureVisibilityService', () => {
  let service: FeatureVisibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureVisibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
