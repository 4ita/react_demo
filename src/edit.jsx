import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getApiUrl } from './var';

const Edit = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [id, setId] = useState(0);
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [amount, setAmount] = useState(0);

  async function updateItem() {
    const body = JSON.stringify({
      id,
      date,
      category,
      content,
      amount: Number(amount),
    });

    const start = Date.now()
    fetch(`${getApiUrl()}/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body,
    })
      .then((res) => {
        console.log('(JSX) update: ', Date.now() - start)
        res.json().then(console.log);
        // location.href = '/';
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function deleteItem() {
    const start = Date.now()
    fetch(`${getApiUrl()}/delete/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        console.log('(JSX) delete: ', Date.now() - start)
        res.json().then(console.log);
        // location.href = '/';
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function fetchItem() {
    const getItems = async () => {
      const response = await fetch(`${getApiUrl()}/get/${itemId}`, {
        method: 'get',
      });
      const json = response.json();
      if (response.status == 200) {
        return Promise.resolve(json);
      } else {
        return Promise.reject(json.error);
      }
    };

    const param = searchParams.get('id');
    const itemId = Number(param);
    setId(itemId);

    const item = (await getItems())[0];
    const dateObject = new Date(item.date);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, 0);
    const date = dateObject.getDate().toString().padStart(2, 0);
    const dateString = `${year}/${month}/${date}`;

    setDate(dateString);
    setCategory(item.category);
    setContent(item.content);
    setAmount(Number(item.amount));
  }

  useEffect(async () => {
    fetchItem();
  }, []);

  return (
    <div>
      <div className="field">
        <label className="label">日付</label>
        <div className="control">
          <input
            className="input"
            value={date}
            onChange={(ev) => setDate(ev.target.value)}
            placeholder="YYYY/MM/DD"
          ></input>
        </div>
      </div>
      <div className="field">
        <label className="label">カテゴリ</label>
        <div className="control">
          <input
            className="input"
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          ></input>
        </div>
      </div>
      <div className="field">
        <label className="label">内容</label>
        <div className="control">
          <input
            className="input"
            value={content}
            onChange={(ev) => setContent(ev.target.value)}
          ></input>
        </div>
        <p className="help">30字以内</p>
      </div>
      <div className="field">
        <label className="label">金額</label>
        <div className="control">
          <input
            className="input"
            value={amount}
            onChange={(ev) => setAmount(ev.target.value)}
          ></input>
        </div>
      </div>
      <div className="is-flex mt-5">
        <button
          className="button is-primary is-light mr-2"
          onClick={updateItem}
        >
          更新
        </button>
        <button className="button is-danger is-light" onClick={deleteItem}>
          削除
        </button>
      </div>
    </div>
  );
};

export default Edit;
