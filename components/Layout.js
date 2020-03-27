import { Fragment, useState } from "react";
import AppContext from "../context/AppContext";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = ({ children, context }) => {
    const [modalContent, setModalContent] = useState(null);

    const handleUpdateModal = content => {
        if (!content) {
            document.getElementById("modal").checked = false;
            return;
        }
        setModalContent(content);
    };

    return (
        <AppContext.Provider
            value={{
                toggleModal: handleUpdateModal,
                ...context,
            }}
        >
            <Fragment>
                <input
                    type="checkbox"
                    name="modal"
                    id="modal"
                    className="modal__check"
                />
                <div
                    onClick={() => handleUpdateModal(null)}
                    className="modal__backdrop"
                />
                <div className="modal__container">
                    <div className="card modal__content-container">
                        {modalContent}
                    </div>
                </div>
                <NavBar />
                <div className="content-body">{children}</div>
                <Footer />
            </Fragment>
        </AppContext.Provider>
    );
};

export default Layout;
