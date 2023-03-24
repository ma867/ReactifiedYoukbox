import {
    Navbar, Nav, Form, Button, NavDropdown
} from "react-bootstrap";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { logOut } from "../../utilities/users-service";
import { useEffect, useRef } from "react";

import "./Navbar.scss";
export default function NavBar({
    page,
    user,
    navigate,
    searchBarData,
    setSearchBarData,
    setAuth,
    FontAwesomeIcon,
    setShowUploadSongModal,
    setShowCreatePlaylistModal
}) {
    const navbarRef = useRef(null);

    ;

    const handleChange = (e) => {
        setSearchBarData(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${searchBarData}`);
    };

    const changeNavbarColorOnScroll = () => {
        window.addEventListener("scroll", function () {
            if (page === 'home') {
                if (window.pageYOffset > 100) {
                    navbarRef.current.classList.add("navbar-dark");
                    navbarRef.current.classList.remove("nav-image");
                } else {
                    navbarRef.current.classList.remove("navbar-dark");
                    navbarRef.current.classList.add("nav-image");
                }
            }
            else {
                if (window.pageYOffset > 100) {
                    navbarRef.current.classList.add("navbar-dark");
                    navbarRef.current.classList.remove("nav-image-logged-in");
                } else {
                    navbarRef.current.classList.remove("navbar-dark");
                    navbarRef.current.classList.add("nav-image-logged-in");
                }
            }

        });
    };

    useEffect(() => {
        changeNavbarColorOnScroll();
    }, [])


    return (
        <Navbar
            ref={navbarRef}
            className={page === 'home' ? 'nav-image fixed-top' : 'nav-image-logged-in fixed-top'}
            collapseOnSelect
            expand="lg"
            style={{ fixed: "top" }}
        >

            <Navbar.Brand href="/" onClick={() => setAuth(false)}>
                <img
                    width="200"
                    src="https://i.imgur.com/gGmlYWA.png"
                    alt="youkbox"

                />
            </Navbar.Brand>
            {
                user ?
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    :
                    ""
            }

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    {!user ? (
                        ""
                    ) :
                        (
                            <>

                                <Nav.Link href="/">Songs</Nav.Link>
                                <Nav.Link href="/playlists">Playlists</Nav.Link>



                                {page === "playlists" ? (
                                    <Nav.Link
                                        href=""
                                        onClick={() => { setShowCreatePlaylistModal(true) }}
                                    >
                                        New Playlist
                                    </Nav.Link>
                                ) :
                                    page === "songs" ? (
                                        <Nav.Link
                                            href=""
                                            onClick={() => { setShowUploadSongModal(true) }}

                                        >
                                            Upload Song
                                        </Nav.Link>
                                    ) :
                                        ""}
                                <Form className="d-flex nav-search-form" onSubmit={handleSubmit}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Search song..."
                                        className="me-2 nav-search"
                                        aria-label="Search"
                                        onChange={handleChange}
                                        value={searchBarData}
                                    />
                                    <Button type="submit" className="nav-search-button">
                                        <FontAwesomeIcon icon={faMagnifyingGlass} className='light m-0' />

                                    </Button>
                                </Form>

                                <NavDropdown title={<div className='nav-profile-icon' style={{ backgroundImage: `url(${user?.image})` }} />} id="collasible-nav-dropdown">
                                    {/* <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item> */}
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/" onClick={() => {
                                        logOut();

                                    }}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>


                            </>
                        )}
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    );
}
