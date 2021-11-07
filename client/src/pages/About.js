import React from 'react';
import { Card, Container } from 'semantic-ui-react'
import '../background.css';
const styles = {
  headerStyle: {
    textAlign: 'center',
    paddingTop: '30px',
    paddingBottom: '20px',
    color: 'white'
    },
    containerStyle: {
      minHeight: '100vh'
    },
    cardStyle:{
        margin: '10px',
        padding: '20px',
        width: '50%',
      },
    cardGroupStyle: {
          paddingBottom: '300px',
          width: '100%'
    }
}

const About = () => {
    
    return (
        <div className='background'>
        <h1 style={styles.headerStyle}>About page</h1>    
        <Container style={styles.containerStyle}>
        <Card.Group centered itemsPerRow={1}>
            <Card style={styles.cardStyle}>    
            <h3>Created by Luke Thompson</h3>
            <h3><a href="https://github.com/LukeRT-UWA/Let-s-Talk-Tech">Repo Link</a></h3>
            <h3><a href="https://www.linkedin.com/in/luke-thompson-9085b511a/">My Linkedin</a></h3>
            <h3>😎😎😎</h3>
            </Card>
            </Card.Group>    
        </Container>
        </div>
    );
}

  export default About;
