import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AnimalsComponent } from './animals/animals.component';
import { AnimalDetailComponent } from './animal-detail/animal-detail.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'animals',
        component: AnimalsComponent,
        children: [
            { path: ':name', component: AnimalDetailComponent }
        ]
    },
    { path: '**', component: ErrorComponent }
];
