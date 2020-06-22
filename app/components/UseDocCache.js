import React, { useState, useEffect } from "react";
import { db } from "../firebase";

const cache = {};

const pendingCache = {};

export default function useDoc(path) {
  const [doc, setDoc] = useState();

  useEffect(() => {
    if (doc) {
      return;
    }

    let stillMounted = true;

    const pending = pendingCache[path];
    const promise = pending || (pendingCache[path] = db.doc(path).get());
    promise.then((doc) => {
      if (stillMounted) {
        const user = {
          ...doc.data(),
          id: doc.id,
        };
        setDoc(user);
        cache[path] = user;
      }
    });
    return () => {
      stillMounted = false;
    };
  }, [path]);

  return doc;
}
