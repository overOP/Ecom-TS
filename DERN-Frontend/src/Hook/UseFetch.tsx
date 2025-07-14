import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

function useFetch<T = unknown>(url: string): [T | null, boolean, AxiosError | null] {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setData(response.data.data);
      } catch (err) {
        setError(err as AxiosError);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return [data, loading, error];
}

export default useFetch;