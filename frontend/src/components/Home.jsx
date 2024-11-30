import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {v4 as uuidV4} from 'uuid'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Home = () => {
    const {user} = useContext(AuthContext);
    const [snippets, setSnippets] = useState([])
    const navigate = useNavigate();
    const handleClick = () => {
        const id = uuidV4();
        navigate(`/editor/${id}`)
    }
    useEffect(() => {
        const getAllSnippets = async () => {

            const snippets = await axios.get(`http://localhost:3000/api/snippet/user/${user._id}`)
            setSnippets(snippets.data)
        }
        getAllSnippets();
    }, [])
    console.log(snippets)
  return (
    <div>
        <h1>Welcome to CompileX!</h1>
        <p>This is a code compiler and executor for various programming languages.</p>
        <p>Please select a language from the dropdown menu or click on a code snippet to start.</p>
        <button onClick={handleClick}>New</button>

        {snippets.map(s => (
            <Link to={`/editor/${s.codeId}`} key={s._id}>
                <h3>{s.name}</h3>
                <p>{s.language}</p>
            </Link>
        ))}

        {user && <p>Logged in as {user.username}</p>}

        {!user && <p>Please log in to view your saved snippets.</p>}

        <p>Powered by <a href="https://github.com/compileX/compileX">CompileX</a></p>
    </div>
  )
}

export default Home