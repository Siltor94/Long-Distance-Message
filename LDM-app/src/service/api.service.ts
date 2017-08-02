import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class ApiService {
    constructor(public http: Http) {

    }

    public postMessage(message: Object): Promise<any> {
    
        return new Promise((resolve, reject) => {
            this.http.post("raspberryIP/send_sms", message)
                .subscribe(
                response => resolve(response),
                err => reject(err)
                );
        });
    }

}