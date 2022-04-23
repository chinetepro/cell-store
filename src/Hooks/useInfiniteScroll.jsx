import {useEffect} from 'react';
import {fromEvent} from 'rxjs';
import {debounceTime, filter, map, pairwise} from 'rxjs/operators';

/**
 check if the user is scrolling down by
 previous scroll position and current scroll position
 **/
const isUserScrollingDown = (positions) => {
    return positions[0].sT < positions[1].sT;
};

/** Check if the scroll position at required
 percentage relative to the container
 **/
const isScrollExpectedPercent = (position, percent) => {
    return ((position.sT + position.cH) / position.sH) > (percent / 100);
};

const mappingEvent = () => {
    return {
        sH: document.getElementsByTagName('body')[0].clientHeight,
        sT: window.scrollY,
        cH: window.innerHeight
    };
};

const filterAction = positions => {
    return isUserScrollingDown(positions) && isScrollExpectedPercent(positions[1], 70);
};

let scrollEvent$;

const getObservable = () => {
    if (scrollEvent$)
        return scrollEvent$;
    const source = fromEvent(window, 'scroll');

    scrollEvent$ = source.pipe(map(mappingEvent), pairwise(), filter(filterAction), debounceTime(200));

    return scrollEvent$;
};


export const useInfiniteScroll = (canLoadMore, loadMore) => {
    useEffect(() => {
        const event = getObservable();
        const scrollSubscription = event.subscribe((p) => {
            console.log('canLoadMore', canLoadMore);
            if (canLoadMore) {
                loadMore();
            }
        });
        return () => {
            scrollSubscription.unsubscribe();
        };
    }, [canLoadMore, loadMore]);

};

