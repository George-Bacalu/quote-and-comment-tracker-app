import { useRef, useEffect } from "react";
import classes from "./NewCommentForm.module.css";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

const NewCommentForm = props => {
  const { sendRequest, status, error } = useHttp(addComment);
  const commentTextRef = useRef();
  const { onAddedComment } = props;

  useEffect(() => {
    if (status === "completed" && !error) onAddedComment();
  }, [status, error, onAddedComment]);

  const submitFormHandler = event => {
    event.preventDefault();
    const enteredText = commentTextRef.current.value;
    if(enteredText.trim().length === 0) return;
    sendRequest({ commentData: { text: enteredText }, quoteId: props.quoteId });
    commentTextRef.current.value = "";
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea ref={commentTextRef} id="comment" rows="5"></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
