import { Component, OnInit} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import axios, { Axios } from 'axios';
import {  NgSelectModule } from '@ng-select/ng-select';

interface DataItem {
  nazwa: string;
  ikona: string;
  isplaceble: boolean
  kategoria: string
  item1: string
  item2: string
  item3: string
  item4: string
  item5: string
  item6: string
}

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
 
})

export class SearchComponent implements OnInit {
  //id przedmiotu ktory sie zgaduje
  GoalId: string = "98"

  //localhost
  BazaUrl: string = "http://localhost:3000"

  //tailscale
  //BazaUrl: string = "http://100.98.82.17:3000"

  //pagekite
  //BazaUrl: string = "https://baza-szymin.pagekite.me"

  none: string = '#e1c48b40'
  good: string = 'green'
  bad: string = '#ff3020'
  // funkcja do pobierania danych z bazy danych
  dane_in: any = [];
  AxiosGet = async () => {
    console.log("axios dane")
    let client = axios.create({
      baseURL: this.BazaUrl
    });
    try {
      const response = await client.get(`/api/fadle/`);
      this.dane_in = response.data
      this.allData = this.dane_in.map((obj: { 
        nazwa: string
        ikona: string 
        isplaceble: boolean
        kategoria: string
        item1: string
        item2: string
        item3: string
        item4: string
        item5: string
        item6: string
      }) => ({
        nazwa: obj.nazwa,
        ikona: obj.ikona,
        isplaceble: obj.isplaceble,
        kategoria: obj.kategoria,
        item1: obj.item1,
        item2: obj.item2,
        item3: obj.item3,
        item4: obj.item4,
        item5: obj.item5,
        item6: obj.item6
      }));
      this.allData.sort((a, b) => a.nazwa.localeCompare(b.nazwa, 'en'))
      console.log(this.allData)
    } catch (error) {
      console.log("error", error);
    }
    
  };

  // dane do pobierania danych z serwera 
  allData: DataItem[] = [];
  // --//-- od uzytkownika
  Zgadnij: string = '';
  // pobranie z bazy danych przy starcie
  async ngOnInit() {
    await this.AxiosGet()
    await this.AxiosGetId()
  }

  Strzaly: DataItem[] = [];
  // funkcja obslugujace zmienna strzalow
  sprawdz(){
    const index = this.allData.findIndex(item => item.nazwa === this.Zgadnij);

    if (index !== -1) {
    const znaleziony = this.allData[index];
    this.Strzaly.push(znaleziony);
    this.allData.splice(index, 1);
    this.allData = [...this.allData];
    if (this.Zgadnij==this.daneGoal.nazwa){this.zrobicGifiWin()}
    this.Zgadnij = ''
  } else {
    console.log('Nie znaleziono elementu o podanej nazwie.');
  }

  }

  // funkcja zamieniajaca nazwe przedmiotu na nazwe obrazka
  // (funkcja skrótowa)
  getImagePath(name: string | null): string {
    if (!name) return '';
    return 'assets/images/' + name.replace(/ /g, '_') + '.png';
  }

  // Częsc przedmiotu do zgadywania

  
  daneGoal: DataItem ={
    nazwa: '',
    ikona: '',
    isplaceble: false,
    kategoria: '',
    item1: '',
    item2: '',
    item3: '',
    item4: '',
    item5: '',
    item6: ''
  }

  AxiosGetId = async () => {
    console.log("axios id")
    let client = axios.create({
      baseURL: this.BazaUrl
    });
    try {
      console.log(`/api/fadle/`+ this.GoalId)
      const response = await client.get(`/api/fadle/`+ this.GoalId);
      console.log(response.data)
      this.daneGoal = response.data
    } catch (error) {
      console.log("error", error);
    }
    
  };


  // gif ktory sie wyswietli jak sie zgadnie
  zrobicGifiWin() {
  const gif = document.createElement('img');
  gif.src = 'assets/images/train_gif_glass.gif';
  gif.style.position = 'fixed';
  gif.style.top = '0';
  gif.style.left = '0';
  gif.style.width = '100vw'; 
  gif.style.height = 'auto'; 
  gif.style.zIndex = '99'; 
  gif.style.objectFit = 'cover'; 
  gif.style.pointerEvents = 'none'; 

  document.body.appendChild(gif);

  setTimeout(() => {
    document.body.removeChild(gif);
  }, 2200);
}

}
