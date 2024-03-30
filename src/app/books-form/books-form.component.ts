import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BooksService } from '../books.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './books-form.component.html',
  styleUrl: './books-form.component.css'
})
export class BooksFormComponent {
  bookForm!: FormGroup;


  constructor(private fb: FormBuilder, private bookService:BooksService, private router: Router){

  }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', Validators.required],
      description: ['', Validators.required],
      publicationYear: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)]],
      isbn: ['', [Validators.required,Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)]]
    });

    this.bookService.getBooks().subscribe(
      (res)=>{
        console.log(res);
      }
    )
  }

  get f() { return this.bookForm.controls; }

  getJson(){
    const bookData = {
      title:this.bookForm.get('title')?.value,
      author:this.bookForm.get('author')?.value,
      description:this.bookForm.get('description')?.value,
      publicationYear:this.bookForm.get('publicationYear')?.value,
      isbn:this.bookForm.get('isbn')?.value
    }
    return bookData;
  }

  onSubmit() {
    if (this.bookForm.valid) {
      console.log(this.bookForm.value);
        // Navigate to another route if the form is valid
        this.router.navigate(['/list']);

    }
    const bookData = this.getJson();
    this.bookService.addBook(bookData).subscribe(
      (res)=>{
        console.log('Book added successfully:', res);
        // Reset the form after successful submission
        this.bookForm.reset();
      },
      (error) => {
        console.error('Error adding book:', error);
      }

    )

  }

}
