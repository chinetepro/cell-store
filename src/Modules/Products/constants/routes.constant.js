import { OffersDetailsSubPage, Offers} from '../Pages';


export default {
    Services: {
        exact: true,
        path: '/',
        component: Offers
    },    
    details: {
        exact: false,
        path: '/detail/:id',
        component: OffersDetailsSubPage
    }
};
