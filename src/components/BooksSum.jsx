const BooksSum = (props) => {
  let sum = 0;
  props.goods.forEach((book) => {
    sum += +(book.price * book.count);
  });
  return (
    <div className="books-total">
      Повна вартість: {sum.toFixed(2)}
      {props.currency}
    </div>
  );
};

export default BooksSum;
