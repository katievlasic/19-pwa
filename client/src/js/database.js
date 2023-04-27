import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  export const putDb = async (content) =>{
    console.log('post to database')
    const jateDb = await openDB('jate', 1);
    const tr = jateDb.transaction('jate','readwrite');
    const store = tr.objectStore('jate');
    // method that accepts some content and adds it to the database
  const request = store.add({content});
  const result = await request;
  console.log('Content save to the database :', content);
  return result;
};

export const getDb = async () => {
  console.log('get from database');
  const jateDb = await openDB('jate', 1);
  const tr = jateDb.transaction('jate', 'readonly');
  const store = tr.objectStore('contact');
  // method to get all the content from the database
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
