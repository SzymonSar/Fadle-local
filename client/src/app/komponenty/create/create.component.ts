import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import axios from "axios"
import { NgSelectModule } from '@ng-select/ng-select';


interface Kat{
  kategoria: string,
  ikona: string
}
interface DataItem {
  nazwa: string;
  ikona: string;
}
interface DataPost {
  nazwa: string;
  ikona: string;
  kategoria: string;
  isplaceble: boolean;
  item1: string;
  item2: string;
  item3: string;
  item4: string;
  item5: string;
  item6: string;
}
@Component({
  selector: 'app-create',
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit{
  Nazwa: string = "";
  Ikona: string = "";
  KategoriaIn: string = '';
  Kategorie: Kat[] = 
  [
    {kategoria: "Logistics", ikona: "Item-group_logistics.png"},
    {kategoria: "Production", ikona: "Item-group_production.png"},
    {kategoria: "Intermediates", ikona: "Item-group_intermediate_products.png"},
    {kategoria: "Space", ikona: "Item-group_space.png"},
    {kategoria: "Military", ikona: "Item-group_military.png"},
  ]
  itemIle: number = 1;
  get DlaNgFor(): number[] {
    this.itemIleUpdate();
  return Array.from({ length: this.itemIle }, (_, i) => i + 1);
}


  dane_in: any = [];

  AxiosGet = async () => {
    console.log("axios dane")
    let client = axios.create({
      baseURL: "http://localhost:3000"
    });
    try {
      const response = await client.get(`/api/fadle/`);
      this.dane_in = response.data
      this.allData = this.dane_in.map((obj: { nazwa: string; ikona: string }) => ({
        nazwa: obj.nazwa,
        ikona: obj.ikona
      }));
      this.allData.sort((a, b) => a.nazwa.localeCompare(b.nazwa, 'en'))
    } catch (error) {
      console.log("error", error);
    }
    
  };
  allData: DataItem[] = [];

  async ngOnInit() {
    await this.AxiosGet()
  }
  isplaceble: boolean = false;
  Skladnik1: string = "";
  Skladnik: string[] = [];
  itemIleUpdate(){
    const diff = this.itemIle - this.Skladnik.length;
    if (diff < 0) {
    this.Skladnik.splice(this.itemIle);
  }
  }

  dodaj = async(f:NgForm)=>{await this.AxiosPost(); await this.AxiosGet()}

  AxiosPost = async () => {
    let client = axios.create({
      baseURL: "http://localhost:3000"
    });
    try {
      console.log(this.Skladnik)
      this.Skladnik = this.Skladnik.map(item => item === undefined ? '0' : item);
      console.log(this.Skladnik)
      let danePost: DataPost =
      {
        nazwa: this.Nazwa,
        ikona: this.Ikona,
        isplaceble: this.isplaceble,
        kategoria: this.KategoriaIn,
        item1: this.Skladnik[0] ===undefined  ? '' : this.Skladnik[0] ,
        item2: this.Skladnik[1] ===undefined  ? '' : this.Skladnik[1] ,
        item3: this.Skladnik[2] ===undefined  ? '' : this.Skladnik[2] ,
        item4: this.Skladnik[3] ===undefined  ? '' : this.Skladnik[3] ,
        item5: this.Skladnik[4] ===undefined  ? '' : this.Skladnik[4] ,
        item6: this.Skladnik[5] ===undefined  ? '' : this.Skladnik[5] 
      }
      console.log(danePost)
      const response = await client.post(`/api/fadle/`,JSON.stringify(danePost),{
    headers: {
      'Content-Type': 'application/json'
    }
    });
      console.log("---->> ", response.data.message);
    } catch (error) {
      console.log("error", error);
    }
    this.Nazwa = ''
    this.Ikona = ''
    this.isplaceble = false
    this.KategoriaIn = ''
    this.Skladnik = ['','','','','','']


  };


    HintText(): void {
      if (this.Nazwa) {
        var cleaned = this.Nazwa.trim().replace(/\s+/g, '_');
        this.Ikona = `${cleaned}.png`;
      } else {
        this.Ikona = '';
      }
    }



}


