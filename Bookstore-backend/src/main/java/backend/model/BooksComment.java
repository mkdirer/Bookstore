package backend.model;

import java.time.LocalDateTime;

public class BooksComment {

    private Integer id;
    private Integer userId;
    private Integer bookId;
    private String comment;
    private LocalDateTime dateAdded;
    private String avatar;
    private String fname;
    private String lname;

    public BooksComment() {}

    public BooksComment(Integer id, Integer userId, Integer bookId, String comment, LocalDateTime dateAdded, String avatar, String fname, String lname) {
        this.id = id;
        this.userId = userId;
        this.bookId = bookId;
        this.comment = comment;
        this.dateAdded = dateAdded;
        this.avatar = avatar;
        this.fname = fname;
        this.lname = lname;
    }

    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public Integer getUserId() { return userId; }

    public void setUserId(Integer userId) { this.userId = userId; }

    public Integer getBookId() { return bookId; }

    public void setBookId(Integer bookId) { this.bookId = bookId; }

    public String getComment() { return comment; }

    public void setComment(String comment) { this.comment = comment; }

    public LocalDateTime getDateAdded() { return dateAdded; }

    public void setDateAdded(LocalDateTime dateAdded) { this.dateAdded = dateAdded; }

    public String getAvatar() { return avatar; }

    public void setAvatar(String avatar) { this.avatar = avatar; }

    public String getFname() { return fname; }

    public void setFname(String fname) { this.fname = fname; }

    public String getLname() { return lname; }

    public void setLname(String lname) { this.lname = lname; }
}
