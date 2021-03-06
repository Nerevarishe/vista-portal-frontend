import React, { useState, useContext, useEffect } from "react";
import { history } from "../../../App";

import CKEditor from "@ckeditor/ckeditor5-react";

import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import editorConfiguration from "../../../config/CKEditorConf";

import { Context } from "../../../stores/store";

import { savePost, fetchNewsPost } from "./utils";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import PrivateRoute from "../../../Auth/PrivateRoute";

const AddNewsPage = () => {
  const [state, dispatch] = useContext(Context);
  const [newsPost, setNewsPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchNewsPost(state);
      if (response && response.status === 200) {
        setNewsPost(response.data.post["post_body"]);
      }
    };
    if (state.newsPosts["editorMode"] === "edit") {
      fetchData();
    }
  }, [state]);

  const savePostHandler = async () => {
    const response = await savePost(state, newsPost);
    if (response.status === 200 || response.status === 201) {
      dispatch({ type: "RESET_POST" });
      history.push("/");
    }
  };

  return (
    <PrivateRoute>
      <Container>
        <p>Add News Page</p>
        <CKEditor
          editor={ClassicEditor}
          config={editorConfiguration}
          data={newsPost}
          onInit={(editor) => {
            editor.editing.view.focus();
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setNewsPost(data);
          }}
        />
        <Button className="mt-1" onClick={savePostHandler}>
          Save
        </Button>
      </Container>
    </PrivateRoute>
  );
};

export default AddNewsPage;
