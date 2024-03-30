import { Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BooksFormComponent } from './books-form/books-form.component';

export const routes: Routes = [
  { path: 'form', component: BooksFormComponent },
  { path: 'list', component: BookListComponent }
];
