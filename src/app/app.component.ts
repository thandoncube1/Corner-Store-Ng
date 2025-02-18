import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'awesome';

  // Inject the firestore
  private firestore: Firestore = inject(Firestore);
  private router: Router = new Router();

  ngOnInit() {}

  clickHandler() {
    const confirm = prompt('Are you sure you want to go to here?');

    if (confirm === 'yes') {
      this.router.navigate(['animals']);
    }
  }
}
