import Image from "./Image.jsx";

const BookItem = (props) => {
  return (
    <div>
      <div className="card-title">
        <h4>{props.book.name}</h4>
      </div>
      <div className="image card-body">
        <Image src={props.book.imageCover} />
        <div className="card-info text-start mt-3">
          <p className="fw-bold">Автор: {props.book.author}</p>
          <p>Ціна: {props.book.price}{props.currency}</p>
        </div>
      </div>
      <button
        onClick={props.removeBook.bind(null, props.book)}
        className="add_item btn btn-lg btn-warning"
      >
        Видалити
      </button>
      <button
        onClick={props.addBookToCart.bind(null, props.book)}
        className="btn btn-lg btn-primary mx-1"
      >
        Додати до кошику
      </button>
    </div>
  );
};
export default BookItem;
