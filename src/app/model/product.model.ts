import {Injectable} from "@angular/core";

@Injectable()
export class Product {
 public id!: number;
  public quantity!: number;
  public description!: string;
  public price!: number;
}
