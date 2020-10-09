import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { CouchbaseService } from '../services/couchbase.service';
import * as LocalNotifications from 'nativescript-local-notifications';
@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

    favorites: Array<string> = [];
    docId: string = "favorites";

    constructor(
        private dishservice: DishService,
        private couchbaseService: CouchbaseService
    ) { 
        this.favorites = [];

        let doc = this.couchbaseService.getDocument(this.docId);
        if( doc == null) {
            this.couchbaseService.createDocument({"favorites": []}, this.docId);
        }
        else {
            this.favorites = doc.favorites;
        }
    }

    isFavorite(id: string): boolean {
        return this.favorites.some(el => el === id);
    }

    addFavorite(id: number): boolean {
        if (!this.isFavorite(id.toString())) {
            this.favorites.push(id.toString());
            this.couchbaseService.updateDocument(this.docId, {"favorites": this.favorites});
            // Schedule a single notification
            LocalNotifications.schedule([{
                id: +id,
                title: "ConFusion Favorites",
                body: 'Dish ' + id + ' added successfully'
            }])
            .then(() => console.log('Notification scheduled'),
                (error) => console.log('Error showing nofication ' + error));
        }
    
        return true;
    }

    getFavorites(): Observable<Dish[]> {
        return this.dishservice.getDishes()
            .pipe(map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id.toString()))));
    }

    deleteFavorite(id: number): Observable<Dish[]> {
        let index = this.favorites.indexOf(id.toString());
        if (index >= 0) {
          this.favorites.splice(index,1);
          this.couchbaseService.updateDocument(this.docId, {"favorites": this.favorites});
          return this.getFavorites();
        }
        else {
          return throwError('Deleting non-existant favorite');
        }
    }
}