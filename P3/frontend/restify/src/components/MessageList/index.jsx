import { useContext, useEffect, useState } from 'react';
import { NotificationContext } from '../../contexts/NotificationContext';
import MessageCard from '../MessageCard';
import { Button, Container, Row, Col } from 'react-bootstrap';

const MessageList = () => {
  const { megList, setMegList, nextPage, setNextPage, prevPage, setPrevPage, currentPage, setCurrentPage, detail
  } = useContext(NotificationContext);

  // get the fetched all notification messages for the current user, allow the user to check detail card and ma
  useEffect(() => {
    fetch(`http://localhost:8000/notification/all/`, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${window.localStorage['jwt']}`
      },
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then(json => {
        setMegList(json.results);
        setNextPage(json.next);
        setPrevPage(json.previous);
      })
      .catch((error) => console.error(error));
  }, [])

  function handleNextPage() {
    if (nextPage) {
      fetch(nextPage, {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${window.localStorage['jwt']}`
        }
      })
        .then((response) => response.json())
        .then(json => {
          if (json.results) {
            setMegList(json.results);
            setNextPage(json.next);
            setPrevPage(json.previous);
            setCurrentPage(currentPage + 1);
          } else {
            window.location.reload();
          }
        })
        .catch((error) => console.error(error));
    }
  }

  function handlePrevPage() {
    if (prevPage) {
      fetch(prevPage, {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${window.localStorage['jwt']}`
        }
      })
        .then((response) => response.json())
        .then(json => {
          setMegList(json.results);
          setNextPage(json.next);
          setPrevPage(json.previous);
          setCurrentPage(currentPage - 1);
        })
        .catch((error) => console.error(error));
    }
  }

  return (
    <Container>
      {megList.map((message) => (
        <MessageCard key={message.id} message={message} />
      ))}
      <Row className="my-3">
        <Col className="d-flex justify-content-center">
          <Button onClick={handlePrevPage} variant={"outline-dark"} disabled={!prevPage}>
            Previous
          </Button>
          <Button onClick={handleNextPage} variant={"outline-dark"} disabled={!nextPage}>
            Next
          </Button>
        </Col>
      </Row>
      <Row className="my-3">
        <Col className="d-flex justify-content-center">
          <p>You are in page {currentPage}</p>
        </Col>
      </Row>
    </Container>);
}

export default MessageList;