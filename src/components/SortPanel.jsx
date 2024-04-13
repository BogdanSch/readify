import { Component } from "react";

export default class SortPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSortCheked: false,
    };
  }

  toggleChange = () => {
    this.setState({
      isSortCheked: !this.state.isSortCheked,
    });
    console.log(this.state.isSortCheked);
    this.props.onUpdateSort(this.state.isSortCheked);
  };

  render() {
    return (
      <div className="form-check">
        <input
          type="checkbox"
          id="sort-by-name"
          className="form-control form-check-input mt-0"
          defaultChecked={this.state.isSortCheked}
          onChange={this.toggleChange}
        />
        <label htmlFor="sort-by-name" className="form-check-label mt-2">
          Sort by name
        </label>
      </div>
    );
  }
}