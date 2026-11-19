import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {v4 as uuidv4} from 'uuid';
import NotFound from "../components/404";
import DefinitionSearch from "../components/DefinitionSearch";
import useFetch from "../hooks/useFetch";

export default function Definition () {
    let { search } = useParams();
    const {
        request,
        data: [{ meanings }] = [{}],
        errorStatus,
    } = useFetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + search);

    useEffect(() => {
        request();
    }, [search]);

    if (errorStatus === 404) {
        return (
            <>
                <NotFound />
                <Link to="/dictionary">Search another</Link>
            </>
        );
    }

    if (errorStatus) {
        return (
            <>
                <p>There was a problem with the server, try again later.</p>
                <Link to="/dictionary">Search another</Link>
            </>
        );
    }

    return (
        <>
            {
                meanings ? (
                <>
                    <h1>Here is the definition of '{search}'</h1>
                    {
                        meanings.map((meaning) => {
                            return (
                                <p key={uuidv4()}>
                                    <b>{meaning.partOfSpeech}</b>:
                                    {meaning.definitions[0].definition}
                                </p>
                            );
                        })
                    }
                    <p>Search again:</p>
                    <DefinitionSearch/>
                </>
                ): null
            }
        </>
    );
}