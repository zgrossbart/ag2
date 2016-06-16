import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent } from './app.component';
import { BuildInfoService } from './buildInfoService';

bootstrap(AppComponent, [HTTP_PROVIDERS, BuildInfoService]);
