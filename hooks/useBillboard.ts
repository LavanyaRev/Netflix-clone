import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { MovieInterface } from "@/types";

const useBillboard = () => {
  const { data, error, isLoading } = useSWR<MovieInterface>(
    '/api/random',
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data,
    error,
    isLoading
  };
};

export default useBillboard;
