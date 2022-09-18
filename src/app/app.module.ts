import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ErrorModalComponent, ErrorModalHelper } from './components/errorModal/errorModal.component';
import { MomentPipe } from './pipes/momentPipe';
import { PeopleLookupComponent as PeopleLookupComponent } from './pages/people/lookup/peopleLookup';
import { PeopleEditComponent } from './pages/people/edit/people-edit/people-edit.component';
import { LoadingOverlayComponent } from './components/loadingOverlay/loading-overlay/loading-overlay.component';

// Instead of having the routes in a separate module,
// I added them here so that they are contained within the module they apply
// This is not how I'm used to having them, but since I was adding the routes
// to an existing project I figured it made sense to try it this way
const routes: Routes = [
  { path: '', redirectTo: '/people', pathMatch: 'full' },
  { path: 'people/:id/edit', component: PeopleEditComponent },
  { path: 'people', component: PeopleLookupComponent },
  { path: '**', redirectTo: '/people' },

]

@NgModule({
  declarations: [
    AppComponent,
    ErrorModalComponent,
    MomentPipe,
    PeopleLookupComponent,
    PeopleEditComponent,
    LoadingOverlayComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ErrorModalHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
