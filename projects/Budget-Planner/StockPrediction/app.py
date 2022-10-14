import streamlit as st
from datetime import date,timedelta
import yfinance as yf
from fbprophet import Prophet
from fbprophet.plot import plot_plotly
from plotly import graph_objs as go
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import numpy as np
from keras.models import load_model
import tensorflow
from streamlit_option_menu import option_menu




nav = option_menu(
        menu_title=None,  
        options=["Home", "Stock Analysis","Facebook Prophet","LSTM","Compare Two Stocks"],  
        icons=["house", "graph-up-arrow", "currency-dollar","lightning"], 
        menu_icon="cast", 
        default_index=1,  
        orientation="horizontal",
        styles={
            "container": {"background-color": "#fafafa","margin": "5px"},
            "icon": {"color": "orange", "font-size": "25px"},
            "nav-link": {
                "font-size": "25px",
                "text-align": "left",
                "margin": "5px",
                "--hover-color": "#eee",
            },
            "nav-link-selected": {"background-color": "blue"},
        },
)




if(nav=="Home"):
    # url='https://stirring-raindrop-68250e.netlify.app/'
    st.markdown("""
                Hope You Enjoyed :smile: For Going Back to Main Website Click Here :point_right:
    <a href="https://stirring-raindrop-68250e.netlify.app/" target = "_self"> 
        Home
    </a>
""", unsafe_allow_html=True)
    st.balloons()
    
    
    
if(nav=='Facebook Prophet'):
    
    
    
    START = "2018-01-01"
    TODAY = date.today().strftime("%Y-%m-%d")

    st.title('Stock Forecast Using Facebook Prophet')
    st.markdown('''Prophet is an open-source tool from Facebook used for forecasting time series data which helps businesses 
                understand and possibly predict the market. It is based on a decomposable
                additive model where non-linear trends are fit with seasonality, it also takes into account the effects of holidays.
                
                ''')
    st.write("For more information [Prophet](https://www.geeksforgeeks.org/time-series-analysis-using-facebook-prophet)")



    stocks=st.text_input('Enter Stock Ticker','AAPL')

    n_years = st.slider('Years of prediction:', 1, 5)
    period = n_years * 365
    
    

    @st.cache
    def load_data(ticker):
        data = yf.download(ticker, START, TODAY)
        data.reset_index(inplace=True)
        return data

        
    data_load_state = st.text('Loading data...')

    data = load_data(stocks)
    if(data.size!=0):
        data_load_state.text('Loading data... done!')

        st.subheader(f'Data From {START} to {TODAY}')
        st.write(data.describe())



        df_train = data[['Date','Close']]
        df_train = df_train.rename(columns={"Date": "ds", "Close": "y"})

        m = Prophet()
        m.fit(df_train)
        future = m.make_future_dataframe(periods=period)
        forecast = m.predict(future)
        
        st.subheader("Forecasted Data")
        st.write(forecast)
        st.write("Summary Of Forecasting")
        st.write(forecast.describe())



        st.write(f'Forecast plot for {n_years} years')
        fig1 = plot_plotly(m, forecast)
        st.plotly_chart(fig1)

        st.write("Forecast components")
        fig2 = m.plot_components(forecast)
        st.write(fig2)
        st.balloons()
    else:
        st.error("!! :man-facepalming: Enter valid Ticker!!")
        
        
        
        
        
        
        
            
        
if(nav=='Stock Analysis'):
    st.write("Select Stock and Time Period")
    stocks=st.text_input('Enter Stock Ticker','AAPL')
    days_after = (date.today()-timedelta(days=30))
    start_date = st.date_input(
     "Start Date",days_after)
    end_date = st.date_input(
    "End Date",)
    
    
    @st.cache
    def load_data():
        data = yf.download(stocks,start_date, end_date)
        data.reset_index(inplace=True)
        return data
    
    data = load_data()
    if(data.size!=0):
    
      st.subheader("Opening and Closing Price vs Time Chart")
      fig = go.Figure()
      fig.add_trace(go.Scatter(x=data['Date'], y=data['Open'], name="Open"))
      fig.add_trace(go.Scatter(x=data['Date'], y=data['Close'], name="Close"))
      fig.update_layout(autosize=True,width=1000,height=700, xaxis_rangeslider_visible=True)
      st.plotly_chart(fig)
      
     
      
    
      st.subheader("Candlestick chart")
      fig = go.Figure()
      fig.add_candlestick(x=data['Date'],low=data['Low'],high=data['High'],open=data['Open'],close=data['Close'])
      fig.update_layout(autosize=True,width=1000,height=700, xaxis_rangeslider_visible=True)
      st.plotly_chart(fig)
      
      st.subheader("Moving Average vs Time Chart")

      ma100=data.Close.rolling(100).mean()
      ma200=data.Close.rolling(200).mean()
      ma50=data.Close.rolling(50).mean()
      fig = go.Figure()
      fig.add_trace(go.Scatter(x=data['Date'], y=ma100, name="100 Days Rolling Average"))
      fig.add_trace(go.Scatter(x=data['Date'], y=ma200, name="200 Days Rolling Average"))
      fig.add_trace(go.Scatter(x=data['Date'], y=ma50, name="50 Days Rolling Average"))
      
      fig.add_trace(go.Scatter(x=data['Date'], y=data['Close'], name='Closing Value'))
      fig.update_layout(autosize=True,width=1000,height=700, xaxis_rangeslider_visible=True)
      st.plotly_chart(fig)
      
      st.subheader("Volume Traded")
      fig = go.Figure()
      fig.add_trace(go.Scatter(x=data['Date'], y=data['Volume'],name="Volume_Traded"))
      fig.update_layout(autosize=True,width=1000,height=700, xaxis_rangeslider_visible=True)
      st.plotly_chart(fig)
      st.balloons()
    else:
        st.error("!! :man-facepalming: Enter valid Ticker!!")




   
if(nav=='LSTM'):
    START = "2012-01-01"
    TODAY = date.today().strftime("%Y-%m-%d")
    
    st.title('Stock Forecast By LSTM')
    
    st.write('''Long Short Term Memory Network is an advanced RNN, a 
                sequential network, that allows information to persist. 
                It is capable of handling the vanishing gradient problem faced by RNN. 
                A recurrent neural network is also known as RNN is used for persistent memory  
                ''')
    st.write("For more information [LSTM](https://en.wikipedia.org/wiki/Long_short-term_memory)")
    


    stocks=st.text_input('Enter Stock Ticker','AAPL')

    n_days = st.slider('Select Days For Prediction:',1,600)


    @st.cache
    def load_data(ticker):
        data = yf.download(ticker, START, TODAY)
        data.reset_index(inplace=True)
        return data
    
    
      
    data_load_state = st.text('Loading data...')
    data = load_data(stocks)
    if(data.size!=0):
          
      data_load_state.text('Loading data... done!')

      st.subheader(f'Summary Of Data From {START} to {TODAY}')
      st.write(data.describe())
      print(data)

      close=data[['Close']]
      ds = close.values
      normalizer = MinMaxScaler(feature_range=(0,1))
      ds_scaled = normalizer.fit_transform(np.array(ds).reshape(-1,1))
      train_size = int(len(ds_scaled))
      ds_train = ds_scaled[0:train_size]
      def create_ds(dataset,step):
          Xtrain, Ytrain = [], []
          for i in range(len(dataset)-step-1):
              a = dataset[i:(i+step), 0]
              Xtrain.append(a)
              Ytrain.append(dataset[i + step, 0])
          return np.array(Xtrain), np.array(Ytrain)
      time_stamp = 100
      X_train, y_train = create_ds(ds_train,time_stamp)
      X_train = X_train.reshape(X_train.shape[0],X_train.shape[1] , 1)

      model=load_model('model3.h5')


      @st.cache
      def run_model(X_train,y_train):
          model.fit(X_train,y_train,epochs=10,batch_size=30)
      run_model(X_train,y_train)
   
      l=len(ds_train)
      fut_inp = ds_train[l-100:]
      fut_inp = fut_inp.reshape(1,-1)
      tmp_inp = list(fut_inp)
      tmp_inp = tmp_inp[0].tolist()
      lst_output=[]
      n_steps=100
      i=0
      while(i<n_days):
          
          if(len(tmp_inp)>100):
              fut_inp = np.array(tmp_inp[1:])
              fut_inp=fut_inp.reshape(1,-1)
              fut_inp = fut_inp.reshape((1, n_steps, 1))
              yhat = model.predict(fut_inp, verbose=0)
              tmp_inp.extend(yhat[0].tolist())
              tmp_inp = tmp_inp[1:]
              lst_output.extend(yhat.tolist())
              i=i+1
          else:
              fut_inp = fut_inp.reshape((1, n_steps,1))
              yhat = model.predict(fut_inp, verbose=0)
              tmp_inp.extend(yhat[0].tolist())
              lst_output.extend(yhat.tolist())
              i=i+1
          


      pre=[]


      current_date = date.today().isoformat()   
      for j in range(1,n_days+1):
          days_after = (date.today()+timedelta(days=j)).isoformat()
          pre.append(days_after)  
      print(pre)
      forecast=normalizer.inverse_transform(lst_output)
      pre1=pd.DataFrame(pre,columns=['Date'])
      pre1['Date']= pd.to_datetime(pre1['Date'])
      forecast1 = forecast.reshape(1,-1)
      forecast2 = forecast1[0].tolist()
      pre1['Close']=forecast2
      print(pre1)
      st.subheader("Forecasted Closing Price")
      st.write(pre1)
      fig = go.Figure()
      fig.add_trace(go.Scatter(x=pre1['Date'], y=pre1['Close']))
      fig.add_trace(go.Scatter(x=data['Date'], y=data['Close']))
      fig.update_layout(autosize=True,width=1000,height=700, xaxis_rangeslider_visible=True)
      st.plotly_chart(fig)
      st.balloons()
    else:
        st.error("!! :man-facepalming: Enter valid Ticker!!")
        
if(nav=="Compare Two Stocks"):
    
    
    st.title("Stock Comparison")
    st.write("Select Stock and Time Period")
    stocks1=st.text_input('Enter First Stock Ticker','AAPL')
    stocks2=st.text_input('Enter Second Stock Ticker','TSLA')


    days_after = (date.today()-timedelta(days=150))
    start_date = st.date_input(
        "Start Date",days_after)
    end_date = st.date_input(
    "End Date",)


    @st.cache
    def load_data(ticker):
        data = yf.download(ticker,start_date, end_date)
        data.reset_index(inplace=True)
        return data

    data1= load_data(stocks1)
    data2=load_data(stocks2)
    if(data1.size==0 or data2.size==0):
        st.error("!! :man-facepalming:  Enter valid Ticker!!")
    else:    

        st.subheader("Closing Price vs Time Chart")
        fig = go.Figure()
        fig.add_trace(go.Scatter(x=data1['Date'], y=data1['Close'], name=f'{stocks1} Closing Price'))
        fig.add_trace(go.Scatter(x=data2['Date'], y=data2['Close'], name=f'{stocks2} Closing Price'))
        fig.update_layout(autosize=True,width=1000,height=700, xaxis_rangeslider_visible=True)
        st.plotly_chart(fig)


        st.subheader("Open Price vs Time Chart")
        fig = go.Figure()
        fig.add_trace(go.Scatter(x=data1['Date'], y=data1['Open'], name=f'{stocks1} Open Price'))
        fig.add_trace(go.Scatter(x=data2['Date'], y=data2['Open'], name=f'{stocks2} Open Price'))
        fig.update_layout(autosize=True,width=1000,height=700, xaxis_rangeslider_visible=True)
        st.plotly_chart(fig)


    
        st.subheader("Candlestick chart")
        fig = go.Figure()
        fig.add_candlestick(x=data1['Date'],low=data1['Low'],high=data1['High'],open=data1['Open'],close=data1['Close'],name=f'{stocks1}')
        fig.add_candlestick(x=data2['Date'],low=data2['Low'],high=data2['High'],open=data2['Open'],close=data2['Close'],name=f'{stocks2}')

        fig.update_layout(autosize=True,width=1000,height=700, xaxis_rangeslider_visible=True)
        st.plotly_chart(fig)

        st.subheader("Moving Average vs Time Chart")

        ma100=data1.Close.rolling(100).mean()
        ma200=data1.Close.rolling(200).mean()
        ma50=data1.Close.rolling(50).mean()
        fig = go.Figure()
        fig.add_trace(go.Scatter(x=data1['Date'], y=ma100, name=f'{stocks1} 100 Days Rolling Average'))
        fig.add_trace(go.Scatter(x=data1['Date'], y=ma200, name=f'{stocks1} 200 Days Rolling Average'))
        fig.add_trace(go.Scatter(x=data1['Date'], y=ma50, name=f'{stocks1} 50 Days Rolling Average'))
        ma100=data2.Close.rolling(100).mean()
        ma200=data2.Close.rolling(200).mean()
        ma50=data2.Close.rolling(50).mean()
        fig.add_trace(go.Scatter(x=data2['Date'], y=ma100, name=f'{stocks2} 100 Days Rolling Average'))
        fig.add_trace(go.Scatter(x=data2['Date'], y=ma200, name=f'{stocks2} 200 Days Rolling Average'))
        fig.add_trace(go.Scatter(x=data2['Date'], y=ma50, name=f'{stocks2} 50 Days Rolling Average'))
        fig.update_layout(autosize=True,width=1000,height=700, xaxis_rangeslider_visible=True)
        st.plotly_chart(fig)

        st.subheader("Volume Traded")
        fig = go.Figure()
        fig.add_trace(go.Scatter(x=data1['Date'], y=data1['Volume'],name=f'{stocks1} Volume_Traded'))
        fig.add_trace(go.Scatter(x=data2['Date'], y=data2['Volume'],name=f'{stocks2} Volume_Traded'))

        fig.update_layout(autosize=True,width=1000,height=700, xaxis_rangeslider_visible=True)
        st.plotly_chart(fig)
        st.balloons()

                
            
        
        
    

        
    




