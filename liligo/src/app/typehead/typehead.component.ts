import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Component({
	selector: 'app-typehead',
	templateUrl: './typehead.component.html',
	styleUrls: ['./typehead.component.scss']
})
export class TypeheadComponent {

	private cityList: any;
	private selectCity: string;
	private text: object;

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
		this.selectCity = '';
		if (event.target.value.length >= 1) {
			this.apiService
				.city(event.target.value)
				.subscribe(cityList => {
					this.cityList = cityList !== '' ? cityList : [];
				})
		} else {
			this.cityList = [];
		}
	}

	selectFromSuggestions(data) {
		this.cityList.city = [];
		this.cityList.city.push(data);
		this.selectCity = data;
	}

	goToGoogle(data) {
		window.open(environment.google + '/search?q=' + data + '&tbm=isch', '_blank');
		this.cityList.city = [];
	}
}
