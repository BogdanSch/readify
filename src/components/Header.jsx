import Image from "./Image.jsx";
import logo from "../images/logo.svg";

export default function Header(props) {
  return (
    <header className={props.className}>
      <Image src={logo} />
      <h1 className="display-2">Книгарня</h1>
    </header>
  );
}
