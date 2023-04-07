import { createContext, useState } from "react";

export const NotificationContext = createContext();

export function useNotificationContext() {
  const [megList, setMegList] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetail, setShowDetail] = useState(false);
  const [detail, setDetail] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  
  return {
    megList,setMegList,
    nextPage,setNextPage,
    prevPage,setPrevPage,
    currentPage,setCurrentPage,
    showDetail, setShowDetail,
    detail, setDetail,
    showDelete, setShowDelete,
  };
}
