import { useHistory } from "react-router-dom";

const useCustomHistory = (uri: string) => {

    const history = useHistory();

    const navigate = () => {
        history.push(uri);
    }

    return [navigate]
}


export default useCustomHistory;