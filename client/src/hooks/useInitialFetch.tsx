import useFetch, { FetchType } from "./useFetch";
import { useEffect } from "react";

const useInitialFetch = (uri: string, navigate: string) => {

    const [onDemandFetch] = useFetch(navigate);
  
    useEffect(() => {
      onDemandFetch(uri,
        FetchType.getAll,
        {});
    }, [])
  }

  export default useInitialFetch;
  
  