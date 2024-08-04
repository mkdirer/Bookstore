import React, {useEffect, useRef, useState} from "react";
import {SingleOfferTile} from "./SingleOfferTile";
import {BlankPanel} from "../";
import OffersSearchBar from "../inputs/OffersSearchBar";
import {Advertisement, Book, getAdvertisementList, getBookById, getBooks} from "../../utils/fetch/fetch";
import {getBookCover} from "../../utils/books/getBookCover";

const OffersList: React.FC = (): JSX.Element => {
  const [selectedType, setSelectedType] = useState<
    "free" | "sale" | "exchange" | ""
  >("");
  const [isTypeChanged, setIsTypeChanged] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const isOffersFetched = useRef(false);
  const isBooksFetched = useRef(false);
  const [offers, setOffers] = useState<Advertisement[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [cover, setCover] = useState<string>();
  const [filteredOffers, setFilteredOffers] = useState<Advertisement[]>([]);

  useEffect(() => {
      if (!isOffersFetched.current) {
        getAdvertisementList()
           .then((adverts) => setOffers(adverts))
           .then(() => isOffersFetched.current = true )
           .catch((err) => console.log(err));
      }
  }, []);

  useEffect(() => {
        if (!isBooksFetched.current) {
            getBooks()
                .then((books) => setBooks(books))
                .then(() => isBooksFetched.current = true )
                .catch((err) => console.log(err));
        }
  }, []);

  const handleCheckboxChange = (
    searchValue: string,
    offerType: "free" | "sale" | "exchange" | ""
  ) => {
    setSelectedType(offerType);
    setIsTypeChanged(true);
    setIsLoaded(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };


  useEffect(() => {
      if(books.length>0 && offers.length>0 && isTypeChanged) {
          setFilteredOffers(offers.filter((offer) => {
              const offerTypeMatch = selectedType === "" || offer.type === selectedType;
              const offeredBook = books.filter((book) => book.id === offer.bookId)[0];
              const searchValueMatch = offeredBook && offeredBook.title
                  .toLowerCase()
                  .includes(searchValue.toLowerCase());
              return offerTypeMatch && searchValueMatch;
          }));
          setIsLoaded(true);
      }
  }, [isTypeChanged, books, offers, selectedType, searchValue]);

  const getCover = async (isbn: string) => {
      await getBookCover(isbn)
        .then((cover) => setCover(cover))
        .catch((err) => console.log(err));
  }

  return (
    <>
      <BlankPanel
        sx={{ width: "1050px", color: "black", borderRadius: 0, p: "6px" }}
      >
        <OffersSearchBar onCheckboxChange={handleCheckboxChange} />
        <BlankPanel
          sx={{ width: "1000px", color: "black", borderRadius: 0, p: "6px" }}
        >
          {isLoaded && filteredOffers.map((offer) => {
            const offeredBook = books.filter(
              (book) => book.id === offer.bookId
            )[0];
            getCover(offeredBook.isbn);
            return (
              <SingleOfferTile
                key={offer.id}
                id={offer.id}
                imageSrc={cover || ""}
                title={offeredBook.title}
                offerType={offer.type}
              />
            );
          })}
        </BlankPanel>
      </BlankPanel>
    </>
  );
};

export default OffersList;
