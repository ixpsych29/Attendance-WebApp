const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    base64: true,
    default:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAACUCAMAAAD26AbpAAAAM1BMVEWzs7P///+tra3b29uwsLD6+vq4uLjIyMjq6urm5ubR0dHx8fH19fXe3t69vb3BwcGnp6fQOQwKAAAD1ElEQVR4nO2c0ZbiIAxAKaRAaSn+/9cOrY7rWLVA0KQu92me9uQukECKCNFoNBqvkQtAHQUGGEZrvQvr39TBlKG7C5M3s4YjWkD3j8XigBJy7G4ZVTjcwgDf/WWy5mgSprunH8PpSBIwbxQiVh/GIS7e7SisqGNIgAhu6B8rdJPhXyekdsP0JP6VIUjqGF8C4OyzAbgOhOM8DjKMO/Ev9APbcQA9JAisCJYSMQvtTaEbDMPJBEKlC8TJ5KgD3gD6fkux56CYjUPGMmDqACJzDFYcpzUNWevgCqMiB092RLvw2WzolIL2CMtFQZZNo25JrVwcSg3YnCDKB6HjkpUgY1+xYdDU4UekQxjw2CxJi1JQ1PFH9Msz2i6WOv6lrGGWQsyr9IsBlY8WArWBkNlb1DvoDw6AVfD0lQGrwKAXgFWw9Aq4ssBBQWMV6CdSU/gKBfqk+gUK6IzEQAFbFxh0xNAK1AL4PdIXbPPoFb5gsy1LGsJfpmCoDfAHz6aAJ/sD1VaBurQ5XBcpYh3pVwZwuCbSGdotRg0D0vY2siN8ZaAbBln6geqOka6jd6pj0E2BbBhqKYyECpUmkqXrbqP3RxcImxjFn8zvUJTH5yoG00xogPzOdoG2qxpqKNDlowV0I6yjHgSRdR/vCeR3GNB5lbwVBjOyvE0MPtoijwzkhzaBTayeOvwFmBHDQLhHvQVz8CFfyxeguAUwUof+CxTXaA5r+UzhNdVuOFFHfqW0OLAZA1HaT+JxtfBKwVcGBvfBboGQn5XI+8F35BcHFnX5D7ltsXHmtJjP6P2wb+iZreWVvKlE2EZ9AWRsWSfyo9pjMgocjw3qlvRbt2x+trAhdTl4tgYi8WYPYRd4l7QabRlWhCuQMpGYnDWfkPQTw57POWdLYkZi8hOkxyQe3ric+R8wp2642ZaFpMV8xjDc44m8lljP0gFEzoFhYuggM3+qys9Bmuyzs+L0ZhKIuaS7HbdKTCRABFXW2+4dhye4ALTx5RfDrKN+ggtkULtPwLxm9AbInq8CKYxF38xbXq/yQcjP5yeQ0ti+zrW2aNGPapanj43GMnm1q3SN54/I4ObLv//e+PVs1Bvi/9WwygT9Pg0Z08/OE1R1NLwLb0i3cfLPziPTTzrToELdJb7Eb8dPxX+xsKaahDyB+nD4Z/qpyouH8J7sk2yBvtANOniK//8bcA/txQRU5eIaEo9oPLEQ6JaH9ko7mFUu9teh8CdLNa7dVaK0AdgUatIUONAUONAUONAUONAUONAUONAUONAUOPA/KzivuFB6gwkkG+g/KjYa/PkB9Fo666S7ZtcAAAAASUVORK5CYII=",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userModel);

module.exports = User;
