import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

// Define interface
interface IAnimal {
  bio: string;
  img: string;
  imgURL: string;
  name: string;
}

@Component({
  selector: 'app-animals',
  imports: [RouterModule, CommonModule],
  templateUrl: './animals.component.html',
  styleUrl: './animals.component.css'
})
export class AnimalsComponent implements OnInit {
  animals$: Observable<IAnimal[]>;

  constructor(private firestore: Firestore) {
    // Simple collection retrieval
    const animalCollection = collection(this.firestore, 'animals');
    this.animals$ = collectionData(animalCollection, { idField: 'name'}) as Observable<IAnimal[]>;
  }

  ngOnInit() {
    this.animals$.subscribe(animals => animals);
  }

}
