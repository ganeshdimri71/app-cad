import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import usePouchDb from '../customHooks/usePouchDb'
import { removeHangingLine } from '../store/sliceModel'
// import ModelBar from './BarModel/ModelBar'
// import TopBar from './BarTop/TopBar'
import DrawingSpace from './Canvas/DrawingSpace'


const Workspace = () => {

    const dispatch = useDispatch();
    //---customHooks-------
    const { createModelInDb } = usePouchDb();


    //------useEffects-------
    useEffect(() => {
        createModelInDb();// create/fetch model on refresh/reload the page
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'Escape')
            dispatch(removeHangingLine())
    }

    return (
        <Container fluid className='p-0' tabIndex={0} onKeyDown={e => handleKeyDown(e)}>
            {/* <TopBar />
            <ModelBar /> */}
            <DrawingSpace />
        </Container>
    )
}

export default Workspace