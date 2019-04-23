import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor(
		private http: HttpClient,
	) { }

	city(data: any) {
		return this.http.post(environment.apiUrl + '/citysearch', { city: data });
	}
}
