import { Component, ViewChild, TemplateRef } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'footer-template',
    standalone: true,
    imports: [CommonModule],
    template: 'footer-template.component.html'
})
export class FooterTemplateComponent {
    currentYear: number = new Date().getFullYear();

    // @ViewChild('footer-template') footerTemplate!: TemplateRef<any>;
}