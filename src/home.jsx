import React, { useState, useEffect } from 'react';
import { getApiUrl } from './var';

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const getItems = async () => {
      const response = await fetch(`${getApiUrl()}/get/all`, { method: 'get' });
      const json = response.json();
      if (response.status == 200) {
        return Promise.resolve(json);
      } else {
        return Promise.reject(json.error);
      }
    };

    let res = await getItems();
    const items = res.map((item) => {
      const id = Number(item.id);
      const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dateObject = new Date(item.date);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth() + 1;
      const yearMonth = `${year}.${month}`;
      const date = dateObject.getDate().toString();
      const day = weekdays[dateObject.getDay()];
      const category = item.category;
      const content = item.content;
      const amount = Number(item.amount).toLocaleString('ja');

      return {
        id,
        calendar: {
          yearMonth,
          date,
          day,
        },
        category,
        content,
        amount,
      };
    });
    setItems(items);
  }

  return (
    <div>
      {items.map((item) => (
        <a key={Number(item.id)} href={`/edit?id=${item.id}`}>
          <div
            className="is-flex p-2 mb-1"
            style={{ backgroundColor: '#eef', borderRadius: '4px' }}
          >
            <div>
              <div className="is-flex" style={{ width: '4.5rem' }}>
                <p style={{ width: '1.5rem' }}>{item.calendar.date}</p>
                <p style={{ width: '2.5rem' }}>{item.calendar.day}</p>
              </div>
              <p style={{ fontSize: '0.75rem' }}>{item.calendar.yearMonth}</p>
            </div>
            <p className="is-align-self-center" style={{ width: '6rem' }}>
              {item.category}
            </p>
            <p className="is-align-self-center" style={{ width: '9rem' }}>
              {item.content}
            </p>
            <p
              className="is-align-self-center has-text-right"
              style={{ width: '7rem' }}
            >
              ￥{item.amount}
            </p>
          </div>
        </a>
      ))}
      <a
        className="button is-primary is-rounded floating"
        href={`/new`}
        style={{ position: 'fixed', bottom: '2rem', right: '2rem' }}
      >
        <span className="icon">
          <i className="fa-solid fa-pen"></i>
        </span>
      </a>
    </div>
  );
};

export default Home;
