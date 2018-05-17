import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ErrorHandler, NgModule } from '@angular/core'
import { CustomErrorHandler } from './error-handler/custom-error-handler';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireStorageModule } from 'angularfire2/storage'
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { environment } from '../environments/environment'

import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'
import { SharedModule } from './shared/shared.module'
import { PostsModule } from './posts/posts.module'
import { RoutingModule } from './routing.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MediaMatcher } from '@angular/cdk/layout';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    CoreModule,
    SharedModule,
    PostsModule,
    RoutingModule,
    FormsModule,
    HttpClientModule,
    CdkTableModule,
    ReactiveFormsModule
  ],
  entryComponents: [NavbarComponent],
  providers: [{ provide: ErrorHandler, useClass: CustomErrorHandler }],
  bootstrap: [AppComponent, NavbarComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);