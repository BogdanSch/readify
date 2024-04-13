import { React, Component } from "react";
import booksData from "./books.js";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import BookItem from "./components/BookItem.jsx";
import BooksSum from "./components/BooksSum.jsx";
import BooksCount from "./components/BooksCount.jsx";
import SearchPanel from "./components/SearchPannel.jsx";
import SortPanel from "./components/SortPanel.jsx";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      books: booksData,
      cart: this.getBookData().length ? this.getBookData() : [],
      term: "",
      isSortCheked: false,
    };
  }
  getBookData = () => {
    return localStorage.getItem("books")
      ? JSON.parse(localStorage.getItem("books"))
      : [];
  };
  setBookData = (o) => {
    localStorage.setItem("books", JSON.stringify(o));
    return false;
  };

  removeBook = (book) => {
    const updateBooks = this.state.books.filter(function (item) {
      return item.id !== book.id;
    });
    this.setState({
      books: updateBooks,
    });
  };

  addBookToCart = (book) => {
    const goods = this.state.cart;
    if (!goods.includes(book)) goods.push(book);
    else book.count++;
    this.setState({
      cart: goods,
    });
    this.setBookData(goods);
  };

  deleteBookFromCart = (book) => {
    let goods;
    if (book.count === 1)
      goods = this.state.cart.filter((item) => item.id !== book.id);
    else
      goods = this.state.cart.filter((item) =>
        item.id === book.id ? book.count-- : book.count
      );
    this.setState({
      cart: goods,
    });
    this.setBookData(goods);
  };

  render = () => {
    const { books, cart, term, isSortCheked } = this.state;
    const visibleBooks = this.searchBook(
      this.sortBook(books, isSortCheked),
      term
    );

    return (
      <div className="wrapper">
        <Header className="container-fluid p-5 bg-dark text-primary text-center" />
        <main className="main">
          <div className="container-fluid text-center">
            <div className="row">
              <div className="search-panel col-5 my-3">
                <SearchPanel onUpdateSearch={this.onUpdateSearch} />
              </div>
              <div className="row">
                <div className="col-3 my-3">
                  <SortPanel onUpdateSort={this.onUpdateSort} />
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
                        removeBook={this.removeBook}
                        addBookToCart={this.addBookToCart}
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
                <BooksSum goods={cart} />
              </div>
            </div>
            <ul className="list-group my-5">
              {cart.map((book) => (
                <li key={`${book.id}-cart`} className="list-group-item">
                  <div className="row">
                    <div className="col-3">{book.name}</div>
                    <div className="col-3">{book.author}</div>
                    <div className="col-2">{book.price * book.count}</div>
                    <div className="col-1">{book.count}</div>
                    <div className="col-3">
                      <button
                        onClick={this.deleteBookFromCart.bind(this, book)}
                        type="button"
                        className="btn btn-outline-danger mt-auto mb-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </main>
        <Footer className="footer py-3 mt-5 bg-dark" />
      </div>
    );
  };
  onUpdateSearch = (term) => {
    this.setState({ term: term });
  };
  onUpdateSort = (isSortCheked) => {
    this.setState({ isSortCheked: isSortCheked });
  };
  searchBook = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.name.indexOf(term) > -1;
    });
  };
  sortBook = (items, isSortCheked) => {
    if (isSortCheked) {
      return items.sort((a, b) =>
        a.name < b.name ? -1 : a.name === b.name ? 0 : 1
      );
    } else {
      return items.sort((a, b) => (a.id < b.id ? -1 : a.id === b.id ? 0 : 1));
    }
  };
}