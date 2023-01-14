import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  url = 'https://pokeapi.co/api/v2/pokemon';
  pokemon: any = {};


  constructor(private http: HttpClient) { }

  getAllPokemon(): Observable<any>{
    return this.http.get(this.url);
    
  }

  pokeSearch(): Observable<any>{
    return this.http.get<'name'>(this.url)
  
  }
  // public getPokemon(): Observable<any>{
  //   return this.http.get(`${this.url} + '/' + ${id}`)
  // }


}


