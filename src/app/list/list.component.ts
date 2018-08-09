import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    item: any = {};
    selectedItem: any;
    newItem: boolean;
    cols: any[];

    constructor(private router: Router) { }
    
    public itens = window.localStorage['itens'] ? JSON.parse(window.localStorage['itens']) : []

    ngOnInit() {
        this.setUpList()
    }

    setUpList(){
        this.cols = [
            { field: 'name', header: 'Nome' },
            { field: 'unit', header: 'Unidade de Medida' },
            { field: 'amount', header: 'Quantidade' },
            { field: 'price', header: 'Preço' },
            { field: 'prshbl', header: 'É perecivel' },
            { field: 'valDate', header: 'Data de validade' },
            { field: 'fabDate', header: 'Data de fabricação' },
        ];
    }

    edit() {
        this.router.navigate(['/cadastro'])
    }


    parseDate(date){
        return new Date(date).toLocaleDateString('pt')
    }

    //evento disparado quando selecionado item
    onRowSelect(event) {
        this.newItem = false;
        this.item = event.data;
        this.router.navigate(['/cadastro'], { queryParams: { item: JSON.stringify(event.data) } })
               
    }
}
