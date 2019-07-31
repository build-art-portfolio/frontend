import React, { useState, useEffect } from "react";
import { Container, Image, Header, Modal, Pagination } from "semantic-ui-react";
import axios from "axios";

function Gallery() {
  const [images, setImages] = useState([]);
  const [activePage, setActivePage] = useState(1);

//   Function for returning slices of array, based on number of images per page (n), and which page we're on (page).
  function paginate(array, n, page){
    if (page === 1){
        return array.slice(0,n)
    } else {
        return array.slice((page-1)*n, page*n)
    }
  }

//   function handlePageChange((e, {activePage})=>)

  useEffect(() => {
    axios
      .get("https://art-portfolio-be.herokuapp.com/api/posts")
      .then(data => {
        console.log(data);
        setImages(paginate(data.data, 9, activePage))
        // setImages(data.data.slice(9,18));
      });
  }, [activePage]);

  return (
    <Container fluid>
      <Header
        textAlign="center"
        as="h1"
        style={{ fontSize: "48px", lineHeigh: "58px", marginTop: "44px" }}
      >
        Gallery
      </Header>
      <Container style={galleryContainer}>
        {images.map(image => (
          <div>
            <Modal
              basic
              size="big"
              style={modalStyle}
              trigger={<Image style={imageStyle} src={image.url} />}
            >
              {/* <Modal.Header>Select a Photo</Modal.Header> */}
              <Image style={{ margin: "0px 0px" }} src={image.url} />
              <Modal.Content style={{backgroundColor:"#D3D4DE"}}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                      <Header as="h5" compact style={{margin:"0px", color:"#006FBB"}}>@{image.username}</Header> 
                      {/* TODO: Make above header a link to profile route */}
                      <Header as="h5" style={{margin:"0px", lineHeight:"20px", color:"#000639"}}>{Date(image.createdAt).toString().slice(3,10)+','+Date(image.createdAt).toString().slice(10,15)}</Header>
                </div>
                  <Modal.Description>
                      <p style={{color:"black"}}>{image.description}</p>
                  </Modal.Description>
              </Modal.Content>
            </Modal>
          </div>
        ))}
      </Container>
      <Pagination 
        boundaryRange={0}
        defaultActivePage={1}
        activePage={activePage}
        //onPageChange={handlePageChange}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={1}
        totalPages={10}
        />
    </Container>
  );
}

const galleryContainer = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  width: "1500px"
};
const imageStyle = {
  overflow: "hidden",
  height: "336px",
  width: "336px",
  objectFit: "cover",
  margin: "22.5px 24px"
};

const modalStyle = {
  width: "auto",
  height: "auto",
  maxWidth: "1000px",
  objectFit: "contain",
//   borderRadius: "0px"
};

export default Gallery;