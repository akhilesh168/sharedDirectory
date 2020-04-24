import React from 'react';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ShareModal from '../modal/modal';

export default function HomeContainer() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Container maxWidth="sm" style={{ backgroundColor: "skyblue", width: "450px", height: "400px" }}>
                <h3 className="text-center">Share Files</h3>
                <div className="home_btn text-center">
                    <Button color="primary" variant="contained" onClick={() => setModalShow(true)}>
                        Share
      </Button>

                </div>

                <ShareModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </Container>

        </>
    );
}