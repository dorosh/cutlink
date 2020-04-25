import React, {useState, useEffect, useContext} from "react"
import {useHistory} from "react-router-dom"
import {useHttp} from '../hooks/http_hooks'
import {AuthContext} from "../context/AuthContext"


export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState('')

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async event => {

        if (event.key === 'Enter') {
            try {
                const data = await request(
                    '/api/link/generate',
                    'POST',
                    {from: link},
                    {Authorization: `Bearer ${auth.token}`}
                )
                console.log(data)
                history.push(`/detail/${data.link._id}`)
            } catch (e) {}
        }
    }
    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <input
                    placeholder="Add link"
                    id="link"
                    type="text"
                    onChange={e => setLink(e.target.value)}
                    onKeyPress={pressHandler}
                    value={link}
                />
                <label htmlFor="link">create link</label>
            </div>
        </div>
    )
}