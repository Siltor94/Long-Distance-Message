import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class ApiService {
    constructor(public http: Http) {

    }

    public postMessage(message: Object): Promise<any> {
    
        return new Promise((resolve, reject) => {
            this.http.post("http://172.16.4.234:5000/sms", message)
                .subscribe(
                response => resolve(response),
                err => reject(err)
                );
        });
    }

}