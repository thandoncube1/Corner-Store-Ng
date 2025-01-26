import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
// Import Reusable Footer
import { FooterTemplateComponent } from './shared/templates/footer-template.component';
import { NavigationComponent } from './shared/templates/navigation.component';
import { FeatureVisibilityService } from './services/feature-visibility.service';
import { filter } from 'rxjs';


@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent, FooterTemplateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Corner Store';
  isAuthenticated = false;
  showNavigation: boolean = true;
  showFooter: boolean = true;

  constructor(private router: Router, private featureVisibility: FeatureVisibilityService) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const route = this.router.routerState.snapshot.root;
      this.showNavigation = this.featureVisibility.shouldShowFeature(route, 'navigation');
      this.showFooter = this.featureVisibility.shouldShowFeature(route, 'footer');
    });
  }

  // Optional method used to render
  get isSignInPage(): boolean {
    return this.router.url.includes('/login') || this.router.url.includes('/register');
  }
}
