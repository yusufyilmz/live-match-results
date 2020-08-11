import React, { useState, useCallback, useEffect } from "react";
import { Button } from "react-bootstrap";

const useShowMore = (items: Array<unknown>) => {

    const [listitems, setItems] = useState<any>([]);
    const [lastCount, setLastCount] = useState(0);
    const [showMore, setShowMore] = useState(false);

    const populateList = useCallback(
        (count) => {
            const arr = [...items.slice(0, count + 5)];
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            items.length > arr.length ? setShowMore(true) : setShowMore(false);
         
            setItems(arr);
        },
        [items]
    );


    useEffect(() => {
         populateList(lastCount);
    }, [lastCount, populateList]);


    const ShowMoreButton = () => {
        return showMore && (
            <Button
                style={{ width: '100%'}}
                key="button"
                variant="info"
                onClick={() => setLastCount(i  => i + 5)}>
                Show more</Button>
        )
    }
    return [listitems, ShowMoreButton];
}

export default useShowMore;