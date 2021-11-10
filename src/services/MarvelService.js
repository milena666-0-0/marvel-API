import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {

    const {error, loading, request, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=d9e543f5d114e013c915658d7bbe176d';
    const _baseOffset = 210;

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        const res =  await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    };

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?orderBy=-title&limit=8%20offset${offset}&${_apiKey}`);
        return res.data.results.map(_transformComic);
    };

    const getComic = async (id) => {
        const res =  await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComic(res.data.results[0]);
    };

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'No description',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        };
    };

    const _transformComic = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            description:  comic.description ? `${comic.description.slice(0, 200)}...` : 'No description',
            pageCount: comic.pageCount  ? `${comic.pageCount} pages` : 'No pages',
            language:  comic.textObjects.language || 'en-ru',
            price: comic.prices.price ? `${comic.prices.price}$` : 'NOT AVAILABLE',
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
        };
    };


    return {error, loading, getAllCharacters, getCharacter, clearError, getComic, getAllComics, getCharacterByName};

};

export default useMarvelService;
