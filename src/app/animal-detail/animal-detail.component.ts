import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Firestore, collection, doc, docData, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { switchMap, from, Observable, map } from 'rxjs';

interface IAnimal {
  bio: string;
  img: string;
  imgURL: string;
  name: string;
}

@Component({
  selector: 'app-animal-detail',
  imports: [CommonModule],
  templateUrl: './animal-detail.component.html',
  styleUrl: './animal-detail.component.css'
})
export class AnimalDetailComponent implements OnInit {
  // Inject all necessary dependencies
  private firestore: Firestore = inject(Firestore);
  private route: ActivatedRoute = inject(ActivatedRoute);
  animal$!: Observable<IAnimal>;

  constructor() {}

  ngOnInit(): void {
      // Get the route from the route map
    this.animal$ = this.route.paramMap.pipe(switchMap(params => {
      const name = params.get('name') ?? '';
      const docRef = doc(this.firestore, 'animals/' + name);
      return docData(docRef) as Observable<IAnimal>;
    }));
    console.log(this.animal$);
  }
}
