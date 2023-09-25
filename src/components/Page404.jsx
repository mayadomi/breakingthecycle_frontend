import React from "react"
import { BrowserRouter, Route, Link, useLocation } from "react-router-dom"

function NotFound() {
    const Page404 = ({location})
    return(
    <div className="section-header">
        <h3 >Oh noes! We couldn't find this page</h3>
        <div className="Oh404">
            <img src="./assets/404.jpg" width="600"></img>
        </div></div>
    )
}
export default NotFound