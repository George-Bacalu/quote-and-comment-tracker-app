import { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const AllQuotes = lazy(() => import("./pages/AllQuotes"));
const SingleQuote = lazy(() => import("./pages/SingleQuote"));
const NewQuote = lazy(() => import("./pages/NewQuote"));
const NotFound = lazy(() => import("./pages/NotFound"));

const loadingContent = (
  <div className="centered">
    <LoadingSpinner />
  </div>
);

const App = () => {
  return (
    <Layout>
      <Suspense fallback={loadingContent}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/quotes/:quoteId">
            <SingleQuote />
          </Route>
          <Route path="/new-quote">
            <NewQuote />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default App;
