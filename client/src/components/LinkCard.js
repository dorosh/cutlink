import React from "react"


export const LinkCard = ({link}) => {
    return (
        <>
            <h2>Link</h2>
            <p>Your link: <a href={link.to} target="_blank" rel="nooperen noreferrer"> {link.to} </a></p>
            <p>From: <a href={link.from} target="_blank" rel="nooperen noreferrer"> {link.from} </a></p>
            <p>Count: {link.clicks} </p>
            <p>Date: {new Date(link.date).toLocaleDateString()} </p>
        </>
    )
}