import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder,Validators}   from '@angular/forms';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  selectedItem: any;
  itens = window.localStorage['itens'] ? JSON.parse(window.localStorage['itens']) : [];
  newItem = true; 
  showError = false; 
  item = {
    id: 0,
    name: null,
    unit: null,
    amount: null,
    price: null,
    prshbl: false,
    valDate: null,
    fabDate: null
  }
  formdata;

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
    
    this.buildForm();
  }

  buildForm(){
    this.formdata = this.formbuilder.group({
      name:[this.item.name,Validators.required],
      unit:[this.item.unit,Validators.required],
      amount:[this.item.amount],
      price:[this.item.price,Validators.required],        
      valDate:[this.item.valDate],        
      fabDate:[this.item.fabDate,Validators.required],        
      prshbl: [this.item.prshbl]
    });
  }

  onSubmit(data) {
    if(this.formdata.valid){
      this.save()
    }
    this.showError = true;
  }

  //retorna se mostra ou nao mensagem de erro para cada campo
  displayErrorMsg(field){
    return !this.formdata.controls[field].valid && this.formdata.controls[field].touched ||
         !this.formdata.controls[field].valid && this.showError ? true:false;
  }

  //monta item atual vindo da listagem
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

      this.item = this.formdata.value;
      this.itens.push(this.item)
      window.localStorage['itens'] = JSON.stringify(this.itens)
      this.item = null;
      this.router.navigate(['/listagem']);
      this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Item salvo' });
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Ops!', detail: 'Algo deu errado: ' + error });
    }
  }

  //funcao para exibir confirm box
  confirm() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este item?',
      accept: () => {
        this.delete();
      }
    });
  }  
}
