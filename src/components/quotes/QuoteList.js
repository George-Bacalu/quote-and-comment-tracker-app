import { useHistory, useLocation } from "react-router-dom";
import classes from "./QuoteList.module.css";
import QuoteItem from "./QuoteItem";

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((fisrtQuote, secondQuote) => {
    if (ascending) return fisrtQuote.id > secondQuote.id ? 1 : -1;
    else return fisrtQuote.id < secondQuote.id ? 1 : -1;
  });
};

const QuoteList = props => {
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const isSortingAscending = queryParams.get("sort") === "asc";

  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

  const changeSortingHandler = () => {
    history.push({ pathname: location.pathname, search: `?sort=${isSortingAscending ? "desc" : "asc"}` });
  };

  return (
    <>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>Sort {isSortingAscending ? "Descending" : "Ascending"}</button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map(quote => (
          <QuoteItem key={quote.id} id={quote.id} author={quote.author} text={quote.text} />
        ))}
      </ul>
    </>
  );
};

export default QuoteList;
