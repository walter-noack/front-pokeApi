import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PokemonService } from '../services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  displayedColumns: string[] = ['position', 'image', 'name'];
  data: any[] = [];
  datasource = new MatTableDataSource<any>(this.data);
  Pokemon: any = [];
  container2: boolean = false;

  pokemon: any = '';
  pokemonType = [];
  pokemonImg = '';
  id = '';

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;



  constructor(
    private pokeService: PokemonService,
    private activatedRouter: ActivatedRoute) {
      // this.activatedRouter.params.subscribe(
      //   params =>{
      //     this.getOnePokemon(params['id']);
      //   }
      // )

  }

  ngOnInit(): void {
    this.getAllPokemons();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();

    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }



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
          //console.log(this.Pokemon)
        }
        
      });

    }
  }

  getRow(row) {
    // console.log(row);
    this.container2 = true;
    // console.log(row.position);
    this.id = row.position;
    // console.log(this.id);

  }

  
   getOnePokemon(id){

     this.pokeService.getPokemon(this.id).subscribe(
     res =>{
       this.pokemon = res;
       this.pokemonImg = this.pokemon.sprites.front_default;
       this.pokemonType = res.types[0].type.name
       console.log(this.pokemon);
     },
     err => {
      console.log(err);
   }



   );

   }



}

