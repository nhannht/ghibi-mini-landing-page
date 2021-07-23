import './App.css';
import {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {Button, Modal} from "react-bootstrap";

class People extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: [],
            modalState: false,
            dataForModal: {
                name: "",
                gender: "",
            }
        }
    }

    componentDidMount() {
        const URL = "https://ghibliapi.herokuapp.com/people";
        fetch(URL).then(res => res.json()).then(json => this.setState({
            people: json
        })).catch(error => console.log('We have some error here ', error));

    }

    handleClose = () => this.setState({
        modalState: false
    });
    handleShow = (name,gender) => this.setState({
        modalState: true,
        dataForModal: {
            name: name,
            gender: gender
        }
    })

    render() {
        const card = this.state.people.map(element =>
            <div className={"card"}>
                <div className={"card-title"}>{element.name}</div>
                <div className={"card-body"}>
                    <ul>
                        <Button variant="primary" onClick={event => this.handleShow(element.name,element.gender)}>
                            See more
                        </Button>

                        <li> Age {element.age}</li>
                        <li> Name: {element.name}</li>
                        <li>Films: {element.films}</li>
                    </ul>
                </div>
            </div>
        )
        return (
            <div className={"container"}>
                <h2>People</h2>
                {card}
                <Modal show={this.state.modalState} onHide={this.handleClose} fullscreen={'sm-down'}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.dataForModal.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.dataForModal.gender}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
}

class Film extends Component {
    constructor(props) {
        super(props);
        this.state = {
            films: [],
        }

    }

    componentDidMount() {
        const URL = "https://ghibliapi.herokuapp.com/films";
        fetch(URL).then(res => res.json()).then(json => this.setState({
            films: json
        })).catch(e => console.log(e));
    }

    render() {
        const card = this.state.films.map(element =>
            <div className={"card"}>
                <div className={"card-title"}>{element.title}</div>
                <div className={"card-body"}>
                    <ul>
                        <li>Description: {element.description}</li>
                        <li>Origin title: {element.origin_title} </li>
                        <li>Release date: {element.release_date}</li>
                        <li>Director: {element.director}</li>
                        <li>Producer: {element.producer}</li>
                    </ul>
                </div>
            </div>)
        return (
            <>
                <h2>Test film</h2>
                {card}
            </>
        )
    }
}

function Panel() {
    return (
        <Router>
            <ul className={"nav  justify-content-evenly"}>
                <li className={"nav-item"}>
                    <Link to={"/film"}>Film</Link>
                </li>
                <li className={"nav-item"}><Link to={"/people"}>
                    People
                </Link></li>
            </ul>
            <Switch>
                <Route path={"/film"}>
                    <Film/>
                </Route>
                <Route path={"/people"}>
                    <People/>
                </Route>
            </Switch>
        </Router>
    )
}


function App() {
    return (
        <div className="container border border-danger">
            <Panel/>

        </div>
    );
}

export default App;
