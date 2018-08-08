import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) { 
  } 

  title = 'app';
  public items;  

  ngOnInit() {
    this.setUpMenu();    
  }

  setUpMenu(){
    this.items = [{
      label: 'Menu',
      icon: 'pi-home',
      items: [
        { label: 'Cadastrar', icon: 'pi pi-pencil', command:(click)=> this.setPage('cadastro') },
        { label: 'Listagem', icon: 'pi pi-align-left', command:(click)=> this.setPage('listagem') }
      ]
    }];
  }

  setPage(page){
    this.router.navigate(['/' + page]);
  }
}
