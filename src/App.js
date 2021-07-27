import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import {Component, useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {
    Button,
    Card,
    Col,
    Container,
    Image,
    ListGroupItem,
    Modal,
    Nav,
    Navbar,
    NavItem, OverlayTrigger,
    Row, Tooltip
} from "react-bootstrap";
import * as PropTypes from "prop-types";
import {Film} from "./Components/Film";
import {CardFilm} from "./Components/CardFilm";
import {AiFillQuestionCircle} from "react-icons/ai";

// import mamma from './mamma.png';

class PeopleModal extends Component {

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide} fullscreen={"sm-down"}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.dataForModal.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.dataForModal.classification}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.props.onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

PeopleModal.propTypes = {
    show: PropTypes.any,
    onHide: PropTypes.func,
    dataForModal: PropTypes.any
};

class People extends Component {
    constructor(props) {
        super(props);

        this.state = {
            people: [],
            peopleExtractFromSearch: [],
            query: "",
            dataForModal: [],

            searchState: false,
            modalState: false,

        }
    }

    componentDidMount() {
        this.initFetchDataPeopleFromApi().then(result => {
            this.setState({
                people: result
            });
        })
    }


    initFetchDataPeopleFromApi = async () => {
        const URL = "https://ghibliapi.herokuapp.com/people";
        const res = await fetch(URL);
        if (res.status !== 200) throw new Error('Error when fetch');
        return res.json();
    }

    handleClose = () => this.setState({
        modalState: false
    });
    handleShow = (url) => {
        fetch(url).then(res => res.json())
            .then(result => [result.name, result.classification]).then(([name, classification]) => this.setState({
            modalState: true,
            dataForModal: {
                name: name,
                classification: classification
            }
        }))
    }

    searchFunction = async (query, data) => {
        const result = data.filter(person => {
            return (person.name.search(query) !== -1)
        })
        return result;
    }

    handleInputSearch = (event) => {
        this.searchFunction(event.target.value, this.state.people).then(result => {
            this.setState({
                searchState: true,
                query: event.target.value,
                peopleExtractFromSearch: result
            })
        });
    }


    render() {
        let people = (!this.state.searchState) ? this.state.people : this.state.peopleExtractFromSearch;
        const card = people.map(person =>
            <Col>
                <Card role={"card"} key={person.id}>
                    <Card.Header className={"card-title"}>{person.name}</Card.Header>
                    <ListGroupItem action>Name: {person.name}</ListGroupItem>
                    <ListGroupItem action> Age {person.age}</ListGroupItem>
                    <CardFilm films={person.films}/>
                    <ListGroupItem action>Gender: {person.gender}</ListGroupItem>
                    <ListGroupItem action>Eye color: {person.eye_color}</ListGroupItem>
                    <ListGroupItem action>Hair color: {person.hair_color}</ListGroupItem>
                    <ListGroupItem action onClick={event => this.handleShow(person.species)}>
                        Click here to see more about species
                    </ListGroupItem>
                </Card>
            </Col>
        )
        return (
            <Container>
                <nav className={" navbar"}>
                    <h4 className={"text-center"}>People</h4>
                    <form id={"search-bar"} className={"form-inline"} onSubmit={event => event.preventDefault()}>
                        <input className={"form-control"} name={"searchForm"} type={"search"}
                               placeholder={"Search by name"} onChange={this.handleInputSearch}/>
                    </form>

                </nav>
                <Row md={3} xs={1}>{card}</Row>
                <PeopleModal show={this.state.modalState} onHide={this.handleClose}
                             dataForModal={this.state.dataForModal}/>
            </Container>
        );
    }
}

function Panel() {
    return (
        <Navbar className={'bg-light'}>
            <Container>
                <Navbar.Brand>
                    <Image src='./ghibli-cat.jpg' className={'w-25 h-25 '} roundedCircle={true} alt={"hello"}/>
                </Navbar.Brand>
                <Nav>
                    <NavItem title={"People/Film"}>
                        <Nav.Link href={"/People"} role={"people-link"}>
                            People
                        </Nav.Link>
                    </NavItem>
                    <NavItem>
                        <Nav.Link href={"/film"} role={"film-link"}>
                        Film
                    </Nav.Link>
                    </NavItem>
                </Nav>
            </Container>
        </Navbar>
    )
}


class TooltipButton extends Component {

    render() {
        const renderTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                This is a simple toy for fan of Ghibli studio , press "/" to enter search
            </Tooltip>
        );
        return <OverlayTrigger
            placement={"left"}
            delay={{show: 250, hide: 250}}
            overlay={renderTooltip}>
            <div id={"help-button"}><AiFillQuestionCircle/></div>
        </OverlayTrigger>;
    }
}

TooltipButton.propTypes = {overlay: PropTypes.func};

function App() {

    useEffect(() => {
        document.addEventListener("keypress", (e) => {
            if (e.key === "/") {
                e.preventDefault();
                let searchBar = document.getElementById("search-bar");
                searchBar.scrollIntoView();
                searchBar.querySelector("input").focus();
            }
        })

    })

    return (
        <Container>
            <Panel/>
            <Router>
                <Switch>
                    <Route path={"/film"}>
                        <Film/>
                    </Route>
                    <Route path={["/people","/"]}>
                        <People/>
                    </Route>
                </Switch>
            </Router>
            <TooltipButton/>
        </Container>
    );
}

export default App;
