// src/hooks/useFirebase.js
import { useState, useEffect } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { database } from '../firebase';

export function useFirebase(path) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const dbRef = ref(database, path);
    setLoading(true);

    const handleData = (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        setData(null);
      }
      setLoading(false);
    };

    const handleError = (err) => {
      setError(err);
      setLoading(false);
    };

    onValue(dbRef, handleData, handleError);

    // Cleanup function
    return () => {
      off(dbRef);
    };
  }, [path]);

  return { data, loading, error };
}