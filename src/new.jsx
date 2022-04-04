import React, { useState } from 'react';
import { getApiUrl } from './var';

const New = () => {
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [amount, setAmount] = useState(0);

  async function registerItem() {
    const body = JSON.stringify({
      date,
      category,
      content,
      amount,
    });
  
    const start = Date.now()
    fetch(`${getApiUrl()}/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body,
    })
      .then((res) => {
        console.log('(JSX) create: ', Date.now() - start)
        res.json().then(console.log);
        // location.href = '/'
      })
      .catch((error) => {
        console.error(error);
      });
  }

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
        <button className="button is-primary is-light" onClick={registerItem}>
          登録
        </button>
      </div>
    </div>
  );
};

export default New;
