import React from "react";

interface PropTypes {
    children: React.ReactNode
}

const TamplateDashboard = (props: PropTypes) => {
    return (
        <div>
            {props.children}
        </div>
    )
}

export default TamplateDashboard;