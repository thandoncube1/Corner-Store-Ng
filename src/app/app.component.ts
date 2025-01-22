import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Import Reusable Footer
import { FooterTemplateComponent } from './shared/templates/footer-template.component';
import { NavigationComponent } from './shared/templates/navigation.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent, FooterTemplateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Corner Store';
}
