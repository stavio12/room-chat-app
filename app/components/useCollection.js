import React, { useState, useEffect } from "react";
import { db } from "../firebase";

function useCollection(path, orderBy, where = []) {
  const [docs, setDocs] = useState([]);

  const [queryField, queryOperator, queryValue] = where;

  useEffect(() => {
    let collection = db.collection(path);
    if (orderBy) {
      collection = collection.orderBy(orderBy);
    }

    if (queryField) {
      collection = collection.where(queryField, queryOperator, queryValue);
    }

    const Data = collection.onSnapshot((snapshot) => {
      const docs = [];
      snapshot.forEach((doc) => {
        docs.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setDocs(docs);
    });
    return () => {
      Data();
    };
  }, [path, orderBy, queryField, queryOperator, queryValue]);

  return docs;
}

export default useCollection;
