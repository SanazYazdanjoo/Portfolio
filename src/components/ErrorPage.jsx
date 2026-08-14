import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Oops! We dropped the ball.</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p style={{ color: "red" }}>
        <i>{error.statusText || error.message}</i>
      </p>
      <a href="/">Go back home</a>
    </div>
  );
}