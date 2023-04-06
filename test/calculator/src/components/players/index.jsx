import React, { useContext, useEffect, useState } from "react";
import { APIContext } from "../../contexts/APIContexts";

const Table = () => {
    const {players} = useContext(APIContext);
    return <table>
    <thead>
        <tr> 
            <th>First Name</th>
            <th>Last Name</th>
            <th>Position</th>
            <th>Height</th>
            <th>Teams</th>
        </tr>
    </thead>
    <tbody>
        {
            players.map(player => ( 
            <tr key={player.id}>
                <td>{player.first_name}</td>
                <td>{player.last_name}</td>
                <td>{player.position}</td>
                <td>{
                player.height_feet?
                `${player.height_feet}' ${player.height_inches}"`:``
            }</td>
                <td>{player.team_name}</td>
            </tr>) )
        }
    </tbody>
</table>
}

const Players = ()=>{
    const {setPlayers} = useContext(APIContext);
    const [query,setQuery] = useState({search:"", page:1});
    const [totalPages, setTotalPages] = useState(1);

    useEffect(()=> {
        const {search, page} = query;
        fetch(`https://www.balldontlie.io/api/v1/players?search=${search}&page=${page}`)
        .then(response => response.json())
        .then(json => {
            setPlayers(json.data)
            setTotalPages(json.meta.total_pages)
        });
    },[query])

    return <>
    <label>
        Search Player Name:
        <input value={query.search} onChange={event=>setQuery({search:event.target.value, page:1})} />
    </label>
    <Table/>
    <p>
        {
            query.page > 1  ?
            <button onClick={()=>setQuery({...query,page:query.page-1})}>Previous</button> : <> </>
        }
        {
            query.page < totalPages ?
            <button onClick={()=>setQuery({...query,page:query.page+1})}>Next</button> : <></>
        }
    </p>
    <p>Page {query.page} out of {totalPages}</p>
    </>

}

export default Players;