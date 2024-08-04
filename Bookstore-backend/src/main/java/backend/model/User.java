package backend.model;

public class User {
    private Integer id;
    private String login;
    private String password;
    private String fname;
    private String lname;
    private String email;
    private String phone;
    private Boolean ismoderator;
    private String avatar;

    public User() {}

    public User(Integer id,
                String login,
                String password,
                String fname,
                String lname,
                String email,
                String phone,
                Boolean ismoderator,
                String avatar) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.phone = phone;
        this.ismoderator = ismoderator;
        this.avatar = avatar;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setIsmoderator(Boolean ismoderator) {
        this.ismoderator = ismoderator;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getLogin() {
        return login;
    }

    public String getPassword() {
        return password;
    }

    public String getFname() {
        return fname;
    }

    public String getLname() {
        return lname;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public Boolean getIsmoderator() {
        return ismoderator;
    }

    public String getAvatar() {
        return avatar;
    }
}
