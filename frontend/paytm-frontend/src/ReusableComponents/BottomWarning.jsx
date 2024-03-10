import React from 'react'
export default function BottomWarning({label,buttontext,to}){
    return(
        <>
<div >
    {label}
    </div>
     <a href={to}>{buttontext}</a>
        </>
    )
}