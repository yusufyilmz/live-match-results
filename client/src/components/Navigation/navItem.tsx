import React from "react";
import { Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";

interface INavItemProps {
    title: string;
    link: string;
}

const NavigationItem = ({ title, link }: INavItemProps): JSX.Element => (
    <NavItem>
        <Nav.Link href={link} as={Link} to={link}>
            <h6 style={{ color: "black" }}>
                <span>{title} </span>
            </h6>
        </Nav.Link>
    </NavItem>
)

export default NavigationItem;
