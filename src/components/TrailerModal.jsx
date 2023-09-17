import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useTrailer from '../hooks/useTrailer'

const TrailerModal = ({setTrailerId, setTrailerName, id, type, name}) => {
  const [show, setShow] = useState(true);

  const [foundTrailer, setFoundTrailer] = useState(null)
  const [foundTeaser, setFoundTeaser] = useState(null)
  const [showTeaser, setShowTeaser] = useState(false)
  const [showTrailer, setShowTrailer] = useState(false)

  const { data: trailer} = useTrailer(id, type)

  const handleClose = () => {
    setTrailerId(null);
    setTrailerName(null)
    setShow(false);
  } 
  const handleTeaser = () => {
    setShowTrailer(false)
    setShowTeaser(true)
  }
  const handleTrailer = () => {
    setShowTrailer(true)
    setShowTeaser(false)
  }

  useEffect(()=> {

    if(trailer) {
        const findTrailer = trailer.find(video => (video.name === "Main Trailer" || video.name.toLowerCase().includes("trailer")) &&
        video.type === "Trailer" &&
        video.site === "YouTube")
        if(findTrailer){
            setFoundTrailer(findTrailer) 
            setShowTrailer(true)
        }
        else {
            const findTrailer2 = trailer.find(video =>
            video.type === "Trailer" &&
            video.site === "YouTube")
            if(findTrailer2){
                setFoundTrailer(findTrailer2) 
                setShowTrailer(true)
            }
        }

        const findTeaser = trailer.find(video =>
        video.type === "Teaser" &&
        video.site === "YouTube")

        if(findTeaser){
            setFoundTeaser(findTeaser) 
        }
    }

  }, [trailer])


  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" className='trailer-modal'>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="video-container">
          {showTrailer &&  !showTeaser ? (
            <div className="video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${foundTrailer.key}`}
                title="YouTube Trailer Video"
              />
            </div>
          ) : null}
          {showTeaser && !showTrailer ? (
            <div className="video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${foundTeaser.key}`}
                title="YouTube Trailer Video"
              />
            </div>
          ) : null}

          {!foundTrailer && !showTeaser ? 
            <p>No trailer found for this {type === "movie" ? "movie" : "TV series"}.</p>
        :null}
        </div>

        </Modal.Body>
       {foundTeaser && !showTeaser ?  <Modal.Footer>
          <Button variant="secondary" onClick={handleTeaser}>
            Watch teaser
          </Button>
        </Modal.Footer> : null }
        {foundTrailer && showTeaser ?  <Modal.Footer>
          <Button variant="secondary" onClick={handleTrailer}>
            Watch trailer
          </Button>
        </Modal.Footer> : null }
      </Modal>
    </>
  );
}

export default TrailerModal;