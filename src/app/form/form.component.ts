import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder}   from '@angular/forms';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  selectedItem: any;
  itens = window.localStorage['itens'] ? JSON.parse(window.localStorage['itens']) : [];
  newItem = true; 
  showError = false; 
  form:FormGroup;
  item = {
    id: 0,
    name: '',
    unit: '',
    amount: null,
    price: 0,
    prshbl: false,
    valDate: null,
    fabDate: null
  }
  value: Date;

  public units = [
    { label: 'Litro', value: 'Litro' },
    { label: 'Quilograma', value: 'Quilograma' },
    { label: 'Unidade', value: 'Unidade' },
  ]

  constructor(private route: ActivatedRoute, private router: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService, private formbuilder:FormBuilder ) {
  }


  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => this.setUpItem(params.item));
  }

  setUpItem(item) {
    if (item) {
      this.item = JSON.parse(item)            
      this.item.fabDate = new Date(this.item.fabDate)
      this.item.valDate = new Date(this.item.valDate)      
      this.newItem = false;
    }
  }

  cancel() {
    this.router.navigate(['/listagem']);
  }

  delete() {
    try {
      var index = this.item.id
      this.itens = this.itens.filter((val, i) => val.id != index);
      window.localStorage['itens'] = JSON.stringify(this.itens)
      this.item = null;
      this.router.navigate(['/listagem']);
      this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Item excluído' });
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Ops', detail: 'Algo deu errado:' + error });
    }
  }

  save() {
    try {
      if (!this.newItem) {
        var index = this.item.id
        this.itens = this.itens.filter((val, i) => val.id != index);
      }else{
        this.item.id = Math.floor(Math.random() * 100);
      }      

      this.itens.push(this.item)
      window.localStorage['itens'] = JSON.stringify(this.itens)
      this.item = null;
      this.router.navigate(['/listagem']);
      this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Item salvo' });
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Ops!', detail: 'Algo deu errado: ' + error });
    }
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este item?',
      accept: () => {
        this.delete();
      }
    });
  }

  validate(){      
    var save = true
    for (var property in this.item) {        
      if(this.item.prshbl && !this.item.valDate){
        save = false
      }
      if(!this.item[property] && property != 'id' && property != 'prshbl' && property != 'valDate'){
        save = false
      }       
    }
    if(save){
      this.save()
    }

    this.showError = true;
  } 
  
}
