import  {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import AppBanner from '../appBanner/AppBanner';

const ItemPage = ({Component, dataType}) => {

    const [data, setData] = useState(null);
    const {id} = useParams();

    const {error, loading, getCharacter, clearError, getComic} = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id]);

    const updateData = (data) => {
    
        clearError();

        switch(dataType) {
            case 'comics' : 
                getComic(id)
                .then(onDataLoaded);
                break;
            case 'chars' : 
                getCharacter(id)
                .then(onDataLoaded);
                break;
            default: return data;
        };
    };

    const onDataLoaded = (data) => {
        setData(data);
    };

    const err = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(error || loading || !data) ? <Component data={data}/> : null

    return(
        <>
            <AppBanner/>
            {err}
            {spinner}
            {content}
        </>
    );
};

export default ItemPage;