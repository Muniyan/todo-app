import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {

    componentDidMount = () => {
        window.document.title = "404";
    }

    render() {
        return (
            <div className="notFound-inner">
                Page Not Found
                <ul className="notFound-inner-ul">
                    <li className="notFound-inner-li">
                        <Link to="/">Go to Home</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default NotFound;