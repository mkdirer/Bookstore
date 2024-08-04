import React, { useState } from "react";
import { BlankPanel, DefaultButton, FormInput } from "../";
import { Stack, Typography } from "@mui/material";
import i18n from "../../assets/locales/translate";
import { Book, createBook } from "../../utils/fetch/fetch";

interface AddBookFormProps {
    title: string;
  onAccept: () => void;
  onReject: () => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({
    title,
  onAccept,
  onReject,
}): JSX.Element => {
  const [book, setBook] = useState<Book>({
    id: 0,
    isbn: "",
    author: "",
    title: "",
    year: 0,
    publisher: "",
    domain: "",
  });

  const handleInputChange = (fieldName: keyof Book, value: string) => {
    setBook((prevBook) => ({
      ...prevBook,
      [fieldName]: value,
    }));
  };

  const handleAccept = async () => {
    try {
      await createBook(book);
      onAccept();
    } catch (error) {
      console.log("Wystąpił błąd podczas dodawania książki:", error);
      // Obsłuż błąd dodawania książki
    }
  };

  return (
    <BlankPanel
      sx={{ width: 380, color: "black", textAlign: "left", borderRadius: 3 }}
    >
      <Typography sx={{ fontSize: 22, fontWeight: "bold", ml: 2 }}>
        {i18n.t("add book title") || "add book title"}
      </Typography>
      <FormInput
        label={i18n.t("book title") || "book title"}
        value={book.title}
        onChange={(value: string) => handleInputChange("title", value)}
      />
      <FormInput
        label={i18n.t("author") || "author"}
        value={book.author}
        onChange={(value: string) => handleInputChange("author", value)}
      />
      <FormInput
        label={i18n.t("ISBN") || "ISBN"}
        value={book.isbn}
        onChange={(value: string) => handleInputChange("isbn", value)}
      />
      <FormInput
        label={i18n.t("year") || "year"}
        value={book.year.toString()}
        onChange={(value: string) => handleInputChange("year", value)}
      />
      <FormInput
        label={i18n.t("publisher") || "publisher"}
        value={book.publisher}
        onChange={(value: string) => handleInputChange("publisher", value)}
      />
      <FormInput
        label={i18n.t("domain") || "domain"}
        value={book.domain}
        onChange={(value: string) => handleInputChange("domain", value)}
      />
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <DefaultButton
          label={i18n.t("accept") || "accept"}
          handleClick={handleAccept}
        />
        <DefaultButton
          label={i18n.t("reject") || "reject"}
          handleClick={onReject}
        />
      </Stack>
    </BlankPanel>
  );
};

export { AddBookForm };