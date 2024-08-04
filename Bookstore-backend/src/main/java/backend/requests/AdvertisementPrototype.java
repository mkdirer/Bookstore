package backend.requests;

public class AdvertisementPrototype
{
    private Integer bookId;
    private String message;
    private String type;
    private Integer userId;

    public AdvertisementPrototype(Integer bookId, String message, String type, Integer userId) {
        this.bookId = bookId;
        this.message = message;
        this.type = type;
        this.userId = userId;
    }

    public AdvertisementPrototype() {
    }

    public String getMessage() {
        return message;
    }

    public Integer getBookId() {
        return bookId;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getType() {
        return type;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setType(String type) {
        this.type = type;
    }
}
