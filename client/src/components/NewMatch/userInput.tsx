import React from "react";
import { InputGroup, Button, FormControl } from "react-bootstrap";
import useUserInput from "../../hooks/useUserInput";

interface UserInputProps {
    onClick: (name: string) => void;
}

const UserInput = ({ onClick }: UserInputProps) => {

    const [value, onChange, reset] = useUserInput();

    return (
        <InputGroup style={{ paddingTop: "2em" }} className="mb-3">
            <FormControl
                value={value}
                aria-label="Username"
                onChange={onChange}
                placeholder="UserName"
            />
            <InputGroup.Prepend>
                <Button variant="outline-secondary"
                    onClick={() => {
                        reset();
                        onClick(value);
                    }}>
                    Add new player
                </Button>
            </InputGroup.Prepend>
        </InputGroup>
    );
};

export default UserInput;