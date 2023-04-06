import { createContext, useState } from "react";

export const APIContext = createContext({
    players : [],
    setPlayers:()=>{},
})

export function useAPIContext() {
    const [players,setPlayers] = useState([]);
    // const [query,setQuery] = useState({search:"", page:1});
    // const [totalPages, setTotalPages] = useState(1);

    return {
        players,setPlayers
    };
}