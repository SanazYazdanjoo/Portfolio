import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  // This hook catches the error thrown by route
  const error = useRouteError();
  console.error(error); // Good for debugging in the console

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Oops! We dropped the ball.</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p style={{ color: "red" }}>
        {/* Display the specific error message to the user/developer */}
        <i>{error.statusText || error.message}</i>
      </p>
      <a href="/">Go back home</a>
    </div>
  );
}