import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import Modal from "./modal/Modal";

export const FontContext = createContext();

const Cardlist = () => {
    const Font = {
      primary: {
        value: "serif",
      },
      secondary: {
        value: "monospace",
      },
    };
  
    const [card, setCard] = useState([]);
    const [modalShow, setModalshow] = useState(false);
    const [phone, setPhone] = useState("");
    const [valuefont, setValuefont] = useState(Font.primary);
  
    const handleButton = (phoneValue) => {
      setModalshow(true);
      setPhone(phoneValue);
    };
  
    useEffect(() => {
      axios
        .get("data.json")
        .then((data) => {
          console.log(data.data);
          setCard(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    return (
      <FontContext.Provider value={valuefont}>
        <div style={{ marginTop: 20 }}>
          <Typography style={{ margin:"auto", textAlign:"center", backgroundColor:"#FF3333", fontSize:"2.5em", fontStyle:"bold", fontColor:"white" }}>
            Daftar User Card
          </Typography>
          <Modal
            phone={phone}
            show={modalShow}
            onHide={() => setModalshow(false)}
            changefont={() => setValuefont(Font.secondary)}
          />
          <Grid
            container
            md={11}
            spacing={5}
            style={{ marginTop: "100px", marginLeft: "50px" }}
          >
            {card.map((results) => {
              return (
                <Grid item key={results.name} md={3}>
                  <Card>
                    <CardActionArea onClick={() => handleButton(results.phone)}>
                      <CardContent style={{ backgroundColor: "cfe8fc" }}>
                        <Typography>Name: {results.name}</Typography>
                        <Typography>Username: {results.username}</Typography>
                        <Typography>Email: {results.email}</Typography>
                        <Typography>Phone: {results.phone}</Typography>
                        <Typography>Website: {results.website}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </FontContext.Provider>
    );
  };
  
  export default Cardlist;  
