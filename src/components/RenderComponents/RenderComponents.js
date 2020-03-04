import React, {useContext} from 'react';
import NavigationBar from "../NavigationBar";
import TryLoginAfterIndexPageFirstLoad from "../../Auth/TryLoginAfterIndexPageFirstLoad";
import {Route, Router, Switch} from "react-router-dom";
import NewsPage from "../../containers/NewsPage";
import LoginPage from "../../containers/LoginPage";
import Login from "../../Auth/Login";
import Logout from "../../Auth/Logout";
import AddNewsPage from "../../containers/NewsPage/AddNewsPage";
import DefecturaPage from "../../containers/DefecturaPage";
import NotFoundPage from "../../containers/NotFoundPage";
import {history} from "../../App";
import {Context} from "../../stores/store";
import Modal from "../Modal";

const RenderComponents = () => {
  const [state, dispatch] = useContext(Context);
  let modal = state.modal.showModal ? <Modal /> : null;

  return (
    <React.Fragment>
      { modal }
      <Router history={history}>
        <NavigationBar />
        <TryLoginAfterIndexPageFirstLoad />
        <Switch>
          <Route exact path="/" component={NewsPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/login/auth" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/news" component={NewsPage} />
          <Route exact path="/news/add_news_post" component={AddNewsPage} />
          <Route exact path="/defectura" component={DefecturaPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default RenderComponents;