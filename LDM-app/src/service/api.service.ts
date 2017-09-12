import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {
    constructor(public http: Http) {

    }
    // simple requete post ou on passe en param l'objet contenant le numéro et le numéro à l'api
    public postMessage(message: Object): Promise<any> {
        
        return new Promise((resolve, reject) => {
            this.http.post("http://172.16.4.234:5000/sms", message)
                .subscribe(
                response => resolve(response),
                err => reject(err)
                );
        });
    }
    
    getAPI(): Promise<any> {
        return this.http.get("http://172.16.4.234:5000/").toPromise()
    }

}