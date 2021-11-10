import {Helmet} from 'react-helmet';

import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import ComicsList from '../comicsList/ComicsList';
import AppBanner from '../appBanner/AppBanner';

const ComicsPage = () => {
    return(
        <>
          <Helmet>
            <meta
                name="description"
                content="List of comics"
                />
            <title>List of comics</title>
        </Helmet>
            <ErrorBoundary>
                <AppBanner/>
                <ComicsList/>
            </ErrorBoundary>
        </>
    );
};

export default ComicsPage;