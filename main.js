import express from 'express'
import axios from 'axios'
import cors from 'cors'
const api = "https://script.google.com/macros/s/AKfycbwgRHQiF6l0Xh43_7JvJ7dzKuIL-uLqjh_O8BoqjgkvhoqtD0c-7RpGv9KGfqpOImg/exec"

const app = express()
app.use(express.json())
app.use(cors())


app.post('/add-product', async (req, res) => {
    try {
      const response = await axios.post(api, req.body, {
        headers: { 'Content-Type': 'application/json' }
      });
  
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi gửi dữ liệu đến App Script', error: error.message });
    }
  });


  app.get('/get-products-list', async (req, res) => {
    try {
        const response = await axios.get(api + "?action=getProducts")
        res.json(response.data)
    } catch (error) {
        console.log(error)
    }
  })


  app.get('/get-users', async (req, res) => {
    try {
        const response = await axios.get(api + "?action=getUsers")
        res.json(response.data)
    } catch (error) {
        res.status(500).json({ message: 'Lỗi gửi dữ liệu đến App Script', error: error.message });
    }
  })

  
  app.post('/register', async (req, res) => {
    try {
        const response = await axios.post(api, req.body, {
            headers: { 'Content-Type': 'application/json' }
          });
        res.json(response.data)
    } catch (error) {
      res.status(400).json({ message: 'Lỗi gửi dữ liệu đến App Script', error: error.message });
    }
  })


  app.post('/sendOtp', async (req, res) => {
    try {
      const response = await axios.post(api, req.body, {
        headers: { 'Content-Type': 'application/json' },
      });
      res.json(response.data);
    } catch (error) {
      console.error("Lỗi gửi OTP:", error.message);
  
      // Trả về lỗi đơn giản, tránh circular structure
      res.status(400).json({
        message: "Lỗi gửi dữ liệu đến App Script",
        error: error.response?.data || error.message,
      });
    }
  });


app.listen(8080, () => { console.log('Sever is running!')})