import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PokemonService } from '../services/pokemon.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  titleApplication = 'Pokedex';
  pokeSearch: any = {};



  constructor(private service: PokemonService, private fb: FormBuilder) { }

  ngOnInit(){
    this.getPokemon;
  }

  getPokemon(){
    this.service.pokeSearch().subscribe(res =>{
      this.pokeSearch = res
      console.log(this.pokeSearch)
    })
  }


}
