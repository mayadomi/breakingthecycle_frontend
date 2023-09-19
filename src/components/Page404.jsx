import React from "react"
import { BrowserRouter, Route, Link, useLocation } from "react-router-dom"

function NotFound() {
    const Page404 = ({location})
    return(
        <div>
            <h3>No match found for <code>{location.pathname}</code></h3>
        </div>
    )
}
export default NotFound