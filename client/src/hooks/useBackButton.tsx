import { Button } from "react-bootstrap";
import useCustomHistory from "./useCustomHistory";
import React from "react";

const useBackButton = (uri: string) => {

    const [navigate] = useCustomHistory(uri);

    const BackButton = () => {
        return <Button onClick={navigate} variant="info"> Back </Button>
    }

    return [BackButton];
}

export default useBackButton;