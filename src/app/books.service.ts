import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  serverURL = environment.serviceURL

  constructor(private http :HttpClient) { }

  //add book
  addBook(bookData: any){
    return this.http.post(`${this.serverURL}/books`, bookData);
  }

  //get all the books
  getBooks(){
    return this.http.get(`${this.serverURL}/books`);
  }

  //get book by isbn
  getBookByIsbn(isbn: string){
    return this.http.get<any>(`${this.serverURL}/books/${isbn}`);
  }

  //edit a book using isbn number
  editBook(isbn: string, newData: any){
    return this.http.put(`${this.serverURL}/books/${isbn}`, newData);
  }

  // Delete a book by ISBN number
  deleteBook(isbn: string){
    return this.http.delete(`${this.serverURL}/books/${isbn}`);
  }
}
