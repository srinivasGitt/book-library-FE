import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  serverURL = "http://localhost:3001/books/"

  constructor(private http :HttpClient) { }

  //add book
  addBook(bookData: any){
    return this.http.post(this.serverURL, bookData)
  }

  //get all the books
  getBooks(){
    return this.http.get(this.serverURL);
  }

  //get book by isbn
  getBookByIsbn(isbn: string){
    return this.http.get<any>(`${this.serverURL}${isbn}`);
  }

  //edit a book using isbn number
  editBook(isbn: string, newData: any){
    return this.http.put(`${this.serverURL}${isbn}`, newData);
  }

  // Delete a book by ISBN number
  deleteBook(isbn: string){
    return this.http.delete(`${this.serverURL}${isbn}`);
  }
}
