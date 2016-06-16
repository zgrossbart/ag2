import { Injectable }     from '@angular/core';
import { Http, Headers, HTTP_PROVIDERS, URLSearchParams, Response } from '@angular/http';
import { BuildInfo }      from './buildInfo';
import { Observable }     from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class BuildInfoService {
  constructor (private http: Http) {}
  private buildInfoUrl = './build-info.jso';  // URL to web API
  getBuildInfo() {
    console.log('getting build info from: ' + this.buildInfoUrl);
    var r = /*this.http.get(this.buildInfoUrl)
                    .map(res => res.json())
                    .catch(this.handleError);*/
  this.http
  .get(this.buildInfoUrl).catch((err, retry) => {
    return this.showLogin()
      .flatMap(v => v ? retry : Observable.throw(err));
  })
  /*.catch((err, retry) => Observable
    .timer(10000, -1)
    .flatMap(_ => retry));*/
    
    console.log('done getting build info');
    return r;
  }

  showLogin() : Observable<{}> {
      console.log('showLogin...');
      return this.http.get(this.buildInfoUrl + 'n')
                    .map(res => res.json())
                    .catch(this.handleError);

  }

  private extractData(res: Response) {
    console.log('res.json(): ' + res.json());
    let body = res.json();
    return body.data || { };
  }
  private handleError (error: any) {
      console.log('handleError...');
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return this.http.get(this.buildInfoUrl + 'n')
                    .map(res => res.json())
                    .catch(this.handleError);
    //return Observable.create(new Observable<BuildInfo>());
  }
}