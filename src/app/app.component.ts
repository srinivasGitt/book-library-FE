import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BooksFormComponent } from './books-form/books-form.component';
import { BookListComponent } from './book-list/book-list.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, BooksFormComponent, BookListComponent, NavbarComponent],
    providers: [
      HttpClientModule
    ],
})
export class AppComponent {
  title = 'book-library-FE';
}
