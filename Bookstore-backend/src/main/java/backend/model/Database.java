package backend.model;

import backend.requests.LoginRequest;
import jakarta.json.JsonObject;

import java.sql.*;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Database {

    private static final Logger logger = Logger.getLogger(Database.class.getName());
    private Book book;
    private Advertisement ad;
    private Connection conn = null;
    private User user;
    private PreparedStatement prestmt = null;
    private Statement stmt = null;
    private ResultSet rset = null;
    private List<Book> list = new ArrayList<Book>();
    private List<Advertisement> advertisementList = new ArrayList<Advertisement>();
    private List<Rating> ratingList = new ArrayList<Rating>();
    private List<BooksComment> booksCommentList = new ArrayList<BooksComment>();
    private List<OffersComment> offersCommentList = new ArrayList<OffersComment>();

    public Database() {
        try {
            Class.forName("org.postgresql.Driver");
        } catch (Exception ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        }
        String url = "jdbc:postgresql://br_database:5432/postgres";
        String username = "postgres";
        String password = "postgres";
        try {
            conn = DriverManager.getConnection(url, username, password);
            logger.log(Level.INFO, "Connected to Database");
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }

    /**
     * Returns a list of all books in the database.
     *
     * @return the list of books
     */
    public List<Book> getBooksList() {
        try {
            stmt = conn.createStatement();
            String sql = "SELECT * FROM public.\"Books\";";
            rset = stmt.executeQuery(sql);
            while (rset.next()) {
                book = fillBookFromResult(rset);
                list.add(book);
            }
            rset.close();
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
        logger.log(Level.INFO, "Retrieved all book entries (" + list.size() + ") from database");
        return list;
    }

    /**
     * Creates a new book in the database.
     *
     * @param book the book to create
     */
    public void createBook(Book book) {
        try {
            prestmt = conn.prepareStatement("INSERT INTO public.\"Books\" (isbn, author, title, year, publisher, domain) VALUES (?, ?, ?, ?, ?, ?)");
            prestmt.setString(1, book.getIsbn());
            prestmt.setString(2, book.getAuthor());
            prestmt.setString(3, book.getTitle());
            prestmt.setInt(4, book.getYear());
            prestmt.setString(5, book.getPublisher());
            prestmt.setString(6, book.getDomain());
            prestmt.executeUpdate();
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
        logger.log(Level.INFO, "Created new book of ISBN = " + book.getIsbn() + "in database");
    }

    /**
     * Returns list of all books rated by user according to id
     *
     * @param userId userId to match
     * @return the list of books
     */
    public List<Book> searchBooksRatedByUserId(int userId) {
        try {
            prestmt = conn.prepareStatement("SELECT bo.* FROM public.\"Ratings\" as rat join public.\"Books\" as bo on rat.book_id=bo.id where user_id = ?;");
            prestmt.setInt(1, userId);
            rset = prestmt.executeQuery();
            while (rset.next()) {
                book = fillBookFromResult(rset);
                list.add(book);
            }
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
        logger.log(Level.INFO, "Found " + list.size() + " entries matching user id:'" + userId + "'");

        return list;
    }

   /**
     * Returns list of all books by user id
     *
     * @param userId userId to match
     * @return the list of books
     */
    public List<Book> searchBooksByUserId(int userId) {
        try {
            prestmt = conn.prepareStatement("select bo.* from public.\"Offers\" as of left join public.\"Users\" as us on us.id=of.user_id left join public.\"Books\" as bo on book_id=bo.id where user_id = ?;");
            prestmt.setInt(1, userId);
            rset = prestmt.executeQuery();
            while (rset.next()) {
                book = fillBookFromResult(rset);
                list.add(book);
            }
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
        logger.log(Level.INFO, "Found " + list.size() + " entries matching user id:'" + userId + "'");

        return list;
    }

    /**
     * Returns list of all books with matching names
     *
     * @param param parameter to match
     * @param value value of that parameter (case-insensitive)
     * @return the list of books
     */
    public List<Book> searchBooksByNameOrAuthor(String param, String value) {
        try {
            prestmt = conn.prepareStatement("SELECT * FROM public.\"Books\"  WHERE LOWER( "+param+" ) LIKE ?");
            prestmt.setString(1, "%" + value.toLowerCase() + "%");
	logger.log(Level.INFO, "Returned books by " + prestmt.toString());
            rset = prestmt.executeQuery();
            while (rset.next()) {
                book = fillBookFromResult(rset);
                list.add(book);
            }
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
        logger.log(Level.INFO, "Returned books by " + param);
        logger.log(Level.INFO, "Found " + list.size() + " entries matching '" + value + "'");

        return list;
    }

    public List<Book> filterBooksByStatus(Integer value) {
        try {
            String sql_str = "SELECT b.* FROM public.\"Books\" b INNER JOIN public.\"Offers\" o ON o.book_id = b.id WHERE o.status = ?";
            prestmt = conn.prepareStatement(sql_str);
            prestmt.setInt(1, value);
            rset = prestmt.executeQuery();
            while (rset.next()) {
                book = fillBookFromResult(rset);
                list.add(book);
            }

        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
        logger.log(Level.INFO, "Filtering books by status in offers");
        logger.log(Level.INFO, "Found: " + list.size() + " books with status: " + value);
        return list;
    }


    private Book fillBookFromResult(ResultSet rset) throws SQLException {
        Book newBook = new Book();
        newBook.setId(rset.getInt("id"));
        newBook.setIsbn(rset.getString("isbn"));
        newBook.setAuthor(rset.getString("author"));
        newBook.setTitle(rset.getString("title"));
        newBook.setYear(rset.getInt("year"));
        newBook.setPublisher(rset.getString("publisher"));
        newBook.setDomain(rset.getString("domain"));

        return newBook;
    }

    public UserLoginHelper verifyLogin(LoginRequest loginRequest) {
        UserLoginHelper helper=new UserLoginHelper();
        try {
            prestmt = conn.prepareStatement("SELECT * FROM public.\"Users\" users WHERE users.login = ? AND users.password = MD5(?)");
            prestmt.setString(1, loginRequest.getLogin());
            prestmt.setString(2, loginRequest.getPassword());
            rset = prestmt.executeQuery();
            if (!rset.isBeforeFirst()) return helper;
            rset.next();
            helper.userId = rset.getInt("id");
            helper.avatar = rset.getString("avatar");
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        }
        logger.log(Level.INFO, "User login event");
        logger.log(Level.WARNING, helper.userId + " logged in");
        return helper;
    }

    public boolean isModerator(LoginRequest loginRequest) {
        try {
            prestmt = conn.prepareStatement("SELECT * FROM public.\"Users\" users WHERE users.login = ? AND users.password = MD5(?)");
            prestmt.setString(1, loginRequest.getLogin());
            prestmt.setString(2, loginRequest.getPassword());
            rset = prestmt.executeQuery();
            if (rset.next()) {
                boolean isModerator = rset.getBoolean("ismoderator");
                return isModerator;
            }
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
        logger.log(Level.INFO, "User login event");
        return false;
    }

    public Boolean createUser(User user) {
        try {
            //checking for if user already exists
            prestmt = conn.prepareStatement("SELECT 1 FROM public.\"Users\" WHERE login=? OR email=? LIMIT 1");
            prestmt.setString(1, user.getLogin());
            prestmt.setString(2, user.getEmail());
            rset = prestmt.executeQuery();
            if (rset.isBeforeFirst())
                return false;
            rset.close();
            prestmt.close();

            // adding user
            prestmt = conn.prepareStatement(" INSERT INTO public.\"Users\" (login, password, fname, lname, email, phone, avatar, ismoderator) VALUES (?, MD5(?), ?, ?, ?, ?, ?, ?)");
            prestmt.setString(1, user.getLogin());
            prestmt.setString(2, user.getPassword());
            prestmt.setString(3, user.getFname());
            prestmt.setString(4, user.getLname());
            prestmt.setString(5, user.getEmail());
            prestmt.setString(6, user.getPhone());
            prestmt.setString(7, user.getAvatar());
            prestmt.setBoolean(8, user.getIsmoderator());
            prestmt.executeUpdate();
            logger.log(Level.INFO, "Created new user in database");

        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
        return true;
    }

    public Boolean updateUser(String login, JsonObject userData) {
        try {
            StringBuilder presql_b = new StringBuilder("UPDATE public.\"Users\" SET ");
            Iterator<String> keys_ite = userData.keySet().iterator();
            String key;
            if ( keys_ite.hasNext() ) {
                key = keys_ite.next();
                if( key.equals("password") )
                    presql_b.append(key).append("=MD5(?)");
                else
                    presql_b.append(key).append("=?");
            }
            while( keys_ite.hasNext() ) {
                key = keys_ite.next();
                if( key.equals("password") )
                    presql_b.append(", ").append(key).append("=MD5(?)");
                else
                    presql_b.append(", ").append(key).append("=?");
            }
            presql_b.append(" WHERE login=?");
            String presql = presql_b.toString();

            prestmt = conn.prepareStatement(presql);
            int num = 1;
            keys_ite = userData.keySet().iterator();
            while( keys_ite.hasNext() ) {
                key = keys_ite.next();
                if(key.equals("ismoderator"))
                    prestmt.setBoolean(num, userData.getBoolean(key) );
                else
                    prestmt.setString(num, userData.getString(key));
                num++;
            }
            prestmt.setString(num, login);
            prestmt.executeUpdate();

            logger.log(Level.INFO, "Changed user data");
            return true;
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
        return false;
    }

    public void createAdvertisement(Advertisement advertisement) {
        try {
            prestmt = conn.prepareStatement(" INSERT INTO public.\"Offers\" (user_id, book_id, date_added, message, type, receiver_id, price, date_finished, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            prestmt.setInt(1, advertisement.getUserId());
            prestmt.setInt(2, advertisement.getBookId());
            prestmt.setObject(3, advertisement.getDateAdded());
            prestmt.setString(4, advertisement.getMessage());
            prestmt.setString(5, advertisement.getType());
            prestmt.setInt(6, advertisement.getReceiverId());
            prestmt.setDouble(7, advertisement.getPrice());
            prestmt.setObject(8, advertisement.getDateFinished());
            prestmt.setString(9, advertisement.getStatus());
            prestmt.executeUpdate();
            logger.log(Level.INFO, "Added new advertisement to database");
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
    }

    public void updateAdvertisement(Integer id, Advertisement newAdvertisement) {
        try {
            prestmt = conn.prepareStatement("UPDATE public.\"Offers\" SET user_id=?, book_id=?, date_added=?, message=?, type=?, receiver_id=?, price=?, date_finished=?, status=? WHERE id=?");
            prestmt.setInt(1, newAdvertisement.getUserId());
            prestmt.setInt(2, newAdvertisement.getBookId());
            prestmt.setObject(3, newAdvertisement.getDateAdded());
            prestmt.setString(4, newAdvertisement.getMessage());
            prestmt.setString(5, newAdvertisement.getType());
            prestmt.setInt(6, newAdvertisement.getReceiverId());
            prestmt.setDouble(7, newAdvertisement.getPrice());
            prestmt.setObject(8, newAdvertisement.getDateFinished());
            prestmt.setString(9, newAdvertisement.getStatus());
            prestmt.setInt(10, id);
            prestmt.executeUpdate();
            logger.log(Level.INFO, "Updated existing advertisement of id = " + id + " in database" + prestmt);
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
    }

    public List<Advertisement> getAllAdvertisements() {
        try {
            prestmt = conn.prepareStatement("SELECT offers.\"id\", " +
                    "\"user_id\", " +
                    "\"book_id\", " +
                    "\"date_added\", " +
                    "\"message\", " +
                    "offerType.\"name\" AS \"type\", " +
                    "\"receiver_id\", " +
                    "\"date_finished\", " +
                    "statuses.\"name\" AS \"status\", " +
                    "\"price\" " +
                    "FROM \"public\".\"Offers\" offers\n" +
                    "JOIN \"public\".\"OfferTypes\" offerType ON offers.\"type\"=offerType.\"id\"\n" +
                    "JOIN \"public\".\"OfferStatuses\" statuses ON offers.\"status\"=statuses.\"id\";");
            rset = prestmt.executeQuery();
            while (rset.next()) {
                Advertisement advertisement = fillAdvertisementFromResult(rset);
                advertisementList.add(advertisement);
            }
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
        logger.log(Level.INFO, "Returned all advertisements");
        logger.log(Level.INFO, "Found " + advertisementList.size() + " advertisements!");

        return advertisementList;
    }

    public List<Advertisement> getAllAdvertisementsWithPagination(Integer page, Integer size) {
        try {
            prestmt = conn.prepareStatement("SELECT offers.\"id\", " +
                    "\"user_id\", " +
                    "\"book_id\", " +
                    "\"date_added\", " +
                    "\"message\", " +
                    "offerType.\"name\" as \"type\", " +
                    "\"receiver_id\", " +
                    "\"date_finished\", " +
                    "statuses.\"name\" as \"status\", " +
                    "\"price\" " +
                    "FROM \"public\".\"Offers\" offers " +
                    "JOIN \"public\".\"OfferTypes\" offerType ON offers.\"type\"=offerType.\"id\" " +
                    "JOIN \"public\".\"OfferStatuses\" statuses ON offers.\"status\"=statuses.\"id\" ORDER BY offers.\"id\" ASC LIMIT ? OFFSET ?");
            prestmt.setInt(1, size);
            prestmt.setInt(2, (page - 1) * size);
            rset = prestmt.executeQuery();
            while (rset.next()) {
                Advertisement advertisement = fillAdvertisementFromResult(rset);
                advertisementList.add(advertisement);
            }
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
        logger.log(Level.INFO, "Returned all advertisements");
        logger.log(Level.INFO, "Found " + advertisementList.size() + " advertisements!");

        return advertisementList;
    }

    private Advertisement fillAdvertisementFromResult(ResultSet rset) throws SQLException {
        Advertisement newAdvertisement = new Advertisement();
        newAdvertisement.setId(rset.getInt("id"));
        newAdvertisement.setUserId(rset.getInt("user_id"));
        newAdvertisement.setBookId(rset.getInt("book_id"));
        newAdvertisement.setDateAdded(rset.getDate("date_added").toLocalDate());
        newAdvertisement.setMessage(rset.getString("message"));
        newAdvertisement.setType(rset.getString("type"));
        newAdvertisement.setReceiverId(rset.getInt("receiver_id"));
        newAdvertisement.setPrice(rset.getDouble("price"));
        if (rset.getDate("date_finished") != null) {
            newAdvertisement.setDateFinished(rset.getDate("date_finished").toLocalDate());
        } else {
            newAdvertisement.setDateFinished(new Date(0).toLocalDate());
        }
        newAdvertisement.setStatus(rset.getString("status"));

        return newAdvertisement;
    }

    public User getAccountInfo(String userLogin) {
        try {
            prestmt = conn.prepareStatement("SELECT * FROM public.\"Users\" WHERE login=?");
            prestmt.setString(1, userLogin);
            rset = prestmt.executeQuery();
            if (rset.next()) {
                user = new User();
                user.setId(rset.getInt("id"));
                user.setLogin(rset.getString("login"));
                user.setPassword("HIDDEN");
                user.setLname(rset.getString("lname"));
                user.setFname(rset.getString("fname"));
                user.setEmail(rset.getString("email"));
                user.setPhone(rset.getString("phone"));
                user.setAvatar(rset.getString("avatar"));
                user.setIsmoderator(rset.getBoolean("isModerator"));
            }
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
        logger.log(Level.INFO, "Returned user info for user: " + userLogin);

        return user;
    }

    public User getAccountInfoById(Integer id) {
        try {
            prestmt = conn.prepareStatement("SELECT * FROM public.\"Users\" WHERE id=?");
            prestmt.setInt(1, id);
            rset = prestmt.executeQuery();
            if (rset.next()) {
                user = new User();
                user.setId(rset.getInt("id"));
                user.setLogin(rset.getString("login"));
                user.setPassword("HIDDEN");
                user.setLname(rset.getString("lname"));
                user.setFname(rset.getString("fname"));
                user.setEmail(rset.getString("email"));
                user.setPhone(rset.getString("phone"));
                user.setAvatar(rset.getString("avatar"));
                user.setIsmoderator(rset.getBoolean("isModerator"));
            }
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
        logger.log(Level.INFO, "Returned user info for user with id: " + id);

        return user;
    }

    public Advertisement getOneAdvertisement(Integer id) {
        try {
            prestmt = conn.prepareStatement("SELECT offers.\"id\", \n" +
                    "\"user_id\", " +
                    "\"book_id\", " +
                    "\"date_added\", " +
                    "\"message\", " +
                    "offerType.\"name\" as \"type\", " +
                    "\"receiver_id\", " +
                    "\"date_finished\", " +
                    "statuses.\"name\" as \"status\" " +
                    "FROM \"public\".\"Offers\" offers " +
                    "JOIN \"public\".\"OfferTypes\" offerType ON offers.\"type\"=offerType.\"id\" " +
                    "JOIN \"public\".\"OfferStatuses\" statuses ON offers.\"status\"=statuses.\"id\" " +
                    "WHERE offers.\"id\"=?");
            prestmt.setInt(1, id);
            rset = prestmt.executeQuery();
            if (rset.next()) {
                ad = fillAdvertisementFromResult(rset);
            }
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }

        if (ad != null) {
            logger.log(Level.INFO, "Returned advertisement with id " + ad.getId());
        } else {
            logger.log(Level.INFO, "Did not found advertisement with id " + id);
        }

        return ad;
    }

    public Book searchBookById(Integer id) {
        try {
            prestmt = conn.prepareStatement("SELECT * FROM public.\"Books\"  WHERE id=?");
            prestmt.setInt(1, id);
            rset = prestmt.executeQuery();
            if (rset.next()) {
                book = fillBookFromResult(rset);
            }
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }

        if (book != null) {
            logger.log(Level.INFO, "Returned book with id " + id);
        } else {
            logger.log(Level.INFO, "Did not found book with id " + id);
        }

        return book;
    }

    public List<Book> searchBooksByYear(String year, String sort, Integer page, Integer size) {
        String sql = "";
        logger.log(Level.INFO, "SORT: " + sort);
        switch(sort) {
            case "greater":
                sql = "SELECT * FROM public.\"Books\"  WHERE \"year\">? ORDER BY id ASC LIMIT ? OFFSET ?";
                break;
            case "lower":
                sql = "SELECT * FROM public.\"Books\"  WHERE \"year\"<? ORDER BY id ASC LIMIT ? OFFSET ?";
                break;
            case "none":
                sql = "SELECT * FROM public.\"Books\"  WHERE \"year\"=? ORDER BY id ASC LIMIT ? OFFSET ?";
                break;
        }
        try {
            logger.log(Level.INFO, "SQL: " + sql);
            prestmt = conn.prepareStatement(sql);
            prestmt.setInt(1, Integer.parseInt(year));
            prestmt.setInt(2, size);
            prestmt.setInt(3, (page - 1) * size);
            rset = prestmt.executeQuery();
            while (rset.next()) {
                book = fillBookFromResult(rset);
                list.add(book);
            }
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
        logger.log(Level.INFO, "Returned books by year");
        logger.log(Level.INFO, "Found " + list.size() + " entries matching '" + sort + " than " + year + "'");

        return list;
    }

    /**
     * Returns a list of all rating class objects in the database.
     *
     * @return the list of ratings
     */
    public List<Rating> getAllRatings() {
        try {
            stmt = conn.createStatement();
            String sql = "SELECT * FROM public.\"Ratings\";";
            rset = stmt.executeQuery(sql);
            while (rset.next()) {
                Rating rating = fillRatingFromResult(rset);
                ratingList.add(rating);
            }
            rset.close();
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
        logger.log(Level.INFO, "Retrieved all rating entries (" + ratingList.size() + ") from database");
        return ratingList;
    }

    /**
     * Returns a list of all rating class objects for a specific book from the database.
     *
     * @param bookId the ID of the book
     * @return the list of ratings for the book
     */
    public List<Rating> getAllRatingsByBook(int bookId) {
        List<Rating> ratingList = new ArrayList<>();
        try {
            stmt = conn.createStatement();
            String sql = "SELECT * FROM public.\"Ratings\" WHERE book_id = " + bookId + ";";
            rset = stmt.executeQuery(sql);
            while (rset.next()) {
                Rating rating = fillRatingFromResult(rset);
                ratingList.add(rating);
            }
            rset.close();
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
        logger.log(Level.INFO, "Retrieved all rating entries for book id (" + bookId + ") from database");
        return ratingList;
    }

    /**
     * Returns a list of all rating class objects for a specific user from the database.
     *
     * @param userId the ID of the user
     * @return the list of ratings by the user
     */
    public List<Rating> getAllRatingsByUser(int userId) {
        List<Rating> ratingList = new ArrayList<>();
        try {
            stmt = conn.createStatement();
            String sql = "SELECT * FROM public.\"Ratings\" WHERE user_id = " + userId + ";";
            rset = stmt.executeQuery(sql);
            while (rset.next()) {
                Rating rating = fillRatingFromResult(rset);
                ratingList.add(rating);
            }
            rset.close();
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
        logger.log(Level.INFO, "Retrieved all rating entries for user id (" + userId + ") from database");
        return ratingList;
    }

    /**
     * Creates a new rating in the database.
     *
     * @param rating the rating to create
     */
    public void createRating(Rating rating) {
        try {
            prestmt = conn.prepareStatement("INSERT INTO public.\"Ratings\" (user_id, book_id, date_added, rating, comment) VALUES (?, ?, NOW(), ?, ?)");
            prestmt.setInt(1, rating.getUserId());
            prestmt.setInt(2, rating.getBookId());
            prestmt.setInt(3, rating.getRating());
            prestmt.setString(4, rating.getComment());
            prestmt.executeUpdate();
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
        logger.log(Level.INFO, "Added new rating to the database");
    }

    private Rating fillRatingFromResult(ResultSet rset) throws SQLException {
        Rating newRating = new Rating();
        newRating.setId(rset.getInt("id"));
        newRating.setUserId(rset.getInt("user_id"));
        newRating.setBookId(rset.getInt("book_id"));
        if (rset.getDate("date_added") != null) {
            newRating.setDateAdded(rset.getDate("date_added").toLocalDate());
        } else {
            newRating.setDateAdded(new Date(0).toLocalDate());
        }
        newRating.setRating(rset.getInt("rating"));
        newRating.setComment(rset.getString("comment"));

        return newRating;
    }

    /**
     * Returns a list of all books comments by id of the book in the database.
     *
     * @param bookId id of the books
     * @return the list of books comments
     */
    public List<BooksComment> getBooksCommentsById(int bookId) {
        try {
            prestmt = conn.prepareStatement("SELECT bc.id, user_id, book_id, comment, date_added, avatar, fname, lname FROM public.\"BooksComments\" as bc join public.\"Users\" as u on user_id=u.id where book_id = ?;");
            prestmt.setInt(1, bookId);
            rset = prestmt.executeQuery();
            while (rset.next()) {
                BooksComment booksComment = fillBooksCommentFromResult(rset);
                booksCommentList.add(booksComment);
            }
            rset.close();
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
        logger.log(Level.INFO, "Retrieved all books comments entries (" + booksCommentList.size() + ") from database");
        return booksCommentList;
    }

        /**
     * Returns a list of all books comments by id of the user in the database.
     *
     * @param userId id of the user
     * @return the list of books comments
     */
    public List<BooksComment> getBooksCommentsByUserId(int userId) {
        try {
            prestmt = conn.prepareStatement("SELECT bc.id, user_id, book_id, comment, date_added, avatar, fname, lname FROM public.\"BooksComments\" as bc join public.\"Users\" as u on user_id=u.id where user_id = ?;");
            prestmt.setInt(1, userId);
            rset = prestmt.executeQuery();
            while (rset.next()) {
                BooksComment booksComment = fillBooksCommentFromResult(rset);
                booksCommentList.add(booksComment);
            }
            rset.close();
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
        logger.log(Level.INFO, "Retrieved all books comments entries (" + booksCommentList.size() + ") from database");
        return booksCommentList;
    }

    /**
     * Returns a list of offers comments by id in the database.
     *
     * @param offerId id of the offer
     * @return the list of offers comments
     */
    public List<OffersComment> getOffersCommentsById(int offerId) {
        try {
            prestmt = conn.prepareStatement("SELECT oc.id, user_id, request_id, comment, date_added, avatar, fname, lname FROM public.\"OffersComments\" as oc join public.\"Users\" as u on user_id=u.id where request_id = ?;");
            prestmt.setInt(1, offerId);
            rset = prestmt.executeQuery();
            while (rset.next()) {
                OffersComment offersComment = fillOffersCommentFromResult(rset);
                offersCommentList.add(offersComment);
            }
            rset.close();
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
        logger.log(Level.INFO, "Retrieved all offers comments entries (" + offersCommentList.size() + ") from database");
        return offersCommentList;
    }

    /**
     * Returns a list of offers comments by user id in the database.
     *
     * @param userId id of the user
     * @return the list of offers comments
     */
    public List<OffersComment> getOffersCommentsByUserId(int userId) {
        try {
            prestmt = conn.prepareStatement("SELECT oc.id, user_id, request_id, comment, date_added, avatar, fname, lname FROM public.\"OffersComments\" as oc join public.\"Users\" as u on user_id=u.id where user_id = ?;");
            prestmt.setInt(1, userId);
            rset = prestmt.executeQuery();
            while (rset.next()) {
                OffersComment offersComment = fillOffersCommentFromResult(rset);
                offersCommentList.add(offersComment);
            }
            rset.close();
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
        logger.log(Level.INFO, "Retrieved all offers comments entries (" + offersCommentList.size() + ") from database");
        return offersCommentList;
    }

    /**
     * Creates a new books comment in the database.
     *
     * @param booksComment the books comment to create
     */
    public void createBooksComment(BooksComment booksComment) {
        try {
            prestmt = conn.prepareStatement("INSERT INTO public.\"BooksComments\" (user_id, book_id, comment, date_added) VALUES (?, ?, ?, NOW())");
            prestmt.setInt(1, booksComment.getUserId());
            prestmt.setInt(2, booksComment.getBookId());
            prestmt.setString(3, booksComment.getComment());
            prestmt.executeUpdate();
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
        logger.log(Level.INFO, "Added new books comment to the database");
    }

    /**
     * Creates a new offers comment in the database.
     *
     * @param offersComment the offers comment to create
     */
    public void createOffersComment(OffersComment offersComment) {
        try {
            prestmt = conn.prepareStatement("INSERT INTO public.\"OffersComments\" (user_id, request_id, comment, date_added) VALUES (?, ?, ?, NOW())");
            prestmt.setInt(1, offersComment.getUserId());
            prestmt.setInt(2, offersComment.getRequestId());
            prestmt.setString(3, offersComment.getComment());
            prestmt.executeUpdate();
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
        logger.log(Level.INFO, "Added new offers comment to the database");
    }
    /**
     * Updates a user avatar in the database.
     *
     * @param id id of the user
     * @param avatar avatar of the user
     * @return true if the user avatar was updated, false otherwise
     */
    public Boolean updateUserAvatar(int id, String avatar) {
        try {
            prestmt = conn.prepareStatement("UPDATE public.\"Users\" SET avatar=? WHERE id=?");
            prestmt.setString(1, avatar);
            prestmt.setInt(2, id);
            prestmt.executeUpdate();
            logger.log(Level.INFO, "Updated existing User avatar id = " + id + " to = " + avatar);
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
            return false;
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
        return true;
    }

    private BooksComment fillBooksCommentFromResult(ResultSet rset) throws SQLException {
        BooksComment booksComment = new BooksComment();
        booksComment.setId(rset.getInt("id"));
        booksComment.setUserId(rset.getInt("user_id"));
        booksComment.setBookId(rset.getInt("book_id"));
        booksComment.setComment(rset.getString("comment"));
        booksComment.setDateAdded(rset.getTimestamp("date_added").toLocalDateTime());
        booksComment.setAvatar(rset.getString("avatar"));
        booksComment.setFname(rset.getString("fname"));
        booksComment.setLname(rset.getString("lname"));

        return booksComment;
    }

    private OffersComment fillOffersCommentFromResult(ResultSet rset) throws SQLException {
        OffersComment offersComment = new OffersComment();
        offersComment.setId(rset.getInt("id"));
        offersComment.setUserId(rset.getInt("user_id"));
        offersComment.setRequestId(rset.getInt("request_id"));
        offersComment.setComment(rset.getString("comment"));
        offersComment.setDateAdded(rset.getTimestamp("date_added").toLocalDateTime());
        offersComment.setAvatar(rset.getString("avatar"));
        offersComment.setFname(rset.getString("fname"));
        offersComment.setLname(rset.getString("lname"));

        return offersComment;
    }

    public List<Book.BookWithRating> searchBooksByRating(Integer rating, String sort, Integer page, Integer size) {
        List<Book.BookWithRating> listRating = new ArrayList<>();
        String sql="SELECT b.*, AVG(rating) as rating FROM public.\"Ratings\" r JOIN public.\"Books\" b ON b.\"id\"=book_id GROUP BY book_id, b.\"id\" HAVING AVG(rating)=? LIMIT ? OFFSET ?";
        switch(sort) {
            case "greater":
                sql = "SELECT b.*, AVG(rating) as rating FROM public.\"Ratings\" r JOIN public.\"Books\" b ON b.\"id\"=book_id GROUP BY book_id, b.\"id\" HAVING AVG(rating)>? LIMIT ? OFFSET ?";
                break;
            case "lower":
                sql = "SELECT b.*, AVG(rating) as rating FROM public.\"Ratings\" r JOIN public.\"Books\" b ON b.\"id\"=book_id GROUP BY book_id, b.\"id\" HAVING AVG(rating)<? LIMIT ? OFFSET ?";
                break;
        }
        try {
            prestmt = conn.prepareStatement(sql);
            prestmt.setInt(1, rating);
            prestmt.setInt(2, size);
            prestmt.setInt(3, (page - 1) * size);
            logger.log(Level.INFO, "sql: " + prestmt.toString());
            rset = prestmt.executeQuery();
            while (rset.next()) {
                book = fillBookFromResult(rset);
                listRating.add(new Book.BookWithRating(book, rset.getDouble("rating")));
            }
        } catch (SQLException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
        } finally {
            try {
                if (prestmt != null) {
                    prestmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                logger.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
        logger.log(Level.INFO, "Returned books by rating");
        logger.log(Level.INFO, "Found " + list.size() + " entries matching '" + sort + " than " + rating + "'");

        return listRating;
    }
}
