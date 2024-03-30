export interface Book {
  title: String,
  author: String,
  description: String,
  publicationYear: Number,
  isbn: { type: String, unique: true }
  // Add more properties as needed
}
