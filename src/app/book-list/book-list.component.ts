import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BooksService } from '../books.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {

  totalItems!:any; // Example total number of items
  itemsPerPage = 1; // Example items per page
  currentPage = 1;


  bookForm!: FormGroup;
  searchTerm: any;
  books:any;
  showTable =  true;
  showForm = false;
  editForm!: FormGroup;
  displayedBooks: any;
  submitted = false;

  constructor(private fb:FormBuilder, private bookService:BooksService){}


  ngOnInit(): void {
    this.editForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', Validators.required],
      description: ['', Validators.required],
      publicationYear: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)]],
      isbn: ['', [Validators.required,Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)]]
    });
    this.fetchBooks();
  }

  get f() { return this.editForm.controls; }


  fetchBooks(){
    this.bookService.getBooks()
      .subscribe(
        (res) => {
          this.books = res;
          this.totalItems = this.books.length;
          this.updateDisplayedBooks();
          console.log(this.books)
        },
        error => {
          console.error('Error fetching books:', error);
        }
      );
  }


  search() {
    if (this.searchTerm.trim() === '') {
      // If search term is empty, reset the book list to show all books
      this.fetchBooks();
    } else {
      // Filter books based on search term
      this.books = this.books.filter((book: { title: string;}) =>
        book.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        // Add more conditions if needed
      );
    }
  }

  getJson(){
    const editData = {
      title:this.editForm.get('title')?.value,
      author:this.editForm.get('author')?.value,
      description:this.editForm.get('description')?.value,
      publicationYear:this.editForm.get('publicationYear')?.value,
      isbn:this.editForm.get('isbn')?.value
    }
    return editData;
  }

  openForm(isbn:any){
    this.showTable = !this.showTable;
    this.showForm = !this.showForm;
    const book = this.books.find((b: { isbn: any; }) => b.isbn === isbn);

      // Fetch the details of the book using the ISBN
      this.bookService.getBookByIsbn(isbn).subscribe(
        (res) => {
          console.log(res);
          this.editForm.patchValue({
            title: res?.title,
            author: res?.author,
            description: res?.description,
            publicationYear: res?.publicationYear,
            isbn: res?.isbn
          });
          console.log(this.editForm.value);
        },
        (error) => {
          console.error('Error fetching book details:', error);
          // Handle error (e.g., display error message to the user)
        }
      );

  }


  //method to edit book
  editBook(isbn: string) {
    this.showTable = !this.showTable;
    this.showForm = !this.showForm;
    const newData = this.editForm.value;
    this.submitted = true;

   if(this.editForm.invalid){
    this.showForm = true;
    this.showTable = false;
    return;
   }
    this.bookService.editBook(isbn, newData)
      .subscribe(
        updatedBook => {
          // Handle success (e.g., update local book data)
          console.log('Book edited successfully:', updatedBook);
          this.fetchBooks();
        },
        error => {
          console.error('Error editing book:', error);
        }
      );
  }

  deleteBook(isbn: string) {
    this.bookService.deleteBook(isbn)
      .subscribe(
        (res) => {
          // Handle success (e.g., remove book from local book data)
          console.log('Book deleted successfully');
          // Remove the book from the local array
          this.books = this.books.filter((book: { isbn: string; }) => book.isbn !== isbn && book.isbn.trim() !== '');

        },
        error => {
          console.error('Error deleting book:', error);
        }
      );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateDisplayedBooks();
  }

  // Method to update displayed books based on pagination
  updateDisplayedBooks(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    this.displayedBooks = this.books.slice(startIndex, endIndex);
  }



}
