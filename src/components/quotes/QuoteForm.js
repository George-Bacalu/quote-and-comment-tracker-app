import { useRef, useState } from "react";
import { Prompt } from "react-router-dom";
import classes from "./QuoteForm.module.css";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";

const QuoteForm = props => {
  const [isFocused, setIsFocused] = useState(false);
  const authorInputRef = useRef();
  const textInputRef = useRef();

  const formFocusedHandler = () => setIsFocused(true);
  const finishEnteringHandler = () => setIsFocused(false);
  const getPromptMessage = () => "Are you sure you want to leave? All your entered data will be lost!";

  const submitFormHandler = event => {
    event.preventDefault();
    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;
    if (enteredAuthor.trim().length === 0 || enteredText.trim().length === 0) return;
    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  };

  return (
    <>
      <Prompt when={isFocused} message={getPromptMessage} />
      <Card>
        <form className={classes.form} onSubmit={submitFormHandler} onFocus={formFocusedHandler}>
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}
          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input ref={authorInputRef} type="text" id="author" />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea ref={textInputRef} id="text" rows="5"></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={finishEnteringHandler} className="btn">Add Quote</button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default QuoteForm;
