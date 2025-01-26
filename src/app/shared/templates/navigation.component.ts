import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, Router } from "@angular/router";

@Component({
    selector: 'app-navigation',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './navigation.component.html'
})
export class NavigationComponent {
    @Input() title: string = "";
    @Input() isAuthenticated: boolean = false;

    constructor(private router: Router) {}

    navigateToLogin() {
        this.router.navigate(['users/login']);
    }
}