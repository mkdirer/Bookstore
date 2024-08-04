package backend.model;

import java.time.LocalDate;

public class Rating {

    private Integer id;
    private Integer userId;
    private Integer bookId;
    private LocalDate dateAdded;
    private Integer rating;
    private String comment;

    public Rating() {}

    public Rating(Integer id, Integer userId, Integer bookId, LocalDate dateAdded, Integer rating, String comment) {
        this.id = id;
        this.userId = userId;
        this.bookId = bookId;
        this.dateAdded = dateAdded;
        this.rating = rating;
        this.comment = comment;
    }

    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public Integer getUserId() { return userId; }

    public void setUserId(Integer userId) { this.userId = userId; }

    public Integer getBookId() { return bookId; }

    public void setBookId(Integer bookId) { this.bookId = bookId; }

    public LocalDate getDateAdded() { return dateAdded; }

    public void setDateAdded(LocalDate dateAdded) { this.dateAdded = dateAdded; }

    public Integer getRating() { return rating; }

    public void setRating(Integer rating) { this.rating = rating; }

    public String getComment() { return comment; }

    public void setComment(String comment) { this.comment = comment; }
}
