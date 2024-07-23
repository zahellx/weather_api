export const up = async (db) => {
    db.collection('weather').createIndex( { "expireAt": 1 }, { expireAfterSeconds: 0 } )
    db.collection('weather').createIndex({ lon: 1, lat: 1 });
};

export const down = async (db) => {
    db.collection('weather').dropIndex({ "expireAt": 1 });
    db.collection('weather').dropIndex({ lon: 1, lat: 1 });
};
