import BASE_URLE from "../config/server";
const BASE_URL=`${BASE_URLE}/data`;
export const fetchData = async (id) => {
  const res = await fetch(`${BASE_URL}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "token":`Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};


export const addToRecord = async ({expenses,funds,categories,sources}) => {
  const res = await fetch(`${BASE_URL}/addtorecord`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "token":`Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
            expenses,
            funds,
            categories:[],
            sources:[],
    }),
  });
  const data = await res.json();
  return data;
};



export const newRecord = async (record) => {

  const res = await fetch(`${BASE_URL}/newrecord`, {
    method: "POST",
    credentials: "include",
    headers: {
      "token":`Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      record
    }),
  });
  const data = await res.json();
  return data;
};
export const fetchSymbols = async (symbol) => {
  const res = await fetch(`${BASE_URL}/batch/${symbol}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "token":`Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
      },
  });
  const data = await res.json();
  return data;
  };

  export const lookup = async (symbol) => {
    const res = await fetch(`${BASE_URL}/lookup/${symbol}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "token":`Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    return data;
    };  

export const getCurrentprice = async (id) => {
  const res = await fetch(`${BASE_URL}/getcurrentprice`, {
    method: "POST",
    credentials: "include",
    headers: {
      "token":`Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};


export const removeStock = async (id) => {
  const res = await fetch(`${BASE_URL}/removestock/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "token":`Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
      },
  });
  const data = await res.json();
  return data;
  };

export const getStock = async (id) => {
  const res = await fetch(`${BASE_URL}/getstock/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "token":`Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};
export const Addtostock = async ({ symbol, price:purchaseprice, quantity:numberofshares, date }) => {
 
  const res = await fetch(`${BASE_URL}/addstock`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      token: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ symbol, purchaseprice,numberofshares, date }),
  });
  const data = await res.json();
  return data;
};

