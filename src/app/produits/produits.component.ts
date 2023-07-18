import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {Router} from '@angular/router';
import {Category} from '../model/Category.model';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  products: any;
  size = 5;
  currentPage = 0;
  totalPages = 0;
  // @ts-ignore
  pages: Array<number>;
  categories: any;
  // @ts-ignore
  category: Category;
  constructor(private service: CatalogueService, private router: Router) { }

  ngOnInit() {

    this.service.findAllCategory().subscribe(data => {
      this.categories = data ;
    },
        error => {
      console.log(error);
    });

  }
  onGetProducts() {
    this.service.getProducts(this.currentPage, this.size).subscribe(data => {
            // @ts-ignore
        this.totalPages = data.page.totalPages;
        this.pages = new Array<number>(this.totalPages);
        this.products = data ;
     },
        error => {
      console.log(error);
    });
  }

  onTapeKeyword({value}: { value: any }) {
    this.service.doSearchByKeyWord(value.keyword,
      this.currentPage,
      this.size).subscribe(data => {
      this.products = data ;
    },
        error => {
      console.log(error);
    });
  }

  onProductPage(i: number) {
    this.currentPage = i;
    this.onGetProducts();
  }

  onDeleteProduct({p}: { p: any }) {
    const conf = confirm('Etes-vous sûr de  vouloir supprimer cet element?');
    if (conf) {
      this.service.deleteResource({url: p._links.self.href}).subscribe(success => {
        this.onGetProducts();
      },
          erro => {
        console.log(erro);
      });

    }
  }

  onChangeSelect({value}: { value: any }) {
    this.service.findAllByCategory(value.id,
      this.currentPage,
      this.size).subscribe(data => {
      this.products = data ;
    },
        error => {
      console.log(error);
    });
  }


  getCategory(href: string) {
    return this.service.getCategoryOfProduct(href).subscribe(c => {
      this.category = c;
      console.log(this.category);
      return 'ok';
    });
  }

  onEditProduct({p}: { p: any }) {
    const url =  p._links.self.href;
    return this.router.navigateByUrl('/edit-product/' + btoa(url));
  }
}
