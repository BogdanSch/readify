const BooksSum = (props) => {
  let sum = 0;
  props.goods.forEach((book) => {
    sum += +(book.price * book.count);
  });
  return <div>Повна вартість: {sum.toFixed(2)} </div>;
};

export default BooksSum;