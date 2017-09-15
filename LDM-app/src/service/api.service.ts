import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {
    private data: any;
    private ip = "http://172.16.16.121:5000/sms";

    constructor(public http: Http) {

    }
    // simple requete post ou on passe en param l'objet contenant le numéro et le numéro à l'api
    public postMessage(message: Object): Promise<any> {

        return new Promise((resolve, reject) => {
            this.http.post(this.ip, message)
                .subscribe(
                response => resolve(response),
                err => reject(err)
                );
        });
    }

    getAPI(): Promise<any> {
        return this.http.get(this.ip).toPromise()
    }

    getJsonData() {
        console.log(this.http.get('assets/conv.json').map(res => res.json()));
        return this.http.get('assets/conv.json').map(res => res.json());
    }

    public getMessage(num): Promise<any> {

        return new Promise((resolve, reject) => {
            this.http.get(this.ip + "/" + num).map(res => res.json())
                .subscribe(
                response => resolve(response),
                err => reject(err)
                );
        });
    }

}