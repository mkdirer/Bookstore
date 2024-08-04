import axios from "axios";
import { authToken } from "../session";
import URL_data from "../../config.json"

const BASE_URL = URL_data.API_URL;
// const BASE_URL = URL_data.API_URL_SERVER;

interface Advertisement {
  bookId: number;
  dateAdded: string;
  dateFinished: string;
  id: number;
  message: string;
  receiverId: number;
  status: number;
  type: any;
  userId: number;
}

interface Review {
  id?: number;
  userId: number;
  bookId: number;
  dateAdded: string;
  rating: number;
  comment: string;
}
interface User {
  id?: number;
  login: string;
  password: string;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  ismoderator: boolean;
}

interface Book {
  id: number;
  isbn: string;
  author: string;
  title: string;
  year: number;
  publisher: string;
  domain: string;
}

interface Comment {
  userId: number;
  sourceId: number;
  comment: string;
  id?: number;
  dateAdded?: string;
  fname?: string;
  lname?: string;
  avatar?: string;
}



const register = async (
  user: User,
  setError: (flag: boolean) => void
): Promise<void> => {
  try {
    const response = await axios.post(BASE_URL + "/api/register", user, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      console.log("Registration successfull");
    }
  } catch (error) {
    setError(true);
    console.log(error);
  }
};

const logout = async (refreshToken: String): Promise<void> => {
  const token = authToken();

  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  try {
    const response = await axios.post(
      BASE_URL + "/api/auth/logout",
      {
        refreshToken: refreshToken,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.status === 200) {
      console.log("Logout successful");
    }
  } catch (error) {
    console.log(error);
  } finally {
    localStorage.removeItem("sessionData");
  }
};

const getProfile = async (): Promise<User | null> => {
  return authToken().then(async (token) => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get(BASE_URL + "/api/auth/user/info", {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        console.log("Profile retrieval successful");
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  });
};

const getUserById = async (userId: number): Promise<User | null> => {
  return authToken().then(async (token) => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get(
        BASE_URL + `/api/auth/user/info/id/${userId}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        console.log("Profile retrieval successful");
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  });
};

const updateProfile = async (login: String, user: User): Promise<void> => {
  const token = authToken();
  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

  try {
    const response = await axios.post(
      BASE_URL + `/api/auth/update/${login}`,
      user,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status === 200) {
      console.log("Profile update successful");
    }
  } catch (error) {
    console.log(error);
  }
};

const getBooks = async (): Promise<Book[]> => {
  const token = authToken();

  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  let books: Book[] = [];

  try {
    const response = await axios.get(BASE_URL + "/api/book", {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      books = response.data;
      console.log("Book get successful");
    }
  } catch (error) {
    console.log(error);
  }

  return books;
};

  const createBook = async (book: Book): Promise<void> => {
  const token = await authToken();

  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  console.log(axios.defaults.headers.common);

  const toSend = {
    isbn: book.isbn,
    author: book.author,
    title: book.title,
    year: Number(book.year), // Konwersja na number
    publisher: book.publisher,
    domain: book.domain,
  };

  try {
    const response = await axios.post(BASE_URL + "/api/book", toSend, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 201) {
      console.log("Book creation successful");

      // Pobierz profil użytkownika po utworzeniu książki
      const profile = await getProfile();
      if (profile !== null) {
        console.log(profile);
        // Tutaj możesz wykonywać operacje na pobranym profilu
      } else {
        console.log("Failed to retrieve profile");
      }
    }
  } catch (error) {
    console.log(error);
    }
  };

  const getRatedBooks = async (userId: string): Promise<Book[] | null> => {
  const token = await authToken();

  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  console.log(axios.defaults.headers.common);

  try {
    const response = await axios.get(BASE_URL + `/api/book/rated/${userId}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      console.log("Rated books retrieval successful");
      return response.data as Book[];
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

const searchBookByName = async (bookTitle: string): Promise<Book[]> => {
  const token = authToken();

  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  let books: Book[] = [];

  try {
    const response = await axios.get(BASE_URL + `/api/book/name/${bookTitle}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      books = response.data;
      console.log("Book search successful");
    }
  } catch (error) {
    console.log(error);
  }

  return books;
};

const searchByYear = async (
  year: number,
  type: "greater" | "lower" | "none",
  page: number,
  size: number
): Promise<Book[]> => {
  const token = authToken();

  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  let books: Book[] = [];

  try {
    const response = await axios.get(
      BASE_URL +
        `/api/book/year/${year}&sort=${type}&page=${page}&size=${size}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status === 200) {
      books = response.data;
      console.log("Book search by year successful");
    }
  } catch (error) {
    console.log(error);
  }

  return books;
};

  const searchByReatings = async (
    rate: string,
    mode: "greater" | "lower" | "none",
    page: number,
    size: number
  ): Promise<Book[]> => {
    const token = await authToken(); // Await the authToken function

    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    let books: Book[] = [];

    try {
      const response = await axios.get(
        BASE_URL + `/api/book/rating/${rate}&sort=${mode}&page=${page}&size=${size}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        books = response.data;
        console.log("Book search by year successful");
      }
    } catch (error) {
      console.log(error);
    }

    return books;
  };


const searchBookByAuthor = async (author: string): Promise<Book[]> => {
  const token = authToken();

  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  let books: Book[] = [];

  try {
    const response = await axios.get(BASE_URL + `/api/book/author/${author}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      books = response.data;
      console.log("Book search successful");
    }
  } catch (error) {
    console.log(error);
  }

  return books;
};

const getBookById = async (bookId: number): Promise<Book | null> => {
  const token = authToken();

  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  let book: Book | null = null;

  try {
    const response = await axios.get(BASE_URL + `/api/book/${bookId}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      book = response.data;
      console.log("Book search successful");
    }
  } catch (error) {
    console.log(error);
  }

  return book;
};

const filterBookByStatus = async (bookStatus: number): Promise<Book[]> => {
  const token = authToken();
  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  let books: Book[] = [];

  try {
    const response = await axios.get(
      BASE_URL + `/api/book/status/${bookStatus}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status === 200) {
      books = response.data;
      console.log("Book filter by status successful");
    }
  } catch (error) {
    console.log(error);
  }

  return books;
};

const getAdvertisementList = async (): Promise<Advertisement[]> => {
  const token = authToken();

  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  let advertisements: Advertisement[] = [];

  try {
    const response = await axios.get(BASE_URL + "/api/advertisement", {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      advertisements = response.data;
      console.log("Advertisement receive successful");
    }
  } catch (error) {
    console.log(error);
  }

  return advertisements;
};

const getAdvertisementById = async (
  advId: number
): Promise<Advertisement | null> => {
  const token = authToken();

  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  let adv: Advertisement | null = null;

  try {
    const response = await axios.get(BASE_URL + `/api/advertisement/${advId}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      adv = response.data;
      console.log("Advertisement get successful");
    }
  } catch (error) {
    console.log(error);
  }

  return adv;
};

const createAdvertisement = async (adv: Advertisement): Promise<void> => {
  return authToken().then(async (token) => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    const sessionData =
      localStorage.getItem("sessionData") || "NO REFRESH TOKEN";

    const { userID } = JSON.parse(sessionData);
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.post(
        BASE_URL + "/api/advertisement",
        {
          userId: userID,
          bookId: adv.bookId,
          message: adv.message,
          type: adv.type,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        console.log("Create advertisement successfull");
      }
    } catch (error) {
      console.log(error);
    }
  });
};

const updateAdvertisement = async (
  advertisement: Advertisement
): Promise<void> => {
  const token = authToken();
  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

  try {
    const response = await axios.patch(
      BASE_URL + `/api/advertisement/${advertisement.id}`,
      advertisement,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status === 200) {
      console.log("Advertisement update successful");
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllRatingsByBook = async (bookId: number): Promise<Review[]> => {
  let ratings: Review[] = [];

  try {
    const response = await axios.get(`${BASE_URL}/api/rating/book/${bookId}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      ratings = response.data;
      console.log("Ratings retrieval for book successful");
    }
  } catch (error) {
    console.log(error);
  }

  return ratings;
};

const getAllRatingsByUser = async (userId: number): Promise<Review[]> => {
  const token = authToken();

  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  let ratings: Review[] = [];

  try {
    const response = await axios.get(`${BASE_URL}/api/rating/user/${userId}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      ratings = response.data;
      console.log("Ratings retrieval for user successful");
    }
  } catch (error) {
    console.log(error);
  }

  return ratings;
};

const getAllBookComments = async (id: number): Promise<Comment[]> => {
  let comments: Comment[] = [];

  try {
    const response = await axios.get(BASE_URL + "/api/bookscomment/book/" + id, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      comments = response.data;
      console.log("Book comments retrieval successful");
      console.log(comments);
    }
  } catch (error) {
    console.log(error);
  }

  return comments;
};

const getAllOfferComments = async (): Promise<Comment[]> => {
  let comments: Comment[] = [];

  try {
    const response = await axios.get(BASE_URL + "/api/offerscomment", {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      comments = response.data;
      console.log("Offer comments retrieval successful");
    }
  } catch (error) {
    console.log(error);
  }

  return comments;
};

const createBookComment = async (bookComment: Comment): Promise<void> => {
  return authToken().then(async (token) => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    const toSend = {
      userId: bookComment.userId,
      bookId: bookComment.sourceId,
      comment: bookComment.comment,
      fname: "_",
      lname: "_",
    };

    try {
      const response = await axios.post(
        BASE_URL + "/api/bookscomment",
        toSend,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201) {
        console.log("Book comment creation successful");
      }
    } catch (error) {
      console.log(error);
    }
  });
};

const createOfferComment = async (offerComment: Comment): Promise<void> => {
  return authToken().then(async (token) => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    const toSend = {
      userId: offerComment.userId,
      requestId: offerComment.sourceId,
      comment: offerComment.comment,
    };

    try {
      const response = await axios.post(
        BASE_URL + "/api/offerscomment",
        toSend,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201) {
        console.log("Offer comment creation successful");
      }
    } catch (error) {
      console.log(error);
    }
  });
};

const createReview = async (newReview: Review): Promise<void> => {
  return authToken().then(async (token) => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.post(
        BASE_URL + "/api/rating",
        newReview,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201) {
        console.log("Offer comment creation successful");
      }
    } catch (error) {
      console.log(error);
    }
  });
};



const updateIcon = async (userId: number, icon: string): Promise<void> => {
  return authToken().then(async (token) => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    const toSend = {
      avatar: icon,
    };

    try {
      const response = await axios.post(
        BASE_URL + "/api/user/update/avatar/" + userId,
        toSend,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201 || 200) {
        console.log("Updated");
      }
    } catch (error) {
      console.log(error);
    }
  });
};

export {
  register,
  logout,
  updateProfile,
  getProfile,
  getUserById,
  getBooks,
  createBook,
  getRatedBooks,
  searchBookByName,
  searchByYear,
  searchByReatings,
  searchBookByAuthor,
  getBookById,
  filterBookByStatus,
  createAdvertisement,
  updateAdvertisement,
  getAdvertisementList,
  getAdvertisementById,
  getAllRatingsByBook,
  getAllRatingsByUser,
  getAllBookComments,
  getAllOfferComments,
  createBookComment,
  createOfferComment,
  updateIcon,
  createReview
};

export type { Advertisement, User, Book, Review, Comment };
