import { useEffect } from "react";
import { Route, Link, useParams, useRouteMatch } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";

const SingleQuote = () => {
  const { sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote, true);
  const match = useRouteMatch();
  const params = useParams();
  const { quoteId } = params;

  useEffect(() => sendRequest(quoteId), [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  } else if (error) {
    return <p className="centered">{error}</p>;
  } else if (!loadedQuote.text) {
    return <p>No quote found!</p>;
  }

  return (
    <>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link to={`${match.url}/comments`} className="btn--flat">Load Comments</Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </>
  );
};

export default SingleQuote;
