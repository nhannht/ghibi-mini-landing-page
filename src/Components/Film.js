import {Component} from "react";
import {ListGroup, ListGroupItem} from "react-bootstrap";

export class Film extends Component {
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
                    <ListGroup>
                        <ListGroupItem>Description: {element.description}</ListGroupItem>
                        <ListGroupItem>Origin title: {element.origin_title} </ListGroupItem>
                        <ListGroupItem>Release date: {element.release_date}</ListGroupItem>
                        <ListGroupItem>Director: {element.director}</ListGroupItem>
                        <ListGroupItem>Producer: {element.producer}</ListGroupItem>
                    </ListGroup>
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
