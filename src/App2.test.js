import {render, screen} from '@testing-library/react';
import App from "./App";
import People from "./App"
import {rest} from "msw";
import {setupServer} from "msw/node";
import {Film} from "./Components/Film";

// eslint-disable-next-line no-unused-vars
const server = setupServer(
    rest.get('https://ghibliapi.herokuapp.com/people', (req, res, ctx) => {
        return res(
            ctx.delay(0),
            ctx.status(200, 'Mock status'),
            ctx.json(
                [
                    {
                        "id": "fe93adf2-2f3a-4ec4-9f68-5422f1b87c01",
                        "name": "Pazu",
                        "gender": "Male",
                        "age": "13",
                        "eye_color": "Black",
                        "hair_color": "Brown",
                        "films": [
                            "https://ghibliapi.herokuapp.com/films/2baf70d1-42bb-4437-b551-e5fed5a87abe"
                        ],
                        "species": "https://ghibliapi.herokuapp.com/species/af3910a6-429f-4c74-9ad5-dfe1c4aa04f2",
                        "url": "https://ghibliapi.herokuapp.com/people/fe93adf2-2f3a-4ec4-9f68-5422f1b87c01"
                    },
                    {
                        "id": "598f7048-74ff-41e0-92ef-87dc1ad980a9",
                        "name": "Lusheeta Toel Ul Laputa",
                        "gender": "Female",
                        "age": "13",
                        "eye_color": "Black",
                        "hair_color": "Black",
                        "films": [
                            "https://ghibliapi.herokuapp.com/films/2baf70d1-42bb-4437-b551-e5fed5a87abe"
                        ],
                        "species": "https://ghibliapi.herokuapp.com/species/af3910a6-429f-4c74-9ad5-dfe1c4aa04f2",
                        "url": "https://ghibliapi.herokuapp.com/people/598f7048-74ff-41e0-92ef-87dc1ad980a9"
                    }]
            )
        )
    })
)
beforeAll(() => {
        server.listen()
    }
)

afterEach(() => {
    server.resetHandlers();

});

afterAll(() => {
    server.close();
})

test('if people link work or not', async () => {
    render(<App/>);

    // userEvent.click(
    //     screen.getByRole("film-link")
    // )
    // eslint-disable-next-line testing-library/no-await-sync-query
    const result = await screen.findAllByRole("card");
    expect(result.length).toEqual(2);
    render(<People/>);
    const result2 = await screen.findAllByRole("card");
    expect(result2.length).toEqual(2);

})

test('if film link work or not', async () => {
    server.use(
        rest.get('https://ghibliapi.herokuapp.com/films', (req, res, ctx) => {
            {
                return res(
                    ctx.delay(250),
                    ctx.status(200),
                    ctx.json(
                        [
                            {
                                "id": "2baf70d1-42bb-4437-b551-e5fed5a87abe",
                                "title": "Castle in the Sky",
                                "original_title": "天空の城ラピュタ",
                                "original_title_romanised": "Tenkū no shiro Rapyuta",
                                "description": "The orphan Sheeta inherited a mysterious crystal that links her to the mythical sky-kingdom of Laputa. With the help of resourceful Pazu and a rollicking band of sky pirates, she makes her way to the ruins of the once-great civilization. Sheeta and Pazu must outwit the evil Muska, who plans to use Laputa's science to make himself ruler of the world.",
                                "director": "Hayao Miyazaki",
                                "producer": "Isao Takahata",
                                "release_date": "1986",
                                "running_time": "124",
                                "rt_score": "95",
                                "people": [
                                    "https://ghibliapi.herokuapp.com/people/"
                                ],
                                "species": [
                                    "https://ghibliapi.herokuapp.com/species/af3910a6-429f-4c74-9ad5-dfe1c4aa04f2"
                                ],
                                "locations": [
                                    "https://ghibliapi.herokuapp.com/locations/"
                                ],
                                "vehicles": [
                                    "https://ghibliapi.herokuapp.com/vehicles/"
                                ],
                                "url": "https://ghibliapi.herokuapp.com/films/2baf70d1-42bb-4437-b551-e5fed5a87abe"
                            }
                        ]
                    ))
            }
        }));
    render(<Film/>);
    const result = await screen.findAllByRole("card");
    expect(result.length).toEqual(1);
})
