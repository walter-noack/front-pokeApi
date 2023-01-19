import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  displayedColumns: string[] = ['position', 'image', 'name'];
  data: any[] = [];
  datasource = new MatTableDataSource<any>(this.data);
  dataNombre: any[] = [];
  Pokemon: any = [];
  container2: boolean = false;

  poke: any = '';
  pokemon: any = '';
  pokemonType01 = [];
  pokemonType02 = [];
  pokemonImg = '';
  pokemonMove = '';
  id = '';
  stat01Name = '';
  stat01Value = '';
  stat02Name = '';
  stat02Value = '';
  stat03Name = '';
  stat03Value = '';



  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private pokeService: PokemonService) { }

  ngOnInit(): void {
    this.getAllPokemons();
    this.getNames();

  }

  //AUTOCOMPLETAR
  selectedItem: string = '';

  selectEvent(filterV: string) {
    console.log(this.selectedItem);
    this.datasource.filter = filterV.trim().toLowerCase();


  }

  onChangeSearch(val: string) {
    this.datasource.filter = this.selectedItem.trim().toLowerCase();
    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }


  //Listado de Pokemones 
  getAllPokemons() {
    let pokemonData;
    for (let i = 1; i <= 150; i++) {
      this.pokeService.getAllPokemon(i).subscribe({
        next: (poke) => {
          pokemonData = {
            position: i,
            image: poke.sprites.front_default,
            name: poke.name
          },
            this.data.push(pokemonData);
          this.datasource = new MatTableDataSource<any>(this.data);
          this.datasource.paginator = this.paginator;
          this.Pokemon = poke;
        }

      });

    }
  }
  
  //Obtener ID de Pokemon
  getRow(row) {
    this.container2 = true;
    this.id = row.position;

  }

  //Ficha con detalles de pokemón
  closeCard() {
    this.container2 = false;
  }

  getOnePokemon(id) {
    this.pokeService.getPokemon(this.id).subscribe(
      res => {
        this.pokemon = res;
        this.pokemonImg = this.pokemon.sprites.front_default;
        this.pokemonType01 = res.types[0].type.name;
        this.stat01Name = res.stats[0].stat.name;
        this.stat01Value = res.stats[0].base_stat;
        this.stat02Name = res.stats[1].stat.name;
        this.stat02Value = res.stats[1].base_stat;
        this.stat03Name = res.stats[2].stat.name;
        this.stat03Value = res.stats[2].base_stat;
        console.log(this.pokemon);
      },
      err => {
        console.log(err);
      }
    );
  }


  // Tabla resumen
  pokeNames: any = [];

  getNames() {
    let dataNames = [];
    for (let j = 1; j <= 150; j++) {
      this.pokeService.getAllPokemon(j).subscribe(poke => {
        this.dataNombre.push(poke.name);
      })
    }
  }

  namesTable = this.dataNombre
  alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  countNamesByLetter(letter: string): number {
    return this.namesTable.filter(name => name.toLowerCase().startsWith(letter)).length;
  }





}

