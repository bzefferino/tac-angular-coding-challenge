import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ErrorModalComponent, ErrorModalHelper } from './components/errorModal/errorModal.component';
import { LoadingOverlayComponent } from './components/loadingOverlay/loading-overlay/loading-overlay.component';
import { PeopleLookupComponent } from './pages/people/lookup/peopleLookup';
import { MomentPipe } from './pipes/momentPipe';
import { PeopleComponent } from './pages/people/edit/people';

// Instead of having the routes in a separate module,
// I added them here so that they are contained within the module they apply
// This is not how I'm used to having them, but since I was adding the routes
// to an existing project I figured it made sense to try it this way
const routes: Routes = [
  { path: '', redirectTo: '/people', pathMatch: 'full' },
  { path: 'people/:id/edit', component: PeopleComponent },
  { path: 'people/:id', component: PeopleComponent },
  { path: 'people', component: PeopleLookupComponent },
  { path: '**', redirectTo: '/people' },

]

@NgModule({
  declarations: [
    AppComponent,
    ErrorModalComponent,
    MomentPipe,
    PeopleLookupComponent,
    PeopleComponent,
    LoadingOverlayComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ErrorModalHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
