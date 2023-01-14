import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  pokemon: any = {};

  constructor(private service: PokemonService) { 
  }

  ngOnInit(): void {
    this.service.getAllPokemon().subscribe(poke =>{
      this.pokemon = poke.results;
      console.log(this.pokemon);
    });
  }

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  
  
  onTableDataChange(event: any){
    this.page = event;
    this.ngOnInit();
  }

  onTableSizeChange(event: any):void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.ngOnInit();
  }

  onCellClicked(){
    console.log(this.pokemon.index); //Falta traer el numero de id, para poder visualizar los detalles.
  } 
  

}

