CREATE  TABLE "public"."Books" (
								   id                   serial  NOT NULL  ,
								   isbn                 varchar  NOT NULL  ,
								   author               varchar  NOT NULL  ,
								   title                varchar  NOT NULL  ,
								   "year"               integer  NOT NULL  ,
								   publisher            varchar  NOT NULL  ,
								   "domain"             varchar  NOT NULL  ,
								   CONSTRAINT pk_books PRIMARY KEY ( id )
);

CREATE  TABLE "public"."OfferStatuses" (
										   id                   smallint  NOT NULL  ,
										   name                 varchar  NOT NULL  ,
										   CONSTRAINT pk_offerstatuses PRIMARY KEY ( id )
);

CREATE  TABLE "public"."OfferTypes" (
										id                   smallint  NOT NULL  ,
										name                 varchar  NOT NULL  ,
										CONSTRAINT pk_offertypes PRIMARY KEY ( id )
);

CREATE  TABLE "public"."RequestStatuses" (
											 id                   smallint  NOT NULL  ,
											 name                 varchar  NOT NULL  ,
											 CONSTRAINT pk_requeststatuses PRIMARY KEY ( id )
);

CREATE  TABLE "public"."Users" (
								   id                   serial  NOT NULL  ,
								   login                varchar  NOT NULL  ,
								   "password"           varchar  NOT NULL  ,
								   fname                varchar  NOT NULL  ,
								   lname                varchar  NOT NULL  ,
								   email                varchar  NOT NULL  ,
								   phone                varchar  NOT NULL  ,
								   avatar varchar NOT NULL CHECK (avatar IN (
																			 'bed-bug', 'book', 'centipede', 'chickadee', 'cockroach', 'goose', 'hoopoe', 'hourglass', 'ibis', 'lyre',
																			 'pelican', 'powderpost-beetle', 'rhinoceros-beetle', 'scroll', 'search', 'ship-wheel', 'skull', 'spoonbill',
																			 'stag-beetle', 'telephone', 'tick')),
								   ismoderator          boolean DEFAULT '0' NOT NULL  ,
								   CONSTRAINT pk_users PRIMARY KEY ( id )
);

CREATE  TABLE "public"."Offers" (
									id                   serial  NOT NULL  ,
									user_id              integer  NOT NULL  ,
									book_id              integer  NOT NULL  ,
									date_added           date DEFAULT CURRENT_DATE NOT NULL  ,
									message              varchar  NOT NULL  ,
									"type"               smallint  NOT NULL  ,
									receiver_id          integer    ,
									price          double precision    ,
									date_finished        date    ,
									status               smallint DEFAULT 1 NOT NULL  ,
									CONSTRAINT pk_offers PRIMARY KEY ( id )
);

CREATE  TABLE "public"."Ratings" (
									 id                   serial  NOT NULL  ,
									 user_id              integer  NOT NULL  ,
									 book_id              integer  NOT NULL  ,
									 date_added           date DEFAULT CURRENT_DATE NOT NULL  ,
									 rating               smallint  NOT NULL  CHECK (rating BETWEEN 0 AND 5 ),
									 "comment"            varchar  NOT NULL  ,
									 CONSTRAINT pk_ratings PRIMARY KEY ( id )
);

CREATE  TABLE "public"."Requests" (
									  id                   serial  NOT NULL  ,
									  user_id              integer  NOT NULL  ,
									  admin_id             integer    ,
									  date_added           date DEFAULT CURRENT_DATE NOT NULL  ,
									  status               smallint DEFAULT '1' NOT NULL  ,
									  title                varchar  NOT NULL  ,
									  message              varchar  NOT NULL  ,
									  date_closed          date    ,
									  CONSTRAINT pk_requests PRIMARY KEY ( id )
);

CREATE  TABLE "public"."BooksComments" (
										   id                   serial  NOT NULL  ,
										   user_id              integer  NOT NULL  ,
										   book_id             integer    NOT NULL ,
										   comment              varchar  NOT NULL  ,
										   date_added              timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
										   CONSTRAINT pk_books_comments PRIMARY KEY ( id )
);

CREATE  TABLE "public"."OffersComments" (
											id                   serial  NOT NULL  ,
											user_id              integer  NOT NULL  ,
											request_id             integer    NOT NULL ,
											comment              varchar  NOT NULL  ,
											date_added              timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
											CONSTRAINT pk_requests_comments PRIMARY KEY ( id )
);

ALTER TABLE "public"."Offers" ADD CONSTRAINT offers_status_foreign FOREIGN KEY ( status ) REFERENCES "public"."OfferStatuses"( id );

ALTER TABLE "public"."Offers" ADD CONSTRAINT offers_bookid_foreign FOREIGN KEY ( book_id ) REFERENCES "public"."Books"( id );

ALTER TABLE "public"."Offers" ADD CONSTRAINT offers_userid_foreign FOREIGN KEY ( user_id ) REFERENCES "public"."Users"( id );

ALTER TABLE "public"."Offers" ADD CONSTRAINT offers_type_foreign FOREIGN KEY ( "type" ) REFERENCES "public"."OfferTypes"( id );

ALTER TABLE "public"."Ratings" ADD CONSTRAINT ratings_userid_foreign FOREIGN KEY ( user_id ) REFERENCES "public"."Users"( id );

ALTER TABLE "public"."Ratings" ADD CONSTRAINT ratings_bookid_foreign FOREIGN KEY ( book_id ) REFERENCES "public"."Books"( id );

ALTER TABLE "public"."Requests" ADD CONSTRAINT requests_status_foreign FOREIGN KEY ( status ) REFERENCES "public"."RequestStatuses"( id );

ALTER TABLE "public"."Requests" ADD CONSTRAINT requests_userid_foreign FOREIGN KEY ( user_id ) REFERENCES "public"."Users"( id );

ALTER TABLE "public"."Requests" ADD CONSTRAINT requests_adminid_foreign FOREIGN KEY ( admin_id ) REFERENCES "public"."Users"( id );

ALTER TABLE "public"."BooksComments" ADD CONSTRAINT bookscomments_userid_foreign FOREIGN KEY ( user_id ) REFERENCES "public"."Users"( id );

ALTER TABLE "public"."BooksComments" ADD CONSTRAINT bookscomments_bookid_foreign FOREIGN KEY ( book_id ) REFERENCES "public"."Books"( id );

ALTER TABLE "public"."OffersComments" ADD CONSTRAINT requestscomments_userid_foreign FOREIGN KEY ( user_id ) REFERENCES "public"."Users"( id );

ALTER TABLE "public"."OffersComments" ADD CONSTRAINT requestscomments_bookid_foreign FOREIGN KEY ( request_id ) REFERENCES "public"."Offers"( id );

INSERT INTO "public"."Books" (isbn, author, title, "year", publisher, "domain") VALUES
																					('978-3-16-148410-0', 'John Smith', 'The Great Book', 2021, 'Great Publisher', 'Fiction'),
																					('978-1-40-289460-1', 'Jane Doe', 'Another Great Book', 2022, 'Another Publisher', 'Non-Fiction');

INSERT INTO "public"."OfferStatuses" (id, name) VALUES
													(1, 'Pending'),
													(2, 'Accepted');

INSERT INTO "public"."OfferTypes" (id, name) VALUES
												 (1, 'Sale'),
												 (2, 'Exchange');

INSERT INTO "public"."RequestStatuses" (id, name) VALUES
													  (1, 'Open'),
													  (2, 'Closed');

INSERT INTO "public"."Users" (login, password, fname, lname, email, phone, avatar, ismoderator) VALUES
																									('user', 'ee11cbb19052e40b07aac0ca060c23ee', 'Krzysztof', 'Kononowicz', 'knur@choroszcza.com', '213769420', 'bed-bug', false),
																									('admin', '21232f297a57a5a743894a0e4a801fc3', 'Major', 'Suchodolski', 'nitrobot@choroszcza.com', '213769420', 'goose', true);

INSERT INTO "public"."Offers" (user_id, book_id, message, "type", status) VALUES
																			  (1, 1, 'Great book for sale!', 1, 1),
																			  (2, 2, 'Want to exchange this book!', 2, 2);

INSERT INTO "public"."Ratings" (user_id, book_id, rating, "comment") VALUES
																		 (1, 1, 5, 'Great book!'),
																		 (2, 2, 4, 'Good book!');

INSERT INTO "public"."Requests" (user_id, status, title, message) VALUES
																	  (1, 1, 'Need help with something', 'This is a help request.'),
																	  (2, 2, 'Need assistance', 'This is another help request.');

INSERT INTO "public"."BooksComments" (user_id, book_id, comment, date_added) VALUES
																				 (1, 1, 'This is a comment on a book.', '2023-06-19T10:34:09'),
																				 (2, 2, 'This is another comment on a book.', '2023-06-19T10:34:09');

INSERT INTO "public"."OffersComments" (user_id, request_id, comment, date_added) VALUES
																					 (1, 1, 'This is a comment on an offer.', '2023-06-19T10:34:09'),
																					 (2, 2, 'This is another comment on an offer.', '2023-06-19T10:34:09');
