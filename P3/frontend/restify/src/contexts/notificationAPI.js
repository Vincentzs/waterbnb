export function useNotficationAPI() {
    const [players,setPlayers] = useState([]);

    return {
        players,setPlayers
    };
}
