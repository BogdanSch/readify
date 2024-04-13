const BooksCount = (props) => {
  let count = 0;
  props.goods.forEach((book) => {
    count += book.count;
  });
  return <div>Кількість книжок: {count} </div>;
};

export default BooksCount;
