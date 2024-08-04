package backend.model;

import java.time.LocalDate;

public class Advertisement {

    private Integer id;
    private Integer userId;
    private Integer bookId;
    private LocalDate dateAdded;
    private String message;
    private String type;
    private Integer receiverId;
    private Double price;
    private LocalDate dateFinished;
    private String status;

    public Advertisement() {}

    public Advertisement(Integer id, Integer userId, Integer bookId, LocalDate dateAdded, String message, String type, Integer receiverId, Double price, LocalDate dateFinished, String status) {
        this.id = id;
        this.userId = userId;
        this.bookId = bookId;
        this.dateAdded = dateAdded;
        this.message = message;
        this.type = type;
        this.receiverId = receiverId;
        this.price = price;
        this.dateFinished = dateFinished;
        this.status = status;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) { this.id = id; }

    public Integer getUserId() { return userId; }

    public void setUserId(Integer userId) { this.userId = userId; }

    public Integer getBookId() { return bookId; }

    public void setBookId(Integer bookId) { this.bookId = bookId; }

    public LocalDate getDateAdded() { return dateAdded; }

    public void setDateAdded(LocalDate dateAdded) { this.dateAdded = dateAdded; }

    public String getMessage() { return message; }

    public void setMessage(String message) { this.message = message; }

    public String getType() { return type; }

    public void setType(String type) { this.type = type; }

    public Integer getReceiverId() { return receiverId; }

    public void setReceiverId(Integer receiverId) { this.receiverId = receiverId; }

    public Double getPrice() { return price; }

    public void setPrice(Double price) { this.price = price; }

    public LocalDate getDateFinished() { return dateFinished; }

    public void setDateFinished(LocalDate dateFinished) { this.dateFinished = dateFinished; }

    public String getStatus() { return status; }

    public void setStatus(String status) { this.status = status; }
}
