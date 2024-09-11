import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import './index.css';

export const BreadcrumbsFunction = ({ link1, link2, link3, link4 ,link5,page}) => {
    
    const renderLink = (to, link, key) => {
        return link ? (
            <>
                <Link to={to} key={key} className="breadcrumbsLink">
                    {link}
                </Link>
              
                <span className="separator">›</span>
            </>
        ) : null;
    };

    return (
        <div className="breadcrumbsContainer">
            {renderLink("/", link1, "1")}
            {renderLink("/", link5, "5")}
            {renderLink("/", page, "5")}
            {renderLink("/", link2, "2")}
            {renderLink("/product", link3, "3")}
            {renderLink("/product", link4, "4")}
        </div>
    );
};
