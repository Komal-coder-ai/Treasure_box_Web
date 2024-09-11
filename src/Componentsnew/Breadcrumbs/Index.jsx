import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import './index.css';  
export const BreadcrumbsFunction = ({ link1, link2, link3 }) => {
    return (
        <>
            <Link to={"/"} key="1" className="breadcrumbsLink">
                {link1}
            </Link>

            <Link to={"/"} key="2" className="breadcrumbsLink">
                {link2}
            </Link>

            <Link to={"/product"} key="3" className="breadcrumbsLink">
                {link3}
            </Link>
            <Link to={"/product"} key="3" className="breadcrumbsLink">
                {link3}
            </Link>
        </>
    );
};
