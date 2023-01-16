import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  url = 'https://pokeapi.co/api/v2/pokemon';
  pokemon: any = [];

  constructor(private http: HttpClient) { }

  getAllPokemon(index): Observable<any> {
    return this.http.get(`${this.url}/${index}`);

  }


  getPokemon(index){
    return this.http.get<any>(`${this.url}/${index}`)
  }


}


