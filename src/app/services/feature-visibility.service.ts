import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeatureVisibilityService {
  showNavigation: boolean = false;
  showFooter: boolean = false;
  constructor(private router: Router, private featureVisibility: FeatureVisibilityService) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const route = this.router.routerState.snapshot.root;
      this.showNavigation = this.featureVisibility.shouldShowFeature(route, 'navigation');
      this.showFooter = this.featureVisibility.shouldShowFeature(route, 'footer');
      console.log('showNavigation:', this.showNavigation);
      console.log('isAuthenticated:', this.isAuthenticated);
    });
  }
  isAuthenticated(arg0: string, isAuthenticated: any) {
    throw new Error('Method not implemented.');
  }

  shouldShowFeature(route: ActivatedRouteSnapshot, component: 'navigation' | 'footer'): boolean {
    const hiddenPaths = {
      navigation: ['users/login', '/register'],
      footer: ['users/login', '/register']
    }
    // This will look in the hiddenPath object and check the component
    // Disable the visibility on that path.
    return hiddenPaths[component].some(path => route.url.toString().includes(path));
  }
}
