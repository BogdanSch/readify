import { useState } from "react";

const SearchPanel = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const onUpdateSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    props.onUpdateSearch(searchTerm);
  };

  return (
    <input
      type="text"
      className="form-control search-input"
      name="search"
      placeholder="Пошук"
      value={searchTerm}
      onChange={onUpdateSearch}
    />
  );
};

export default SearchPanel;
