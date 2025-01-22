import { Component, ViewChild, TemplateRef, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './footer-template.component.html'
})
export class FooterTemplateComponent {
    @Input() title: string = "";
    currentYear: number = new Date().getFullYear();

    // @ViewChild('footer-template') footerTemplate!: TemplateRef<any>;
}