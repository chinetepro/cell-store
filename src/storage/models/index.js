export const User = {
    collection: 'user',
    schema: {
        user: '++idUser, __request__.path, _id, __request__.authorization, __request__.order'
    }
};

export const Offer = {
    collection: 'offer',
    schema: {
        offer: '++key, _id,  __request__.path, __request__.authorization, __request__.order'
    }
};
