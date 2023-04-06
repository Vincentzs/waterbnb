import { useParams } from "react-router-dom"
import { APIContext, useAPIContext } from "../../contexts/APIContexts"
import Players from "../../components/players"

const Baseball = ()=>{
    const {groupID} = useParams();

    return <main>
    <APIContext.Provider value={useAPIContext()}>
      <Players />
      <p>You are in group {groupID}.</p>
    </APIContext.Provider>
  </main>
}

export default Baseball