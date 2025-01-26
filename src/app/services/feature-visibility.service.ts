import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FeatureVisibilityService {
  constructor() { }

  shouldShowFeature(route: ActivatedRouteSnapshot, component: 'navigation' | 'footer'): boolean {
    const hiddenPaths = {
      navigation: ['/login'],
      footer: ['/login']
    }
    // This will look in the hiddenPath object and check the component
    // Disable the visibility on that path.
    return !hiddenPaths[component].some(path => route.url.toString().includes(path));
  }
}
