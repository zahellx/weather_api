function query2Mongo(where) {
  const mongoQuery = {};
  const mongoOptions = {};

  Object.keys(where).forEach((key) => {
    const condition = where[key];

    if (key === 'limit') {
      mongoOptions.limit = parseInt(condition, 10);
    } else if (key === 'skip') {
      mongoOptions.skip = parseInt(condition, 10);
    } else if (key === 'order') {
      const [field, direction] = condition.split(' ');
      mongoOptions.sort = { [field]: direction.toLowerCase() === 'desc' ? -1 : 1 };
    } else if (typeof condition === 'object' && !Array.isArray(condition)) {
      const subKeys = Object.keys(condition);
      subKeys.forEach((subKey) => {
        const value = condition[subKey];

        if (subKey === 'gt' || subKey === 'lt' || subKey === 'gte' || subKey === 'lte' || subKey === 'ne' || subKey === 'like' || subKey === 'nlike' || subKey === 'inq') {
          if (!mongoQuery[key]) mongoQuery[key] = {};
          if (subKey === 'like' || subKey === 'nlike') {
            mongoQuery[key][subKey === 'like' ? '$regex' : '$not'] = new RegExp(value);
          } else if (subKey === 'inq') {
            mongoQuery[key].$in = value.split(',');
          } else {
            mongoQuery[key][`$${subKey}`] = value;
          }
        } else if (subKey === 'between') {
          mongoQuery[key] = { $gte: condition[0], $lte: condition[1] };
        } else if (subKey === 'near') {
          mongoQuery[key] = {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: value.split(',').map(Number),
              },
            },
          };
        }
      });
    } else if (key === 'and' || key === 'or') {
      mongoQuery[`$${key}`] = condition.map((cond) => cond);
    } else {
      // eslint-disable-next-line no-nested-ternary
      mongoQuery[key] = condition === 'true' ? true : condition === 'false' ? false : condition;
    }
  });
  return { filter: mongoQuery, options: mongoOptions };
}

// Ejemplos de uso
// const queries = [
//   'where[and][0][parameter]=My%20Post&where[and][1][parameter]=Hello',
//   'where[or][0][parameter]=My%20Post&where[or][1][parameter]=Hello',
//   'where[parameter][gt]=900',
//   'where[parameter]=true',
//   'where[limit]=5',
//   'where[order]=parameter DESC',
//   'where[skip]=50',
//   'where[parameter][gt]=2014-04-01T18:30:00.000Z',
//   'where[parameter][near]=153.536,-28.1',
//   'where[parameter][between][0]=0&where[parameter][between][1]=7',
//   'where[parameter][like]=foo',
//   'where[parameter][nlike]=foo',
//   'where[parameter][inq]=foo,bar,baz'
// ];

export default query2Mongo;
