import { useCallback } from "react";
import useFetch, { FetchType } from "./useFetch";
import { useMatchDataStateContext } from "../context";

const usePostData = (uri: string, navigate: string): [(A: any) => void] => {

    const { state } = useMatchDataStateContext();

    const [onDemandFetch] = useFetch(navigate);

    const postData = useCallback((data: any) => {
        onDemandFetch(uri,
            FetchType.add,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...data, id: state.id})
            });
    }, [uri]);

    return [postData];
};


export default usePostData;