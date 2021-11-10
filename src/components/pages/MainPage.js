import {useState} from 'react';
import {Helmet} from 'react-helmet';

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import SearchCharForm from '../searchCharForm/SearchCharForm';

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => {
        setSelectedChar(id)
    };

    return(
        <>
        <Helmet>
            <meta
                name="description"
                content="Main page"
                />
            <title>Main page</title>
        </Helmet>
         <ErrorBoundary>
            <RandomChar/>
        </ErrorBoundary>
        <div className="char__content">
            <ErrorBoundary>
                <CharList onCharSelected={onCharSelected}/>
            </ErrorBoundary>
            <div>
                <ErrorBoundary>
                    <CharInfo charId={selectedChar}/>
                    <SearchCharForm/>
                </ErrorBoundary>  
            </div>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
};

export default MainPage;