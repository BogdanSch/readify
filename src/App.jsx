import { React, useState } from "react";
import booksData from "./books.js";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import BookItem from "./components/BookItem.jsx";
import BooksSum from "./components/BooksSum.jsx";
import BooksCount from "./components/BooksCount.jsx";
import SearchPanel from "./components/SearchPannel.jsx";
import SortPanel from "./components/SortPanel.jsx";

const CURRENCY = `$`;

const App = () => {
  const getBookData = () => {
    return localStorage.getItem("books")
      ? JSON.parse(localStorage.getItem("books"))
      : [];
  };
  const setBookData = (data) => {
    localStorage.setItem("books", JSON.stringify(data));
    return false;
  };

  const [books, setBooks] = useState(booksData);
  const [cart, setCart] = useState(getBookData().length ? getBookData() : []);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSortCheked, setIsSortChecked] = useState(false);

  const removeBook = (book) => {
    const updateBooks = books.filter(function (item) {
      return item.id !== book.id;
    });
    setBooks(updateBooks);
  };
  const addBookToCart = (book) => {
    let goods = [...cart];
    goods.length && goods.includes(book) ? book.count++ : goods.push(book);
    setBookData(goods);
    setCart(goods);
  };
  const deleteBookFromCart = (book) => {
    let goods =
      book.count === 1
        ? cart.filter((item) => item.id !== book.id)
        : cart.filter((item) =>
            item.id === book.id ? book.count-- : book.count
          );
    setBookData(goods);
    setCart(goods);
  };

  const onUpdateSearch = (term) => {
    setSearchTerm(term);
  };
  const onUpdateSort = (isSortCheked) => {
    setIsSortChecked(isSortCheked);
  };
  const searchBook = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.name.indexOf(term) > -1;
    });
  };
  const sortBook = (items, isSortCheked) => {
    if (isSortCheked) {
      return items.sort((a, b) =>
        a.name < b.name ? -1 : a.name === b.name ? 0 : 1
      );
    } else {
      return items.sort((a, b) => (a.id < b.id ? -1 : a.id === b.id ? 0 : 1));
    }
  };

  const visibleBooks = searchBook(sortBook(books, isSortCheked), searchTerm);

  return (
    <div className="wrapper">
      <Header className="container-fluid p-5 bg-dark text-primary text-center" />
      <main className="main">
        <div className="container-fluid text-center">
          <div className="row">
            <div className="search-panel col-5 my-3">
              <SearchPanel onUpdateSearch={onUpdateSearch} />
            </div>
            <div className="row">
              <div className="col-3 my-3">
                <SortPanel onUpdateSort={onUpdateSort} />
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {visibleBooks.map((book) => {
              return (
                <div className="col-sm-4 col-12" key={`${book.id}-product`}>
                  <div className="card text-center my-5 p-3">
                    <BookItem
                      book={book}
                      removeBook={removeBook}
                      addBookToCart={addBookToCart}
                      currency={CURRENCY}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="container-fluid text-center">
          <h4>Кошик товарів</h4>
          <div className="row">
            <div className="col-12">
              <BooksCount goods={cart} />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <BooksSum currency={CURRENCY} goods={cart} />
            </div>
          </div>
          <ul className="list-group my-5">
            {cart.map((book) => (
              <li key={`${book.id}-cart`} className="list-group-item">
                <div className="row">
                  <div className="col-3">{book.name}</div>
                  <div className="col-3">{book.author}</div>
                  <div className="col-2">
                    {book.price * book.count}
                    {CURRENCY}
                  </div>
                  <div className="col-1">{book.count}</div>
                  <div className="col-3">
                    <button
                      onClick={deleteBookFromCart.bind(this, book)}
                      type="button"
                      className="btn btn-outline-danger mt-auto mb-2"
                    >
                      Прибрати
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer className="footer py-5 mt-5 bg-dark d-flex justify-content-center align-content-center" />
    </div>
  );
};

export default App;
