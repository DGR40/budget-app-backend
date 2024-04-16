import Header from "../Components/UI/Header";
import { Link } from "react-router-dom";
import Card from "../Components/UI/Card.jsx";

function NotFoundPage() {
  return (
    <>
      <Header></Header>
      <Card className="expenses">
        <h1 style={{ color: "white" }}>Page Not Found</h1>
        <Link to="/" style={{ color: "white" }}>
          Go back
        </Link>
      </Card>
    </>
  );
}

export default NotFoundPage;
