import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import usePouchDb from '../customHooks/usePouchDb'
// import ModelBar from './BarModel/ModelBar'
// import TopBar from './BarTop/TopBar'
import DrawingSpace from './Canvas/DrawingSpace'


const Workspace = () => {


    //---customHooks-------
    const { createModelInDb } = usePouchDb();


    //------useEffects-------
    useEffect(() => {
        createModelInDb();// create/fetch model on refresh/reload the page
    }, []);

    return (
        <Container fluid className='p-0'>
            {/* <TopBar />
            <ModelBar /> */}
            <DrawingSpace />
        </Container>
    )
}

export default Workspace