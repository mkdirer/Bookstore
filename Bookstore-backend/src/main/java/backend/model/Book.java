package backend.model;

public class Book {

    private Integer id;
    private String isbn;
    private String author;
    private String title;
    private Integer year;
    private String publisher;
    private String domain;

    public Book() {}

    public Book(Integer id, String isbn, String author, String title, Integer year, String publisher, String domain) {
        this.id = id;
        this.isbn = isbn;
        this.author = author;
        this.title = title;
        this.year = year;
        this.publisher = publisher;
        this.domain = domain;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public String getPublisher() { return publisher; }
    public void setPublisher(String publisher) { this.publisher = publisher; }

    public String getDomain() { return domain; }
    public void setDomain(String domain) { this.domain = domain; }

    public static class BookWithRating {
        public Book book;
        public Double rating;

        public BookWithRating() {}

        public BookWithRating(Book b, Double r) {
            this.book = b;
            this.rating = r;
        }

        public Book getBook() {
            return this.book;
        }

        public void setBook(Book b) {
            this.book = b;
        }

        public Double getRating() {
            return this.rating;
        }

        public void setRating(Double r) {
            this.rating = r;
        }
    }
}

