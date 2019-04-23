import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
	selector: 'app-typehead',
	templateUrl: './typehead.component.html',
	styleUrls: ['./typehead.component.scss']
})
export class TypeheadComponent {

	private cityList: any;
	private selectCity: string;
	private text: Object;
	private searchValue: string = '';

	constructor(
		private apiService: ApiService,
	) {
		this.cityList = [];
		this.selectCity = '';
		this.text = {
			label: 'City name',
			button: 'Search city on the GOOGLE',

		}
	}

	onKey(event: any) {
		if (event.target.value.length >= 1) {
			this.apiService
				.city(event.target.value)
				.subscribe(cityList => {
					console.log('state', cityList);
					this.cityList = cityList !== '' ? cityList : [];
				})
		} else {
			this.cityList = [];
		}
	}

	selectFromSuggestions(data) {
		this.selectCity = data;
	}

	clearSearch() {
		this.searchValue = ' ';
	}

	goToGoogle(data) {
		window.open('https://www.google.com/search?q=' + data + '&tbm=isch', '_blank');
		this.cityList = [];
		this.clearSearch();
	}
}
