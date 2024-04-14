import { useState } from "react";

const SortPanel = (props) => {
  const [isSortCheked, setIsSortCheked] = useState(false);

  const toggleChange = () => {
    let isCheked = !isSortCheked;
    setIsSortCheked(isCheked);
    props.onUpdateSort(isCheked);
  };

  return (
    <>
      <div className="form-check">
        <input
          type="checkbox"
          id="sort-by-name"
          className="form-control form-check-input mt-0"
          defaultChecked={isSortCheked}
          onChange={toggleChange}
        />
        <label htmlFor="sort-by-name" className="form-check-label mt-2">
          Сортувати за іменем
        </label>
      </div>
      {/* <div className="form__sort-panel">
        <select
          class="form-select form-select-lg mb-3"
          aria-label=".form-select-lg example"
        >
          <option selected>Open this select menu</option>
          <option value="1">Name</option>
          <option value="2">Author</option>
          <option value="3">Id</option>
        </select>
      </div> */}
    </>
  );
};

export default SortPanel;
