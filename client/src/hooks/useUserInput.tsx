import { useState } from "react";

const useUserInput = (): [string, (e: any) => void, () => void] => {

    const [value, setValue] = useState<string>('');

    const onChange = (e: any) => {
        setValue(e.target.value);
    };

    const reset = () => {
        setValue('');
    };

    return [value, onChange, reset]
}

export default useUserInput;