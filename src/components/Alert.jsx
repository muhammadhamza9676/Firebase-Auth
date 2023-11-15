import React from 'react'

export default function Alert(props) {
    const capitalize = (word) =>{
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show my-0 rounded-0`} role="alert" style={{ zIndex: 1}}>
            <strong>{capitalize(props.alert.type === "danger"?"Error":props.alert.type)}!</strong> {props.alert.msg}
        </div>
        
    )
}