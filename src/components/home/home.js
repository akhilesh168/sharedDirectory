import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ShareModal from '../modal/modal';

export default function HomeContainer() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Container maxWidth="sm">
                <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '220px' }} />
                <Button color="primary" style={{ "left": "200px" }} variant="contained" onClick={() => setModalShow(true)}>
                    Share
      </Button>

                <ShareModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </Container>

        </>
    );
}